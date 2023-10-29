import GameBoard from '../js/modules/Gameboard';
import Ship from '../js/modules/Ship';

let gameboard;

beforeEach(() => {
  gameboard = new GameBoard();
});

test('Receives a hit and sets the appropriate boardsquare.hasReceivedHit to true', () => {
  expect(gameboard.grid[0][3].hasReceivedHit).toBeFalsy();
  gameboard.receiveHit(0, 3);
  expect(gameboard.grid[0][3].hasReceivedHit).toBeTruthy();
});

test('Places ships on the board horizontally', () => {
  // Place ship 1
  expect(gameboard.grid[0][3].containsShip).toBeNull();
  let carrier = new Ship('carrier', 5, false);
  gameboard.placeShip(carrier, 0, 3);
  expect(gameboard.grid[0][3].containsShip).toBe(carrier);
  expect(gameboard.grid[0][4].containsShip).toBe(carrier);
  expect(gameboard.grid[0][5].containsShip).toBe(carrier);
  expect(gameboard.grid[0][6].containsShip).toBe(carrier);
  expect(gameboard.grid[0][7].containsShip).toBe(carrier);

  expect(gameboard.grid[0][8].containsShip).toBeNull(); // Ensures only the length of the ship is placed

  expect(gameboard.grid[0][2].containsShip).toBeNull(); // Ensures grid objects in gameboard.grid[x] are unique
  expect(gameboard.grid[1][3].containsShip).toBeNull(); // Ensures ship is not placed vertically

  // Place ship 2
  expect(gameboard.grid[3][0].containsShip).toBeNull();
  let battleship = new Ship('battleship', 4, false);
  gameboard.placeShip(battleship, 3, 0);
  expect(gameboard.grid[3][0].containsShip).toBe(battleship);
  expect(gameboard.grid[3][1].containsShip).toBe(battleship);
  expect(gameboard.grid[3][2].containsShip).toBe(battleship);
  expect(gameboard.grid[3][3].containsShip).toBe(battleship);

  // Place ship 3
  expect(gameboard.grid[6][7].containsShip).toBeNull();
  let submarine = new Ship('submarine', 3, false);
  gameboard.placeShip(submarine, 6, 7);
  expect(gameboard.grid[6][7].containsShip).toBe(submarine);
  expect(gameboard.grid[6][8].containsShip).toBe(submarine);
  expect(gameboard.grid[6][9].containsShip).toBe(submarine);
});

test('Places ship on the board vertically', () => {
  // Place ship 1
  expect(gameboard.grid[0][3].containsShip).toBeNull();
  let carrier = new Ship('carrier', 5, true);
  gameboard.placeShip(carrier, 0, 3);
  expect(gameboard.grid[0][3].containsShip).toBe(carrier);
  expect(gameboard.grid[1][3].containsShip).toBe(carrier);
  expect(gameboard.grid[2][3].containsShip).toBe(carrier);
  expect(gameboard.grid[3][3].containsShip).toBe(carrier);
  expect(gameboard.grid[4][3].containsShip).toBe(carrier);

  expect(gameboard.grid[5][3].containsShip).toBeNull(); // Ensures only the length of the ship is placed
  expect(gameboard.grid[0][2].containsShip).toBeNull(); // Ensures grid objects in gameboard.grid[x] are unique
  expect(gameboard.grid[0][4].containsShip).toBeNull(); // Ensures ship is not placed horizontally

  // Place ship 2
  expect(gameboard.grid[3][0].containsShip).toBeNull();
  let battleship = new Ship('battleship', 4, true);
  gameboard.placeShip(battleship, 3, 0);
  expect(gameboard.grid[3][0].containsShip).toBe(battleship);
  expect(gameboard.grid[4][0].containsShip).toBe(battleship);
  expect(gameboard.grid[5][0].containsShip).toBe(battleship);
  expect(gameboard.grid[6][0].containsShip).toBe(battleship);

  // Place ship 3
  expect(gameboard.grid[6][7].containsShip).toBeNull();
  let submarine = new Ship('submarine', 3, true);
  gameboard.placeShip(submarine, 6, 7);
  expect(gameboard.grid[6][7].containsShip).toBe(submarine);
  expect(gameboard.grid[7][7].containsShip).toBe(submarine);
  expect(gameboard.grid[8][7].containsShip).toBe(submarine);
});

test('Places ship in an invalid spot on the board', () => {});
