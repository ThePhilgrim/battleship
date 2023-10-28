export default class GameBoard {
  constructor() {
    this.grid = [...Array(10)].map((e) => Array(10).fill(new boardSquare()));
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
