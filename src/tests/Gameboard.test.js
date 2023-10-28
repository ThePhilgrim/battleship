import GameBoard from '../js/modules/Gameboard';

let gameboard;

beforeAll(() => {
  gameboard = new GameBoard();
});

test('Receives a hit and sets the appropriate boardsquare.hasReceivedHit to true', () => {
  expect(gameboard.grid[0][3].hasReceivedHit).toBeFalsy();
  gameboard.receiveHit(0, 3);
  expect(gameboard.grid[0][3].hasReceivedHit).toBeTruthy();
});
