import textService from '../../services/text/text';
import { TerminalApplication } from './terminal-application';
import { TerminalCommandLine } from '../terminal-command-line/terminal-command-line';
import { TerminalResponseLine } from '../terminal-response-line/terminal-response-line';

function buildTerminalLineMock(method, action){
  const lineInstanceMock = {};
  lineInstanceMock[method] = jest.fn();
  lineInstanceMock.element = '<div>Something</div>';
  return lineInstanceMock;
}

jest.mock('../terminal-command-line/terminal-command-line');
const terminalCommandLineInstanceMock = buildTerminalLineMock('command');
const TerminalCommandLineMock = jest.fn(() => terminalCommandLineInstanceMock);
TerminalCommandLine.mockImplementation(TerminalCommandLineMock);

jest.mock('../terminal-response-line/terminal-response-line');
const terminalResponseLineInstanceMock = buildTerminalLineMock('setText');
const TerminalResponseLineMock = jest.fn(() => terminalResponseLineInstanceMock);
TerminalResponseLine.mockImplementation(TerminalResponseLineMock);

describe('Terminal Application Component', () => {

  function instantiateTerminalApplication(options){
    const container = document.createElement('div');
    const application = new TerminalApplication(container, options);
    spyOn(application, 'addContent');
    return application;
  }

  beforeEach(() => {
    spyOn(textService, 'removeBlankFirstLine').and.callFake(value => [value]);
  });

  it('should build terminal application wrapper on instantiate', () => {
    const application = instantiateTerminalApplication();
    expect(application.element.classList[0]).toEqual('terminal-application');
  });

  it('should build lines wrapper on instantiate', () => {
    const application = instantiateTerminalApplication();
    const linesWrapper = application.element.querySelector('ul');
    expect(linesWrapper).toBeDefined();
  });

  it('should config window title with default window title if no window title option is given', () => {
    const application = instantiateTerminalApplication();
    expect(application.windowTitle).toEqual('bash');
  });

  it('should config window title with the window title given as option', () => {
    const windowTitle = 'zsh'
    const application = instantiateTerminalApplication({ windowTitle });
    expect(application.windowTitle).toEqual(windowTitle);
  });

  it('should config prompt string with default prompt string if no prompt string option is given', () => {
    const application = instantiateTerminalApplication();
    expect(application.promptString).toEqual('~/demo $');
  });

  it('should config prompt string with the prompt string given as option', () => {
    const promptString = '> $'
    const application = instantiateTerminalApplication({ promptString });
    expect(application.promptString).toEqual(promptString);
  });

  it('should build a command line with current defined prompt string on command', () => {
    const application = instantiateTerminalApplication();
    const commandText = 'npm install';
    const onComplete = jest.fn();
    application.command(commandText, onComplete);
    expect(TerminalCommandLine).toHaveBeenCalledWith(application.promptString);
  });

  it('should add a command line to terminal application on command', () => {
    const application = instantiateTerminalApplication();
    const commandText = 'npm install';
    const onComplete = jest.fn();
    application.command(commandText, onComplete);
    expect(application.addContent).toHaveBeenCalledWith(terminalCommandLineInstanceMock.element);
  });

  it('should write some command', () => {
    const application = instantiateTerminalApplication();
    const commandText = 'npm install';
    const onComplete = jest.fn();
    application.command(commandText, onComplete);
    expect(terminalCommandLineInstanceMock.command).toHaveBeenCalledWith(commandText, onComplete);
  });

  it('should build a response line on respond', () => {
    const application = instantiateTerminalApplication();
    const response = 'Successfully installed!';
    const onComplete = jest.fn();
    application.respond(response, onComplete);
    expect(TerminalResponseLine).toHaveBeenCalled();
    expect(terminalResponseLineInstanceMock.setText).toHaveBeenCalledWith(response);
  });

  it('should add a response line to terminal application on respond', () => {
    const application = instantiateTerminalApplication();
    const response = 'Successfully installed!';
    const onComplete = jest.fn();
    application.respond(response, onComplete);
    expect(application.addContent).toHaveBeenCalledWith(terminalResponseLineInstanceMock.element);
  });

  it('should execute complete callback after finish writing response', () => {
    const application = instantiateTerminalApplication();
    const response = 'Successfully installed!';
    const onComplete = jest.fn();
    application.respond(response, onComplete);
    expect(onComplete).toHaveBeenCalled();
  });

});
