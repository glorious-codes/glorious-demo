import domService from '../dom/dom';
import typePlainTextService from '../type-plain-text/type-plain-text';

const _public = {};

_public.type = (container, htmlString, onComplete) => {
  const nodes = buildHtmlNodes(htmlString);
  typeHtmlNodes(container, nodes, onComplete);
};

function buildHtmlNodes(htmlString){
  const wrappedHtmlString = domService.wrapHtmlStringInHtmlTag(htmlString, 'span');
  const html = domService.parseHtml(wrappedHtmlString);
  return Array.from(html.childNodes);
}

function typeHtmlNodes(container, nodes, onComplete){
  if(!nodes.length)
    return onComplete();
  typeSingleHtmlNode(container, nodes.shift(), () => {
    typeHtmlNodes(container, nodes, onComplete);
  });
}

function typeSingleHtmlNode(container, node, onComplete){
  if(domService.isHtmlNodeTypeText(node))
    typePlainText(node.textContent, container, onComplete);
  else
    typePlainText(node.textContent, buildSubContainer(container, node), onComplete);
}

function buildSubContainer(container, node){
  const subContainer = domService.clearNodeContent(node);
  container.appendChild(subContainer);
  return subContainer;
}

function typePlainText(text, container, onComplete){
  typePlainTextService.type(container, text, onComplete);
}

export default _public;
