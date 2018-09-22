import '@styles/editor-line.styl';
import { Cursor } from '../cursor/cursor';
import domService from '../../services/dom/dom';
import template from './editor-line.html';

export class EditorLine {
  constructor(lineNumber){
    this.cursor = new Cursor();
    this.element = domService.parseHtml(template);
    getTextElement(this.element).appendChild(this.cursor.element);
    setNumber(this.element, lineNumber);
  }
  write(text, onComplete){
    this.cursor.write(text, onComplete);
  }
  setActive(){
    this.cursor.setActive();
  }
  setInactive(){
    this.cursor.setInactive();
  }
}

function setNumber(lineElement, number){
  getNumberElement(lineElement).innerText = number;
}

function getNumberElement(lineElement){
  return getInnerElement(lineElement, '[data-editor-line-number]');
}

function getTextElement(lineElement){
  return getInnerElement(lineElement, '[data-editor-line-text]');
}

function getInnerElement(lineElement, selector){
  return lineElement.querySelector(selector);
}
