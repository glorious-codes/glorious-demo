import typePlainTextService from '../type-plain-text/type-plain-text';
import typeHtmlTextService from './type-html-text';

describe('Type Html Text Service', () => {

  function createElement(tagName){
    return document.createElement(tagName);
  }

  beforeEach(() => {
    spyOn(typePlainTextService, 'type').and.callFake((container, text, onComplete) => {
      onComplete();
    });
  });

  it('should type some html text', () => {
    const container = createElement('div');
    const htmlString = 'some <span>text</span>';
    const onComplete = jest.fn();
    typeHtmlTextService.type(container, htmlString, onComplete);
    expect(typePlainTextService.type.calls.allArgs()[0][0]).toEqual(container);
    expect(typePlainTextService.type.calls.allArgs()[0][1]).toEqual('some ');
    expect(typeof typePlainTextService.type.calls.allArgs()[0][2]).toEqual('function');
    expect(typePlainTextService.type.calls.allArgs()[1][0]).toEqual(createElement('span'));
    expect(typePlainTextService.type.calls.allArgs()[1][1]).toEqual('text');
    expect(typeof typePlainTextService.type.calls.allArgs()[1][2]).toEqual('function');
  });

  it('should execute on complete callback on complete', () => {
    const container = createElement('div');
    const htmlString = 'some <span>text</span>';
    const onComplete = jest.fn();
    typeHtmlTextService.type(container, htmlString, onComplete);
    expect(onComplete).toHaveBeenCalled();
  });

});
