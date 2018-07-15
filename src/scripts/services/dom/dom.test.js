import domService from './dom';

describe('DOM Service', () => {

  it('should parse an html from string', () => {
    const element = domService.parseHtml('<h1>Hello <span>World</span>!</h1>');
    const span = element.querySelector('span');
    expect(span.innerHTML).toEqual('World');
  });

});
