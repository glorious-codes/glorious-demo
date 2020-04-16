export const editorLineInstanceMock = {
  setActive: jest.fn(),
  setInactive: jest.fn(),
  write: jest.fn((textLine, onComplete) => {
    onComplete();
  }),
  element: document.createElement('div')
};

export const EditorLineMock = jest.fn(() => {
  return editorLineInstanceMock;
});
