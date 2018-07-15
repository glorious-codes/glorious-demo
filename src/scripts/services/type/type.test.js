import typeService from './type';

describe('Type Service', () => {

  let onCompleteCallbackMock;

  jest.useFakeTimers();

  function mockOnCompleteCallback(){
    onCompleteCallbackMock = jest.fn();
  }

  beforeEach(() => {
    mockOnCompleteCallback();
  });

  it('should type some text', () => {
    const containerElement = document.createElement('div');
    const textToBeTyped = 'Typed!';
    typeService.type(containerElement, textToBeTyped, onCompleteCallbackMock);
    jest.runAllTimers();
    expect(containerElement.innerHTML).toEqual(textToBeTyped);
  });

  it('should callback after type some text', () => {
    const containerElement = document.createElement('div');
    const textToBeTyped = 'Typed!';
    typeService.type(containerElement, textToBeTyped, onCompleteCallbackMock);
    jest.runAllTimers();
    expect(onCompleteCallbackMock).toHaveBeenCalledTimes(1);
  });

});
