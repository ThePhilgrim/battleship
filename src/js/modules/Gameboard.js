import { DEBUG } from './Battleships.js';

export default class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 10 }, (e) => Array.from({ length: 10 }, (e) => new boardSquare()));
    this.ships = new Array();
  }

  printBoard() {
    console.group('Board');
    this.grid.forEach((row, index) => {
      const line = row.reduce((previous, current) => {
        let field;

        if (current.containsShip) {
          field = current.containsShip.isSunk() ? '[X]' : '[*]';
        } else if (current.hasReceivedHit) {
          field = '[+]';
        } else {
          field = '[ ]';
        }

        return previous + field;
      }, '');

      console.log(index, line);
    });

    console.groupEnd();
  }

  receiveAttack(y, x) {
    const attackedSquare = this.grid[y][x];

    if (attackedSquare.hasReceivedHit) {
      return;
    }

    this.grid[y][x].hasReceivedHit = true;
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }

  receiveShip(ship, { y, x }) {
    if (ship.isVertical) {
      for (let i = y; i < y + ship.size; i += 1) {
        this.grid[i][x].containsShip = ship;
        ship.ownCoordinates.push({ y: i, x: x });
      }
    }

    if (!ship.isVertical) {
      const gridRow = this.grid[y];
      for (let i = x; i < x + ship.size; i += 1) {
        gridRow[i].containsShip = ship;
        ship.ownCoordinates.push({ y: y, x: i });
      }
    }

    this.ships.push(ship);
    if (DEBUG.RECEIVE_SHIP) this.printBoard();
  }

  placementIsValid(ship, { y, x }) {
    const gridRow = this.grid[y];
    const directionalPosition = ship.isVertical ? y : x; // To determine if outOfBounds needs to be checked horizontally or vertically
    const directionalMax = ship.isVertical ? this.grid.length : gridRow.length;
    const squaresToPlaceShip = ship.isVertical
      ? this.grid.slice(y, y + ship.size).map((boardRow) => boardRow[x])
      : gridRow.slice(x, x + ship.size);

    const surroundedByWater = true; // TODO
    const overlaps = squaresToPlaceShip.some((square) => square.containsShip); // TODO Remove after implementing surroundedByWater
    const outOfBounds = directionalPosition < 0 || directionalPosition + ship.size > directionalMax;

    return !overlaps && !outOfBounds && surroundedByWater;
  }
}

class boardSquare {
  constructor(containsShip = null, hasReceivedHit = false) {
    this.containsShip = containsShip;
    this.hasReceivedHit = hasReceivedHit;
  }
}
