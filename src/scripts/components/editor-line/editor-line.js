import '@styles/editor-line.styl';
import { Cursor } from '../cursor/cursor';
import domService from '../../services/dom/dom';
import template from './editor-line.html';

export class EditorLine {
  constructor(lineNumber, writtenText){
    this.cursor = new Cursor();
    this.element = domService.parseHtml(template);
    setNumber(this.element, lineNumber);
    setupWrittenText(this.element, writtenText);
    if(!writtenText)
      getTextElement(this.element).appendChild(this.cursor.element);
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

function setupWrittenText(lineElement, text = ''){
  getTextElement(lineElement).innerHTML = text;
}
