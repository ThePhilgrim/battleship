import GameBoard from './Gameboard';
import { getRandomCoordinates } from '../utils/helpers';

class Player {
  constructor() {
    if (new.target === Player) {
      throw new Error('Player cannot be instantiated directly.');
    }

    this.gameboard = new GameBoard();
    this.attackedSquares = new Array();
  }

  attack() {
    throw new Error("The 'attack' method must be implemented in the subclass.");
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

  getRandomCoordinates(max) {
    return { x: Math.floor(Math.random() * max), y: Math.floor(Math.random() * max) };
  }
}

class Human extends Player {}

export { Human, AI };
