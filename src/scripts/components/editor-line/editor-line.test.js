import typeService from '../../services/type/type';
import { Cursor } from '../cursor/cursor';
import { EditorLine } from './editor-line';
import { CursorMock, cursorInstanceMock } from '@mocks/cursor-mock';

jest.mock('../cursor/cursor');
Cursor.mockImplementation(CursorMock);

describe('Editor Line Component', () => {

  beforeEach(() => {
    spyOn(typeService, 'type');
  });

  it('should build editor line on instantiate', () => {
    const line = new EditorLine();
    expect(line.element.classList[0]).toEqual('editor-line');
  });

  it('should set line number on instantiate', () => {
    const line = new EditorLine(1);
    const numberElement = line.element.querySelector('[data-editor-line-number]');
    expect(numberElement.innerText).toEqual(1);
  });

  it('should append a cursor element in editor line text element on instantiate', () => {
    const line = new EditorLine(1);
    const cursorElement = line.element.querySelectorAll('[data-editor-line-text] > span');
    expect(cursorElement.length).toEqual(1);
  });

  it('should write some text using cursor', () => {
    const line = new EditorLine(1);
    const text = 'const number = 1;';
    const onComplete = jest.fn();
    line.write(text, onComplete);
    expect(line.cursor.write).toHaveBeenCalledWith(text, onComplete);
  });

  it('should set line as active', () => {
    const line = new EditorLine(1);
    line.cursor.setActive = jest.fn();
    line.setActive();
    expect(line.cursor.setActive).toHaveBeenCalled();
  });

  it('should set line as inactive', () => {
    const line = new EditorLine(1);
    line.cursor.setInactive = jest.fn();
    line.setInactive();
    expect(line.cursor.setInactive).toHaveBeenCalled();
  });

});
