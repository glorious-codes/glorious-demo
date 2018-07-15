import domService from '../../services/dom/dom';
import template from './terminal-line.html';

export class TerminalLine {
  constructor(){
    this.element = domService.parseHtml(template);
  }
  setContent(html){
    this.element.append(html);
  }
}
