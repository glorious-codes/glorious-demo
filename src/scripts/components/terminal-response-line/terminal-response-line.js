import '@styles/terminal-response-line.styl';
import { TerminalLine } from '../terminal-line/terminal-line';
import domService from '../../services/dom/dom';
import template from 'html-loader!./terminal-response-line.html';

export class TerminalResponseLine extends TerminalLine {
  constructor(){
    super();
    this.setContent(domService.parseHtml(template));
  }
  setText(text){
    const textContainer = this.element.querySelector('[data-terminal-response-line-text]');
    return domService.containsClosingHtmlTag(text) ?
      appendHtml(textContainer, domService.parseHtml(text)) :
      appendText(textContainer, text);
  }
}

function appendHtml(container, html){
  container.appendChild(html);
}

function appendText(container, text){
  container.innerText = text;
}
