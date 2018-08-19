import domService from './dom';

describe('DOM Service', () => {

  function createElement(tagName){
    return document.createElement(tagName);
  }

  it('should parse an html from string', () => {
    const element = domService.parseHtml('<h1>Hello <span>World</span>!</h1>');
    const span = element.querySelector('span');
    expect(span.innerHTML).toEqual('World');
  });

  it('should wrap html string in html tag', () => {
    const htmlString = '<h1>Hello</h1>';
    const wrappedHtmlString = domService.wrapHtmlStringInHtmlTag(htmlString, 'div');
    expect(wrappedHtmlString).toEqual(`<div>${htmlString}</div>`);
  });

  it('should clear some node content', () => {
    const node = createElement('div');
    node.innertText = 'Rafael';
    const clearedNode = domService.clearNodeContent(node);
    expect(clearedNode.innerHTML).toEqual('');
  });

  it('should identify text html nodes', () => {
    const notTextNode = createElement('div');
    notTextNode.append('Some text');
    const textNode = Array.from(notTextNode.childNodes)[0];
    expect(domService.isHtmlNodeTypeText(notTextNode)).toEqual(false);
    expect(domService.isHtmlNodeTypeText(textNode)).toEqual(true);
  });

});
