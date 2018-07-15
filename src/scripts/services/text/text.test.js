import textService from './text';

describe('Text Service', () => {

  it('should transform some text in kebab case', () => {
    const text = textService.toKebabCase('Editor Application');
    expect(text).toEqual('editor-application');
  });

  it('should identify an empty string', () => {
    expect(textService.isEmptyString('')).toEqual(true);
  });

  it('should identify an non empty string', () => {
    expect(textService.isEmptyString('application')).toEqual(false);
  });

  it('should remove first line when it\'s empty', () => {
    const text = `
second line
third line`;
    expect(textService.removeBlankFirstLine(text)).toEqual([
      'second line',
      'third line'
    ]);
  });

  it('should not remove first line when it\'s not empty', () => {
    const text = 'first line';
    expect(textService.removeBlankFirstLine(text)).toEqual(['first line']);
  });

});
