import textService from '../../services/text/text';
import { EditorLine } from '../editor-line/editor-line';
import { EditorApplication } from './editor-application';
import { EditorLineMock, editorLineInstanceMock } from '@mocks/editor-line-mock';

jest.mock('../editor-line/editor-line');
EditorLine.mockImplementation(EditorLineMock);

describe('Editor Application Component', () => {

  function stubRemoveBlankFirstLine(value){
    spyOn(textService, 'removeBlankFirstLine').and.returnValue(value);
  }

  function instantiateEditorApplication(options){
    const container = document.createElement('div');
    return new EditorApplication(container, options);
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
    const windowTitle = 'Atom';
    const application = instantiateEditorApplication({ windowTitle });
    expect(application.windowTitle).toEqual(windowTitle);
  });

  it('should add written line to the application content', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1';
    const onComplete = jest.fn();
    application.addContent = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write({ codeSample }, onComplete);
    expect(application.addContent).toHaveBeenCalledWith(editorLineInstanceMock.element);
  });

  it('should instance a editor application line when writing some code', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1';
    const onComplete = jest.fn();
    application.addContent = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write({ codeSample }, onComplete);
    expect(EditorLineMock).toHaveBeenCalledWith(1);
  });

  it('should set line as active on write', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1';
    const onComplete = jest.fn();
    application.addContent = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write({ codeSample }, onComplete);
    expect(editorLineInstanceMock.setActive.mock.calls.length).toEqual(1);
  });

  it('should write a single-line code', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1';
    const onComplete = jest.fn();
    application.addContent = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write({ codeSample }, onComplete);
    expect(editorLineInstanceMock.write.mock.calls[0][0]).toEqual(codeSample);
    expect(typeof editorLineInstanceMock.write.mock.calls[0][1]).toEqual('function');
  });

  it('should write a multi-line code', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1\nLine 2\nLine 3';
    const onComplete = jest.fn();
    application.addContent = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write({ codeSample }, onComplete);
    expect(editorLineInstanceMock.write.mock.calls[0][0]).toEqual('Line 1');
    expect(editorLineInstanceMock.write.mock.calls[1][0]).toEqual('Line 2');
    expect(editorLineInstanceMock.write.mock.calls[2][0]).toEqual('Line 3');
    expect(editorLineInstanceMock.write.mock.calls.length).toEqual(3);
  });

  it('should set last line written as inactive when writing a new line', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1\nLine 2';
    const onComplete = jest.fn();
    application.addContent = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write({ codeSample }, onComplete);
    expect(editorLineInstanceMock.setInactive.mock.calls.length).toEqual(1);
  });

  it('should execute on complete callback after finish writing some code', () => {
    const application = instantiateEditorApplication();
    const codeSample = 'Line 1';
    const onComplete = jest.fn();
    application.addContent = jest.fn();
    stubRemoveBlankFirstLine(codeSample.split('\n'));
    application.write({ codeSample }, onComplete);
    expect(onComplete).toHaveBeenCalled();
  });

});
