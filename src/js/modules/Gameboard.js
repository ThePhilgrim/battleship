export default class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 10 }, (e) => Array.from({ length: 10 }, (e) => new boardSquare()));
    this.ships = new Array();
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
      for (let i = y; i < y + ship.length; i += 1) {
        this.grid[i][x].containsShip = ship;
      }
    }

    if (!ship.isVertical) {
      const gridRow = this.grid[y];
      for (let i = x; i < x + ship.length; i += 1) {
        gridRow[i].containsShip = ship;
      }
    }

    this.ships.push(ship);
  }

  placementIsValid(ship, { y, x }) {
    const gridRow = this.grid[y];
    const directionalPosition = ship.isVertical ? y : x;
    const directionalMax = ship.isVertical ? this.grid.length : gridRow.length;
    const squaresToPlaceShip = ship.isVertical
      ? this.grid.slice(y, y + ship.length).map((boardRow) => boardRow[x])
      : gridRow.slice(x, x + ship.length);

    const overlaps = squaresToPlaceShip.some((square) => square.containsShip);
    const outOfBounds = directionalPosition < 0 || directionalPosition + ship.length > directionalMax;

    return !overlaps && !outOfBounds;
  }
}

class boardSquare {
  constructor(containsShip = null, hasReceivedHit = false) {
    this.containsShip = containsShip;
    this.hasReceivedHit = hasReceivedHit;
  }
}
