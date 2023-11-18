import Ship from './Ship.js';

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

  placeShips() {
    throw new Error("The 'startPlacingShips' method must be implemented in the subclass.");
  }

  rememberAttack() {
    throw new Error("The 'rememberAttack' method must be implemented in the subclass.");
  }

  receiveAttack({ y, x }) {
    throw new Error("The 'receiveAttack' method must be implemented in the subclass.");
  }

  placeShip() {
    throw new Error("The 'placeShip' method must be implemented in the subclass.");
  }

  getCoordinates() {
    throw new Error("The 'getCoordinates' method must be implemented in the subclass.");
  }
}

class AI extends Player {
  placeShips() {
    const allShipsPlaced = this.ships.map((ship) => {
      return this.placeShip(ship);
    });

    return Promise.all(allShipsPlaced);
  }

  rememberAttack(attackedCoordinates) {
    this.attackedSquares.push(attackedCoordinates);
  }

  // TODO: Would fit better in the gameboard class
  receiveAttack({ y, x }) {
    const square = this.gameboard.grid[y][x];
    square.hasReceivedHit = true;

    if (square.containsShip) {
      square.containsShip.hit();
      return square.containsShip.isSunk() ? 'SUNK' : 'HIT';
    }

    return 'MISS';
  }

  async placeShip(ship) {
    let promiseAndResolver;
    let startingCoordinate;
    do {
      ship.isVertical = Math.random() < 0.5;
      promiseAndResolver = this.getCoordinates(/* aiDelay */ false);
      startingCoordinate = await promiseAndResolver.coordinatesPromise;
    } while (!this.gameboard.placementIsValid(ship, startingCoordinate));

    this.gameboard.receiveShip(ship, startingCoordinate);
  }

  getCoordinates(aiDelay = true) {
    const coordinatesResolver = null;

    const coordinatesPromise = new Promise((resolve) => {
      let x;
      let y;
      let orientation;
      do {
        // Orientation here?
        x = Math.floor(Math.random() * this.gameboard.grid.length);
        y = Math.floor(Math.random() * this.gameboard.grid.length);
      } while (this.attackedSquares.some((square) => x === square.x && y === square.y));

      const delay = aiDelay ? 0 * (1000 + Math.random() * 2000) : 0;

      setTimeout(() => {
        resolve({ y, x });
      }, delay);
    });
    return { coordinatesPromise, coordinatesResolver };
  }
}

class Human extends Player {
  placeShips() {
    const allShipsPlaced = this.ships.map((ship) => {
      return this.placeShip(ship);
    });

    return Promise.all(allShipsPlaced);
  }

  rememberAttack(attackedCoordinates) {
    this.attackedSquares.push(attackedCoordinates);
  }

  receiveAttack() {}

  async placeShip(ship) {
    console.log('placeShip');
    // TODO: Not sure why this needs to be async (webpack wont compile without it)
    return new Promise(async (resolve, reject) => {
      ship.hasBeenPlaced = async (adjustedCoordinates) => {
        console.log('ship.hasBeenPlaced');
        if (!this.gameboard.placementIsValid(ship, adjustedCoordinates)) {
          reject();
        }
        this.gameboard.receiveShip(ship, adjustedCoordinates);

        resolve();
      };
    });
  }

  getCoordinates() {
    let coordinatesResolver;
    const coordinatesPromise = new Promise((resolve) => {
      coordinatesResolver = resolve;
    });
    return { coordinatesPromise, coordinatesResolver };
  }
}

export { Human, AI };
