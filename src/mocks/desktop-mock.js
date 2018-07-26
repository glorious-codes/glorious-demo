export const desktopInstanceMock = {
  openApplication: jest.fn(),
  minimizeAllApplications: jest.fn(onComplete => {
    onComplete();
  }),
  maximizeApplication: jest.fn((application, onComplete) => {
    onComplete();
  })
};

export const TerminalApplicationMock = jest.fn(() => {
  return desktopInstanceMock;
});
