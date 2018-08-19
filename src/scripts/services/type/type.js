import textService from '../text/text';
import typePlainTextService from '../type-plain-text/type-plain-text';
import typeHtmlTextService from '../type-html-text/type-html-text';

const _public = {};

_public.type = (container, text, onComplete) => {
  if(textService.containsHtml(text))
    typeHtmlTextService.type(container, text, onComplete);
  else
    typePlainTextService.type(container, text, onComplete);
};

export default _public;
