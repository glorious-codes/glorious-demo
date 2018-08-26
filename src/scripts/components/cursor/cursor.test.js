import typeService from '../../services/type/type';
import { Cursor } from './cursor';

describe('Cursor', () => {
  function mockContent(){
    return document.createElement('div');
  }

  it('should write some text', () => {
    typeService.type = jest.fn();
    const onComplete = jest.fn();
    const text = 'some text';
    const cursor = new Cursor(mockContent());
    cursor.write(text, onComplete);
    expect(typeService.type).toHaveBeenCalledWith(cursor.element, text, onComplete);
  });

  it('should set cursor as active', () => {
    const cursor = new Cursor(mockContent());
    cursor.setActive();
    expect(cursor.element.classList.contains('cursor-active')).toEqual(true);
  });

  it('should set cursor as inactive', () => {
    const cursor = new Cursor(mockContent());
    cursor.element.classList.add('cursor-active');
    cursor.setInactive();
    expect(cursor.element.classList.contains('cursor-active')).toEqual(false);
  });

});
