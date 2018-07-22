export const terminalResponseLineInstanceMock = {
  setText: jest.fn(),
  element: '<div>Something</div>'
};

export const TerminalResponseLineMock = jest.fn(() => {
  return terminalResponseLineInstanceMock;
});
