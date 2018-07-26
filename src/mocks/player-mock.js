export const playerInstanceMock = {
  play: jest.fn()
};

export const PlayerMock = jest.fn(() => {
  return playerInstanceMock;
});
