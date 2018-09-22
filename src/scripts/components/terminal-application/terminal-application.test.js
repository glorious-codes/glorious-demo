import { TerminalApplication } from './terminal-application';
import { TerminalCommandLine } from '../terminal-command-line/terminal-command-line';
import { TerminalResponseLine } from '../terminal-response-line/terminal-response-line';
import { TerminalCommandLineMock, terminalCommandLineInstanceMock } from '@mocks/terminal-command-line-mock';
import { TerminalResponseLineMock, terminalResponseLineInstanceMock } from '@mocks/terminal-response-line-mock';
import textService from '../../services/text/text';

jest.mock('../terminal-command-line/terminal-command-line');
TerminalCommandLine.mockImplementation(TerminalCommandLineMock);

jest.mock('../terminal-response-line/terminal-response-line');
TerminalResponseLine.mockImplementation(TerminalResponseLineMock);

describe('Terminal Application Component', () => {

  function instantiateTerminalApplication(options){
    const container = document.createElement('div');
    return new TerminalApplication(container, options);
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
    const windowTitle = 'zsh';
    const application = instantiateTerminalApplication({ windowTitle });
    expect(application.windowTitle).toEqual(windowTitle);
  });

  it('should config prompt string with default prompt string if no prompt string option is given', () => {
    const application = instantiateTerminalApplication();
    expect(application.promptString).toEqual('~/demo $');
  });

  it('should config prompt string with the prompt string given as option', () => {
    const promptString = '> $';
    const application = instantiateTerminalApplication({ promptString });
    expect(application.promptString).toEqual(promptString);
  });

  it('should build a command line with current defined prompt string on command', () => {
    const application = instantiateTerminalApplication();
    const command = 'npm install';
    const onComplete = jest.fn();
    spyOn(application, 'addContent');
    application.command({ command }, onComplete);
    expect(TerminalCommandLine).toHaveBeenCalledWith(application.promptString);
  });

  it('should add a command line to terminal application on command', () => {
    const application = instantiateTerminalApplication();
    const command = 'npm install';
    const onComplete = jest.fn();
    spyOn(application, 'addContent');
    application.command({ command }, onComplete);
    expect(application.addContent).toHaveBeenCalledWith(terminalCommandLineInstanceMock.element);
  });

  it('should write some command', () => {
    const application = instantiateTerminalApplication();
    const command = 'npm install';
    const onComplete = jest.fn();
    spyOn(application, 'addContent');
    application.command({ command }, onComplete);
    expect(terminalCommandLineInstanceMock.command).toHaveBeenCalledWith(command, onComplete);
  });

  it('should allow customizing prompt string when writing some command', () => {
    const application = instantiateTerminalApplication({ promptString: '~/demo $' });
    const command = 'npm install';
    const onComplete = jest.fn();
    const customPromptString = '>';
    spyOn(application, 'addContent');
    application.command({ command, promptString: customPromptString }, onComplete);
    expect(application.promptString).toEqual(customPromptString);
  });

  it('should set line as active on command', () => {
    const application = instantiateTerminalApplication();
    spyOn(application, 'addContent');
    application.command({ command: 'npm install' }, jest.fn());
    expect(terminalCommandLineInstanceMock.setActive).toHaveBeenCalled();
  });

  it('should set last line commanded as inactive on command', () => {
    const application = instantiateTerminalApplication();
    spyOn(application, 'addContent');
    application.command({ command: 'first command' }, jest.fn());
    const lastLineCommanded = application.commandLines[application.commandLines.length - 1];
    lastLineCommanded.setInactive = jest.fn();
    application.command({ command: 'second command' }, jest.fn());
    expect(lastLineCommanded.setInactive).toHaveBeenCalled();
  });

  it('should build a response line on respond', () => {
    const application = instantiateTerminalApplication();
    const response = 'Successfully installed!';
    const onComplete = jest.fn();
    spyOn(application, 'addContent');
    application.respond({ response }, onComplete);
    expect(TerminalResponseLine).toHaveBeenCalled();
    expect(terminalResponseLineInstanceMock.setText).toHaveBeenCalledWith(response);
  });

  it('should add a response line to terminal application on respond', () => {
    const application = instantiateTerminalApplication();
    const response = 'Successfully installed!';
    const onComplete = jest.fn();
    spyOn(application, 'addContent');
    application.respond({ response }, onComplete);
    expect(application.addContent).toHaveBeenCalledWith(terminalResponseLineInstanceMock.element);
  });

  it('should execute complete callback after finish writing response', () => {
    const application = instantiateTerminalApplication();
    const response = 'Successfully installed!';
    const onComplete = jest.fn();
    spyOn(application, 'addContent');
    application.respond({ response }, onComplete);
    expect(onComplete).toHaveBeenCalled();
  });

});
