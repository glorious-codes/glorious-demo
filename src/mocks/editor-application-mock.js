export const editorApplicationInstanceMock = {
  minimize: jest.fn(),
  maximize: jest.fn(),
  element: '<div>Something</div>',
  type: 'editor'
};

export const EditorApplicationMock = jest.fn((containerEl, { inanimate, id } = {}) => {
  return {
    ...editorApplicationInstanceMock,
    inanimate,
    id
  };
});
