import typePlainTextService from './type-plain-text';

describe('Type Plain Text Service', () => {

  let onCompleteCallbackMock;

  jest.useFakeTimers();

  function mockOnCompleteCallback(){
    onCompleteCallbackMock = jest.fn();
  }

  beforeEach(() => {
    mockOnCompleteCallback();
  });

  it('should type some plain text', () => {
    const containerElement = document.createElement('div');
    const textToBeTyped = 'Typed!';
    typePlainTextService.type(containerElement, textToBeTyped, onCompleteCallbackMock);
    jest.runAllTimers();
    expect(containerElement.innerHTML).toEqual(textToBeTyped);
  });

  it('should callback after type some plain text', () => {
    const containerElement = document.createElement('div');
    const textToBeTyped = 'Typed!';
    typePlainTextService.type(containerElement, textToBeTyped, onCompleteCallbackMock);
    jest.runAllTimers();
    expect(onCompleteCallbackMock).toHaveBeenCalledTimes(1);
  });

});
