import domService from '../dom/dom';
import typePlainTextService from '../type-plain-text/type-plain-text';
import typeHtmlTextService from '../type-html-text/type-html-text';

const _public = {};

const TYPING_CSS_CLASS = 'is-typing';

_public.type = (container, text, onComplete) => {
  handleIsTypingCssClass(container, 'add', TYPING_CSS_CLASS);
  getSpecificTypeService(text).type(container, text, () => {
    handleIsTypingCssClass(container, 'remove', TYPING_CSS_CLASS);
    onComplete();
  });
};

function handleIsTypingCssClass(element, action, cssClass){
  element.classList[action](cssClass);
}

function getSpecificTypeService(text){
  if(domService.containsClosingHtmlTag(text))
    return typeHtmlTextService;
  return typePlainTextService;
}

export default _public;
