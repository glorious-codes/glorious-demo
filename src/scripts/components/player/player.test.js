import { Player } from './player';
import { Desktop } from '../desktop/desktop';
import { DesktopMock } from '@mocks/desktop-mock';

jest.mock('../desktop/desktop');
Desktop.mockImplementation(DesktopMock);

describe('Player Component', () => {
  let container;

  jest.useFakeTimers();

  function instantiatePlayer(steps = []){
    container = document.createElement('div');
    return new Player(container, steps);
  }

  function mockMaximizedTerminalApplication(){
    return {
      isMaximized: true,
      command: jest.fn((params, onComplete) => { onComplete(); }),
      respond: jest.fn((params, onComplete) => { onComplete(); })
    };
  }

  it('should set steps on instantiate', () => {
    const options = {windowTitle: 'Atom'};
    const steps = [{app: 'editor', options}];
    const player = instantiatePlayer(steps);
    expect(player.steps).toEqual(steps);
  });

  it('should build desktop passing player container on instantiate', () => {
    const player = instantiatePlayer();
    expect(Desktop).toHaveBeenCalledWith(container);
    expect(player.desktop).toBeDefined();
  });

  it('should set current step number number as zero on instantiate', () => {
    const player = instantiatePlayer();
    expect(player.currentStepNumber).toEqual(0);
  });

  it('should open step application when playing some step', () => {
    const options = {windowTitle: 'Atom'};
    const steps = [{app: 'editor', options}];
    const player = instantiatePlayer(steps);
    player.desktop.openApplication.mockReturnValue({a:1});
    player.play();
    expect(player.desktop.openApplication).toHaveBeenCalledWith('editor', options);
  });

  it('should minimize all applications and maximize step application if step application is not maximized when playing some step', () => {
    const steps = [{app: 'editor'}];
    const player = instantiatePlayer(steps);
    const application = {};
    player.desktop.openApplication.mockReturnValue(application);
    player.desktop.minimizeAllApplications.mockImplementation(onComplete => { onComplete(); });
    player.desktop.maximizeApplication.mockImplementation((application, onComplete) => { onComplete(); });
    player.play();
    expect(typeof player.desktop.minimizeAllApplications.mock.calls[0][0]).toEqual('function');
    expect(player.desktop.maximizeApplication.mock.calls[0][0]).toEqual(application);
    expect(typeof player.desktop.maximizeApplication.mock.calls[0][1]).toEqual('function');
  });

  it('should neither minimize or maximize any application if step application is already maximized when playing some step', () => {
    const steps = [{app: 'editor'}];
    const player = instantiatePlayer(steps);
    const application = {isMaximized: true};
    player.desktop.openApplication.mockReturnValue(application);
    player.play();
    expect(player.desktop.minimizeAllApplications).not.toHaveBeenCalled();
    expect(player.desktop.maximizeApplication).not.toHaveBeenCalled();
  });

  it('should play some step action with its parameters', () => {
    const params = {codeSample: 'console.log("test!")'};
    const steps = [{app: 'editor', action: 'write', params}];
    const player = instantiatePlayer(steps);
    const application = {isMaximized: true, write: jest.fn()};
    player.desktop.openApplication.mockReturnValue(application);
    player.play();
    expect(application.write.mock.calls[0][0]).toEqual(params);
    expect(typeof application.write.mock.calls[0][1]).toEqual('function');
  });

  it('should increment current step number after play some step', () => {
    const steps = [
      {app: 'terminal', action: 'command'},
      {app: 'terminal', action: 'respond'}
    ];
    const player = instantiatePlayer(steps);
    const application = mockMaximizedTerminalApplication();
    player.desktop.openApplication.mockReturnValue(application);
    player.play();
    jest.runOnlyPendingTimers();
    expect(player.currentStepNumber).toEqual(1);
    jest.runOnlyPendingTimers();
    expect(player.currentStepNumber).toEqual(2);
  });

  it('should optionally delay to play the next step', () => {
    const steps = [
      {app: 'terminal', action: 'command', params: {}, onCompleteDelay: 500},
      {app: 'terminal', action: 'respond', params: {}}
    ];
    const player = instantiatePlayer(steps);
    const application = mockMaximizedTerminalApplication();
    player.desktop.openApplication.mockReturnValue(application);
    player.play();
    expect(application.command).toHaveBeenCalled();
    jest.advanceTimersByTime(499);
    expect(application.respond).not.toHaveBeenCalled();
    jest.advanceTimersByTime(1);
    expect(application.respond).toHaveBeenCalled();
  });

  it('should return a promise when playing steps', () => {
    const steps = [];
    const player = instantiatePlayer(steps);
    const promise = player.play();
    expect(promise.then).toBeDefined();
  });

  it('should resolve promise when finish to play steps', done => {
    let resolved;
    const steps = [
      {app: 'terminal', action: 'command', params: {}},
      {app: 'terminal', action: 'respond', params: {}}
    ];
    const player = instantiatePlayer(steps);
    const application = mockMaximizedTerminalApplication();
    player.desktop.openApplication.mockReturnValue(application);
    player.play().then(() => {
      resolved = true;
      expect(resolved).toEqual(true);
      done()
    });
    jest.runAllTimers();
  });

});
