import '@styles/terminal-command-line.styl';
import { Cursor } from '../cursor/cursor';
import { TerminalLine } from '../terminal-line/terminal-line';
import domService from '../../services/dom/dom';
import template from './terminal-command-line.html';

export class TerminalCommandLine extends TerminalLine {
  constructor(promptString){
    super();
    this.cursor = new Cursor();
    this.setContent(domService.parseHtml(template));
    this.setPromptString(promptString);
    getTextElement(this.element).appendChild(this.cursor.element);
  }
  setPromptString(promptString){
    const container = this.element.querySelector('[data-terminal-command-line-prompt-string]');
    container.innerText = promptString;
  }
  command(text, onComplete){
    this.cursor.write(text, onComplete);
  }
  setActive(){
    this.cursor.setActive();
  }
  setInactive(){
    this.cursor.setInactive();
  }
}

function getTextElement(lineElement){
  return lineElement.querySelector('[data-terminal-command-line-text]');
}
