const _public = {};

_public.parseHtml = htmlString => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.querySelector('body').firstChild;
};

_public.wrapHtmlStringInHtmlTag = (htmlString, tagName) => {
  return `<${tagName}>${htmlString}</${tagName}>`;
};

_public.clearNodeContent = node => {
  node.innerHTML = '';
  return node;
};

_public.containsClosingHtmlTag = string => {
  const regex = new RegExp('</.+>', 'gm');
  return regex.test(string);
};

_public.isHtmlNodeTypeText = node => {
  return node && node.nodeName.toLowerCase() == '#text';
};

export default _public;
