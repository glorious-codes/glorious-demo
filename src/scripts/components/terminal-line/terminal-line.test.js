import { TerminalLine } from './terminal-line';

describe('Terminal Line Component', () => {

  it('should build terminal line on instantiate', () => {
    const line = new TerminalLine();
    expect(line.element.classList[0]).toEqual('terminal-line');
  });

  it('should set content', () => {
    const line = new TerminalLine();
    const paragraph = document.createElement('p');
    paragraph.innerText = 'content';
    line.setContent(paragraph);
    expect(line.element.querySelector('p').innerText).toEqual('content');
  });

});
