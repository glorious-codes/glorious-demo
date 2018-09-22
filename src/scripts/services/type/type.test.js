import typeService from './type';
import domService from '../text/text';
import typeHtmlTextService from '../type-html-text/type-html-text';
import typePlainTextService from '../type-plain-text/type-plain-text';

describe('Type Service', () => {
  function mockContainer(){
    return document.createElement('div');
  }

  function stubServiceType(shouldAbortCompleteCallback){
    typePlainTextService.type = jest.fn((container, text, onComplete) => {
      if(!shouldAbortCompleteCallback)
        onComplete();
    });
  }

  beforeEach(() => {
    typeHtmlTextService.type = jest.fn();
  });

  it('should type some plain text', () => {
    const container = mockContainer();
    const onComplete = jest.fn();
    const text = 'just plain text';
    stubServiceType();
    domService.containsClosingHtmlTag = jest.fn(() => false);
    typeService.type(container, text, onComplete);
    expect(typePlainTextService.type.mock.calls[0][0]).toEqual(container);
    expect(typePlainTextService.type.mock.calls[0][1]).toEqual(text);
    expect(typeof typePlainTextService.type.mock.calls[0][2]).toEqual('function');
  });

  it('should type some html text', () => {
    const container = mockContainer();
    const onComplete = jest.fn();
    const text = 'this is <strong>bold</strong>';
    stubServiceType();
    domService.containsClosingHtmlTag = jest.fn(() => true);
    typeService.type(container, text, onComplete);
    expect(typeHtmlTextService.type.mock.calls[0][0]).toEqual(container);
    expect(typeHtmlTextService.type.mock.calls[0][1]).toEqual(text);
    expect(typeof typeHtmlTextService.type.mock.calls[0][2]).toEqual('function');
  });

  it('should add typing css class on type', () => {
    const container = mockContainer();
    const onComplete = jest.fn();
    const text = 'just plain text';
    stubServiceType(true);
    domService.containsClosingHtmlTag = jest.fn(() => false);
    typeService.type(container, text, onComplete);
    expect(container.classList.contains('is-typing')).toEqual(true);
  });

  it('should remove typing css class on type complete', () => {
    const container = mockContainer();
    const onComplete = jest.fn();
    const text = 'just plain text';
    stubServiceType();
    domService.containsClosingHtmlTag = jest.fn(() => false);
    typeService.type(container, text, onComplete);
    expect(container.classList.contains('is-typing')).toEqual(false);
  });
});
