import GameBoard from './Gameboard';
import { getRandomCoordinates } from '../utils/helpers';

class Player {
  constructor() {
    if (new.target === Player) {
      throw new Error('Player cannot be instantiated directly.');
    }

    this.gameboard = new GameBoard();
    this.ships = [
      new Ship('Carrier', 5),
      new Ship('Battleship', 4),
      new Ship('Cruiser', 3),
      new Ship('Submarine', 3),
      new Ship('Destroyer', 2),
    ];
    this.attackedSquares = new Array();
  }

  attack() {
    throw new Error("The 'attack' method must be implemented in the subclass.");
  }

  placeShip() {
    throw new Error("The 'placeShip' method must be implemented in the subclass.");
  }
}

class AI extends Player {
  attack() {
    let attackCoordinates = this.getRandomCoordinates(10);

    while (
      this.attackedSquares.some(
        (coordinate) => coordinate.x === attackCoordinates.x && coordinate.y === attackCoordinates.y
      )
    ) {
      attackCoordinates = this.getRandomCoordinates(10);
    }

    this.attackedSquares.push(attackCoordinates);
    return attackCoordinates;
  }

  placeShip(ship) {
    const isVertical = Math.random() < 0.5;
    const startingCoordinate = this.getRandomCoordinates();

    while (!this.gameboard.placementIsValid(ship, startingCoordinate)) {
      const startingCoordinate = this.getRandomCoordinates();
    }

    this.gameboard.receiveShip(ship, startingCoordinate);
  }

  getRandomCoordinates(max) {
    return { x: Math.floor(Math.random() * max), y: Math.floor(Math.random() * max) };
  }
}

class Human extends Player {
  attack(clickedCoordinates) {
    if (
      this.attackedSquares.some(
        (coordinate) => coordinate.x === clickedCoordinates.x && coordinate.y === clickedCoordinates.y
      )
    ) {
      return;
    }

    this.attackedSquares.push(clickedCoordinates);
    return clickedCoordinates;
  }

  placeShip(ship, clickedCoordinates) {
    if (!this.gameboard.placementIsValid(ship, clickedCoordinates)) {
      return;
    }

    this.gameboard.receiveShip(ship, clickedCoordinates);
  }
}

export { Human, AI };
