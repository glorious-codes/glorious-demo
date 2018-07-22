export const editorLineInstanceMock = {
  write: jest.fn((textLine, onComplete) => {
    onComplete();
  }),
  element: '<div>Something</div>'
};

export const EditorLineMock = jest.fn(() => {
  return editorLineInstanceMock;
});
