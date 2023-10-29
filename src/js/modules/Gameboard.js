export default class GameBoard {
  constructor() {
    this.grid = Array.from({ length: 10 }, (e) => Array.from({ length: 10 }, (e) => new boardSquare()));
  }

  receiveHit(x, y) {
    this.grid[x][y].hasReceivedHit = true;
  }
}

class boardSquare {
  constructor(containsShip = null, hasReceivedHit = false) {
    this.containsShip = containsShip;
    this.hasReceivedHit = hasReceivedHit;
  }
}
