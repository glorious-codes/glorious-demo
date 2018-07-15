import domService from '../../services/dom/dom';
import typeService from '../../services/type/type';
import template from './editor-line.html';

export class EditorLine {
  constructor(lineNumber){
    this.element = domService.parseHtml(template);
    setNumber(this.element, lineNumber);
  }
  write(text, onComplete){
    typeService.type(getTextElement(this.element), text, onComplete);
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
