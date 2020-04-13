export const editorApplicationInstanceMock = {
  minimize: jest.fn(),
  maximize: jest.fn(),
  element: '<div>Something</div>',
  type: 'editor'
};

export const EditorApplicationMock = jest.fn((applicationType, { inanimate } = {}) => {
  const { minimize, maximize, element, type } = editorApplicationInstanceMock;
  return {
    minimize,
    maximize,
    element,
    type,
    inanimate
  };
});
