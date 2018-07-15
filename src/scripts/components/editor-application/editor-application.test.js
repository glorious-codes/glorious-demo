import textService from '../../services/text/text';
import { EditorLine } from '../editor-line/editor-line';
import { EditorApplication } from './editor-application';

jest.mock('../editor-line/editor-line');
const editorLineInstanceMock = {
  write: jest.fn((textLine, onComplete) => {
    onComplete();
  }),
  element: '<div>Something</div>'
};
const EditorLineMock = jest.fn(() => {
  return editorLineInstanceMock;
});
EditorLine.mockImplementation(EditorLineMock);

describe('Editor Application Component', () => {

  function stubRemoveBlankFirstLine(value){
    spyOn(textService, 'removeBlankFirstLine').and.returnValue(value);
  }

  function instantiateEditorApplication(options){
    const container = document.createElement('div');
    const application = new EditorApplication(container, options);
    spyOn(application, 'addContent');
    return application;
  }

  it('should build editor application wrapper on instantiate', () => {
    const application = instantiateEditorApplication();
    expect(application.element.classList[0]).toEqual('editor-application');
  });

  it('should config window title with default window title if no window title option is given', () => {
    const application = instantiateEditorApplication();
    expect(application.windowTitle).toEqual('~/demo/demo.js');
  });

  it('should config window title with the window title given as option', () => {
    const windowTitle = 'Atom'
    const application = instantiateEditorApplication({ windowTitle });
    expect(application.windowTitle).toEqual(windowTitle);
  });

  it('should add written line to the application content', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1';
    const onComplete = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write(codeSample, onComplete);
    expect(application.addContent).toHaveBeenCalledWith(editorLineInstanceMock.element);
  });

  it('should write a single-line code', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1';
    const onComplete = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write(codeSample, onComplete);
    expect(EditorLineMock).toHaveBeenCalledWith(1);
    expect(editorLineInstanceMock.write).toHaveBeenCalledWith(codeSample, jasmine.any(Function));
  });

  it('should write a multi-line code', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1\nLine 2\nLine 3';
    const onComplete = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write(codeSample, onComplete);
    expect(EditorLineMock.mock.calls[0][0]).toEqual(1);
    expect(EditorLineMock.mock.calls[1][0]).toEqual(2);
    expect(EditorLineMock.mock.calls[2][0]).toEqual(3);
    expect(EditorLineMock.mock.calls.length).toEqual(3);
    expect(editorLineInstanceMock.write.mock.calls[0][0]).toEqual('Line 1');
    expect(editorLineInstanceMock.write.mock.calls[1][0]).toEqual('Line 2');
    expect(editorLineInstanceMock.write.mock.calls[2][0]).toEqual('Line 3');
    expect(editorLineInstanceMock.write.mock.calls.length).toEqual(3);
  });

  it('should execute on complete callback after finish writing some code', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1';
    const onComplete = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write(codeSample, onComplete);
    expect(onComplete).toHaveBeenCalled();
  });

});
