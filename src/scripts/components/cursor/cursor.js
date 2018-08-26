import '@styles/cursor.styl';
import domService from '../../services/dom/dom';
import typeService from '../../services/type/type';
import template from './cursor.html';

const ACTIVE_CSS_CLASS = 'cursor-active';

export class Cursor {
  constructor(){
    this.element = domService.parseHtml(template);
  }
  write(text, onComplete){
    typeService.type(this.element, text, onComplete);
  }
  setActive(){
    handleCssClass(this.element, 'add', ACTIVE_CSS_CLASS);
  }
  setInactive(){
    handleCssClass(this.element, 'remove', ACTIVE_CSS_CLASS);
  }
}

function handleCssClass(cursorElement, action, cssClass){
  cursorElement.classList[action](cssClass);
}
