const _public = {};

_public.parseHtml = htmlString => {
  const parser = new DOMParser();
  const doc = parser.parseFromString(htmlString, 'text/html');
  return doc.querySelector('body').firstChild;
};

export default _public;
