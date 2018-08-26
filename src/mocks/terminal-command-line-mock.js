export const terminalCommandLineInstanceMock = {
  command: jest.fn((textLine, onComplete) => {
    onComplete();
  }),
  setActive: jest.fn(),
  setInactive: jest.fn(),
  element: '<div>Something</div>'
};

export const TerminalCommandLineMock = jest.fn(() => {
  return terminalCommandLineInstanceMock;
});
