export const terminalCommandLineInstanceMock = {
  command: jest.fn((textLine, onComplete) => {
    onComplete();
  }),
  element: '<div>Something</div>'
};

export const TerminalCommandLineMock = jest.fn(() => {
  return terminalCommandLineInstanceMock;
});
