import Ship from './Ship';

class Player {
  constructor(gameboard) {
    if (new.target === Player) {
      throw new Error('Player cannot be instantiated directly.');
    }

    this.gameboard = gameboard;
    this.ships = [
      new Ship('Carrier', 5),
      new Ship('Battleship', 4),
      new Ship('Battleship', 4),
      new Ship('Cruiser', 3),
      new Ship('Cruiser', 3),
      new Ship('Cruiser', 3),
      new Ship('Submarine', 3),
      new Ship('Submarine', 3),
      new Ship('Submarine', 3),
      new Ship('Submarine', 3),
      new Ship('Destroyer', 2),
      new Ship('Destroyer', 2),
      new Ship('Destroyer', 2),
      new Ship('Destroyer', 2),
      new Ship('Destroyer', 2),
    ];

    this.attackedSquares = new Array();
  }

  rememberAttack() {
    throw new Error("The 'rememberAttack' method must be implemented in the subclass.");
  }
  }

  placeShip() {
    throw new Error("The 'placeShip' method must be implemented in the subclass.");
  }

  getCoordinates() {
    throw new Error("The 'getCoordinates' method must be implemented in the subclass.");
  }
}

class AI extends Player {

  rememberAttack(attackedCoordinates) {
    this.attackedSquares.push(attackedCoordinates);
  }
  }

  placeShip(ship) {
    ship.isVertical = Math.random() < 0.5;
    let startingCoordinate = this.getCoordinates(this.gameboard);

    while (!this.gameboard.placementIsValid(ship, startingCoordinate)) {
      startingCoordinate = this.getCoordinates(this.gameboard);
    }

    this.gameboard.receiveShip(ship, startingCoordinate);
  }

  getCoordinates(gameboard) {
    let x;
    let y;
    do {
      x = Math.floor(Math.random() * gameboard.grid.length);
      y = Math.floor(Math.random() * gameboard.grid.length);
    } while (this.attackedSquares.some((square) => x === square.x && y === square.y));

    return { y, x };
  }
}

class Human extends Player {
  coordinatesReceivedCallback = null;

  rememberAttack(attackedCoordinates) {
    this.attackedSquares.push(attackedCoordinates);
  }

  placeShip(ship, clickedCoordinates) {
    if (!this.gameboard.placementIsValid(ship, clickedCoordinates)) {
      return;
    }

    this.gameboard.receiveShip(ship, clickedCoordinates);
  }

  getCoordinates() {
    return new Promise((done) => {
      // Get coordinates
      coordinatesReceivedCallback = done;
    });
  }
}

export { Human, AI };
