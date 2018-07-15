import { TerminalCommandLine } from './terminal-command-line';
import typeService from '../../services/type/type';

describe('Terminal Command Line Component', () => {

  it('should set line content in terminal line on instantiate', () => {
    const line = new TerminalCommandLine();
    const wrapper = line.element;
    const promptStringElement = line.element.querySelector('[data-terminal-command-line-prompt-string]');
    const textElement = line.element.querySelector('[data-terminal-command-line-text]');
    expect(wrapper.classList[0]).toEqual('terminal-line');
    expect(promptStringElement.classList[0]).toEqual('terminal-command-line-prompt-string');
    expect(textElement.classList[0]).toEqual('terminal-command-line-text');
  });

  it('should write some command', () => {
    spyOn(typeService, 'type');
    const line = new TerminalCommandLine();
    const command = 'npm install';
    const onComplete = jest.fn();
    const commandTextContainer = line.element.querySelector('[data-terminal-command-line-text]');
    line.command(command, onComplete);
    expect(typeService.type).toHaveBeenCalledWith(commandTextContainer, command, onComplete);
  });

});
