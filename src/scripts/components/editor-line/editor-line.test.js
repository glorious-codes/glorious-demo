import typeService from '../../services/type/type';
import { EditorLine } from './editor-line';

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

  it('should allow to write some text on the line', () => {
    const line = new EditorLine();
    const textElement = line.element.querySelector('[data-editor-line-text]');
    const text = 'const number = 1;';
    const onComplete = jest.fn();
    line.write(text, onComplete);
    expect(typeService.type).toHaveBeenCalledWith(
      textElement,
      text,
      onComplete
    );
  });

});
