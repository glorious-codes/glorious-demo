import typeService from './type';
import textService from '../text/text';
import typeHtmlTextService from '../type-html-text/type-html-text';
import typePlainTextService from '../type-plain-text/type-plain-text';

describe('Type Service', () => {

  function mockContainer(){
    return document.createElement('div');
  }

  function mockOnCompleteCallback(){
    return jest.fn();
  }

  beforeEach(() => {
    spyOn(typeHtmlTextService, 'type');
    spyOn(typePlainTextService, 'type');
  })

  it('should type some plain text', () => {
    const container = mockContainer();
    const onComplete = mockOnCompleteCallback();
    const text = 'just plain text';
    spyOn(textService, 'containsHtml').and.returnValue(false);
    typeService.type(container, text, onComplete);
    expect(typePlainTextService.type).toHaveBeenCalledWith(container, text, onComplete);
  });

  it('should type some html text', () => {
    const container = mockContainer();
    const onComplete = mockOnCompleteCallback();
    const text = 'this is <strong>bold</strong>';
    spyOn(textService, 'containsHtml').and.returnValue(true);
    typeService.type(container, text, onComplete);
    expect(typeHtmlTextService.type).toHaveBeenCalledWith(container, text, onComplete);
  });

});
