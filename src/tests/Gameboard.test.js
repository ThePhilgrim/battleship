import GameBoard from '../js/modules/Gameboard';
import Ship from '../js/modules/Ship';

let gameboard;

beforeEach(() => {
  gameboard = new GameBoard();
});

test('Receives a hit and sets the appropriate boardsquare.hasReceivedHit to true', () => {
  expect(gameboard.grid[0][3].hasReceivedHit).toBeFalsy();
  gameboard.receiveAttack(0, 3);
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

test('Places horizontal ship out of bounds on the board', () => {
  // Check if placed too far right
  expect(gameboard.grid[0][7].containsShip).toBeNull();
  let carrier = new Ship('carrier', 5, false);
  gameboard.placeShip(carrier, 0, 7);
  expect(gameboard.grid[0][7].containsShip).toBeNull();
  expect(gameboard.grid[0][8].containsShip).toBeNull();
  expect(gameboard.grid[0][9].containsShip).toBeNull();

  // Check if placed too far left
  gameboard.placeShip(carrier, 0, -1);
  expect(gameboard.grid[0][0].containsShip).toBeNull();
});

test('Places vertical ship out of bounds on the board', () => {
  // Check if placed too far down
  expect(gameboard.grid[7][0].containsShip).toBeNull();
  let carrier = new Ship('carrier', 5, true);
  gameboard.placeShip(carrier, 0, 7);
  expect(gameboard.grid[7][0].containsShip).toBeNull();
  expect(gameboard.grid[8][0].containsShip).toBeNull();
  expect(gameboard.grid[9][0].containsShip).toBeNull();

  // Check if placed too far up
  gameboard.placeShip(carrier, -1, 0);
  expect(gameboard.grid[0][0].containsShip).toBeNull();
});

test('Places overlapping ships on the board', () => {
  let carrier = new Ship('carrier', 5, false);
  gameboard.placeShip(carrier, 4, 3);

  // Place horizontal overlapping ship
  let horizontalSubmarine = new Ship('submarine', 3, false);
  gameboard.placeShip(horizontalSubmarine, 4, 1);
  expect(gameboard.grid[4][1].containsShip).toBeNull();
  expect(gameboard.grid[4][3].containsShip).toBe(carrier);

  // Place vertical overlapping ship
  let verticalSubmarine = new Ship('submarine', 3, true);
  gameboard.placeShip(verticalSubmarine, 4, 3);
  expect(gameboard.grid[5][3].containsShip).toBeNull();
  expect(gameboard.grid[4][3].containsShip).toBe(carrier);
});
