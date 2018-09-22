import { TerminalResponseLine } from './terminal-response-line';

describe('Terminal Response Line Component', () => {

  it('should build line element on instantiate', () => {
    const line = new TerminalResponseLine();
    const wrapper = line.element;
    const textElement = line.element.querySelector('[data-terminal-response-line-text]');
    expect(wrapper.classList[0]).toEqual('terminal-line');
    expect(textElement.classList[0]).toEqual('terminal-response-line-text');
  });

  it('should set line as plain text', () => {
    const text = 'hello';
    const line = new TerminalResponseLine();
    line.setText(text);
    const textElement = line.element.querySelector('[data-terminal-response-line-text]');
    expect(textElement.innerText).toEqual(text);
  });

  it('should set line as html', () => {
    const text = '<span>hello</span>';
    const line = new TerminalResponseLine();
    line.setText(text);
    const textElement = line.element.querySelector('[data-terminal-response-line-text]');
    expect(textElement.querySelector('span').innerHTML).toEqual('hello');
  });

});
