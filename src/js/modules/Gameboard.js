export default class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 10 }, (e) => Array.from({ length: 10 }, (e) => new boardSquare()));
  }

  receiveHit(x, y) {
    this.grid[x][y].hasReceivedHit = true;
  }

  placeShip(ship, x, y) {
    // if (!placementIsValid(ship, startSquare)) {
    //   return;
    // }

    if (ship.isVertical) {
      for (let i = x; i < x + ship.length; i += 1) {
        this.grid[i][y].containsShip = ship;
      }
    } else {
      const gridRow = this.grid[x];
      for (let i = y; i < y + ship.length; i += 1) {
        gridRow[i].containsShip = ship;
      }
    }
  }
}

class boardSquare {
  constructor(containsShip = null, hasReceivedHit = false) {
    this.containsShip = containsShip;
    this.hasReceivedHit = hasReceivedHit;
  }
}
