import GameBoard from '../js/modules/Gameboard';
import Ship from '../js/modules/Ship';

let gameboard;

beforeAll(() => {
  gameboard = new GameBoard();
});

test('Receives a hit and sets the appropriate boardsquare.hasReceivedHit to true', () => {
  expect(gameboard.grid[0][3].hasReceivedHit).toBeFalsy();
  gameboard.receiveHit(0, 3);
  expect(gameboard.grid[0][3].hasReceivedHit).toBeTruthy();
});

test('Places ship on the board horizontally', () => {
  expect(gameboard.grid[0][3].containsShip).toBeNull();
  let destroyer = new Ship('destroyer', 5, false);
  gameboard.placeShip(destroyer, 0, 3);
  expect(gameboard.grid[0][3].containsShip).toBe(destroyer);
  expect(gameboard.grid[0][4].containsShip).toBe(destroyer);
  expect(gameboard.grid[0][5].containsShip).toBe(destroyer);
  expect(gameboard.grid[0][6].containsShip).toBe(destroyer);
  expect(gameboard.grid[0][7].containsShip).toBe(destroyer);

  expect(gameboard.grid[0][8].containsShip).toBeNull(); // Ensures only the length of the ship is placed

  expect(gameboard.grid[0][2].containsShip).toBeNull(); // Ensures grid objects in gameboard.grid[x] are unique
  expect(gameboard.grid[1][3].containsShip).toBeNull(); // Ensures ship is not placed vertically
});

test('Places ship on the board vertically', () => {});

test('Places ship in an invalid spot on the board', () => {});
