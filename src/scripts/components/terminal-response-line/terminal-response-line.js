import { TerminalLine } from '../terminal-line/terminal-line';
import domService from '../../services/dom/dom';
import template from './terminal-response-line.html';

export class TerminalResponseLine extends TerminalLine {
  constructor(lineText){
    super();
    this.setContent(domService.parseHtml(template));
  }
  setText(text){
    const textContainer = this.element.querySelector('[data-terminal-response-line-text]');
    textContainer.innerText = text;
  }
}
