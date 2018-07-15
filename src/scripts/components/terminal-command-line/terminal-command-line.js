import { TerminalLine } from '../terminal-line/terminal-line';
import typeService from '../../services/type/type';
import domService from '../../services/dom/dom';
import template from './terminal-command-line.html';

export class TerminalCommandLine extends TerminalLine {
  constructor(promptString){
    super();
    this.setContent(domService.parseHtml(template));
    this.setPromptString(promptString);
  }
  setPromptString(promptString){
    const container = this.element.querySelector('[data-terminal-command-line-prompt-string]');
    container.innerText = promptString;
  }
  command(text, onComplete){
    typeService.type(getCommandTextContainer(this.element), text, onComplete);
  }
}

function getCommandTextContainer(lineElement){
  return lineElement.querySelector('[data-terminal-command-line-text]');
}
