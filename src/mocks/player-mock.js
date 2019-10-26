export const playerInstanceMock = {
  play: jest.fn(() => {
    return {
      then: resolve => resolve()
    };
  })
};

export const PlayerMock = jest.fn(() => {
  return playerInstanceMock;
});
