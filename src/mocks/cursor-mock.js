export const cursorInstanceMock = {
  element: document.createElement('span'),
  write: jest.fn()
};

export const CursorMock = jest.fn(() => {
  return cursorInstanceMock;
});
