import GDemo from './index';
import { Player } from './components/player/player';
import { PlayerMock, playerInstanceMock } from '@mocks/player-mock';

jest.mock('./components/player/player');
Player.mockImplementation(PlayerMock);

describe('Glorious Demo class', () => {
  let container;

  function instantiateGDemo(){
    return new GDemo('[data-container]');
  }

  beforeEach(() => {
    spyOn(document, 'querySelector').and.returnValue({});
  })

  it('should build its container on instantiate', () => {
    const gDemo = instantiateGDemo();
    expect(document.querySelector).toHaveBeenCalledWith('[data-container]');
    expect(gDemo.container).toEqual({});
  });

  it('should initialize steps as an empty array on instantiate', () => {
    const gDemo = instantiateGDemo();
    expect(gDemo.steps).toEqual([]);
  });


  it('should play steps', () => {
    const gDemo = instantiateGDemo();
    gDemo
      .openApp('editor')
      .write('console.log("hello!");')
      .openApp('terminal')
      .command('node demo.js')
      .respond('hello!')
      .end();
    expect(Player).toHaveBeenCalledWith(gDemo.container, [
      {app: 'editor', options: {}, onCompleteDelay: undefined},
      {app: 'editor', action: 'write', params: {codeSample: 'console.log("hello!");'}, onCompleteDelay: undefined},
      {app: 'terminal', options: {}, onCompleteDelay: undefined},
      {app: 'terminal', action: 'command', params: {command: 'node demo.js'}, onCompleteDelay: undefined},
      {app: 'terminal', action: 'respond', params: {response: 'hello!'}, onCompleteDelay: undefined}
    ]);
    expect(playerInstanceMock.play).toHaveBeenCalled();
  });

  it('should play steps with options', () => {
    const gDemo = instantiateGDemo();
    gDemo
      .openApp('editor', {windowTitle: 'atom', onCompleteDelay: 200})
      .write('console.log("hello!");', { onCompleteDelay: 300 })
      .openApp('terminal', {windowTitle: 'bash'})
      .command('node demo.js', { onCompleteDelay: 400 })
      .respond('hello!', { onCompleteDelay: 500 })
      .end();
    expect(Player).toHaveBeenCalledWith(gDemo.container, [
      {app: 'editor', options: {windowTitle: 'atom', onCompleteDelay: 200}, onCompleteDelay: 200},
      {app: 'editor', action: 'write', params: {codeSample: 'console.log("hello!");'}, onCompleteDelay: 300},
      {app: 'terminal', options: {windowTitle: 'bash'}, onCompleteDelay: undefined},
      {app: 'terminal', action: 'command', params: {command: 'node demo.js'}, onCompleteDelay: 400},
      {app: 'terminal', action: 'respond', params: {response: 'hello!'}, onCompleteDelay: 500}
    ]);
    expect(playerInstanceMock.play).toHaveBeenCalled();
  });
});
