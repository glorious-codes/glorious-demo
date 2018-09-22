import { Cursor } from '../cursor/cursor';
import { TerminalCommandLine } from './terminal-command-line';
import { CursorMock } from '@mocks/cursor-mock';

jest.mock('../cursor/cursor');
Cursor.mockImplementation(CursorMock);

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

  it('should set prompt string as plain text', () => {
    const line = new TerminalCommandLine('>');
    const promptStringElement = line.element.querySelector('[data-terminal-command-line-prompt-string]');
    expect(promptStringElement.innerHTML.trim()).toEqual('&gt;');
  });

  it('should set prompt string as html', () => {
    const line = new TerminalCommandLine('<span>!</span>');
    const promptStringElement = line.element.querySelector('[data-terminal-command-line-prompt-string]');
    expect(promptStringElement.querySelector('span').innerHTML).toEqual('!');
  });

  it('should append a cursor element in terminal line text element on instantiate', () => {
    const line = new TerminalCommandLine();
    const cursorElement = line.element.querySelectorAll('[data-terminal-command-line-text] > span');
    expect(cursorElement.length).toEqual(1);
  });

  it('should write some command using cursor', () => {
    const line = new TerminalCommandLine();
    const command = 'npm install';
    const onComplete = jest.fn();
    line.command(command, onComplete);
    expect(line.cursor.write).toHaveBeenCalledWith(command, onComplete);
  });

  it('should set line as active', () => {
    const line = new TerminalCommandLine();
    line.cursor.setActive = jest.fn();
    line.setActive();
    expect(line.cursor.setActive).toHaveBeenCalled();
  });

  it('should set line as inactive', () => {
    const line = new TerminalCommandLine();
    line.cursor.setInactive = jest.fn();
    line.setInactive();
    expect(line.cursor.setInactive).toHaveBeenCalled();
  });

});
