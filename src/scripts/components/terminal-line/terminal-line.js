import '@styles/terminal-line.styl';
import domService from '../../services/dom/dom';
import template from 'html-loader!./terminal-line.html';

export class TerminalLine {
  constructor(){
    this.element = domService.parseHtml(template);
  }
  setContent(html){
    this.element.append(html);
  }
}
