import { Human, AI } from './Player.js';
import GameBoard from './Gameboard.js';
import UserInterface from './UI.js';

export default class Battleships {
  constructor(
    player1 = new Human(new GameBoard()),
    player2 = new Human(new GameBoard()),
    userInterface = new UserInterface()
  ) {
    this.player1 = player1;
    this.player2 = player2;
    this.userInterface = userInterface;
    this.startNewGame();
  }

  printGameState(roundNo) {
    console.group(`Round: ${roundNo}`);
    console.log('Player 1');
    this.player1.gameboard.printBoard();
    console.log('Player 2');
    this.player2.gameboard.printBoard();
    console.groupEnd();
  }

  updateSquares(attackingPlayerTables, receivingPlayerTables, coordinatesToUpdate, classNames) {
    coordinatesToUpdate.forEach((coordinates) => {
      this.userInterface.updateSquare(attackingPlayerTables.opponentTable, coordinates, classNames);

      this.userInterface.updateSquare(receivingPlayerTables.playerTable, coordinates, classNames);
    });
  }

  getCoordinatesArray(attackResult, receivingPlayer, coordinates) {
    // Coordinates is an array when a ship is sunk
    if (attackResult === 'SUNK') {
      const { y, x } = coordinates;
      return receivingPlayer.gameboard.grid[y][x].containsShip.ownCoordinates;
    } else {
      return [coordinates];
    }
  }

  async takeTurn(attackingPlayer, receivingPlayer) {
    const promiseAndResolver = attackingPlayer.getCoordinates();
    this.userInterface.coordinatesResolver = promiseAndResolver.coordinatesResolver;
    const coordinates = await promiseAndResolver.coordinatesPromise;
    attackingPlayer.rememberAttack(coordinates);
    const attackResult = receivingPlayer.receiveAttack(coordinates);
    const coordinatesToUpdate = this.getCoordinatesArray(attackResult, receivingPlayer, coordinates);
    return { attackResult, coordinatesToUpdate };
  }

  async startNewGame() {
    this.userInterface.putShipsInYard(this.player1, this.userInterface.player1Board); // SMELLY
    this.userInterface.putShipsInYard(this.player2, this.userInterface.player2Board); // EUWW
    const playersInitialized = [this.player1.placeShips(), this.player2.placeShips()];
    await Promise.all(playersInitialized);
    let roundNo = 1;

    const resultClassNames = {
      MISS: ['attacked'],
      HIT: ['attacked'],
      SUNK: ['attacked', 'sunk'],
    };

    while (!(this.player1.gameboard.allShipsSunk() || this.player2.gameboard.allShipsSunk())) {
      const turnResult1 = await this.takeTurn(this.player1, this.player2);

      this.updateSquares(
        this.userInterface.player1Board,
        this.userInterface.player2Board,
        turnResult1.coordinatesToUpdate,
        resultClassNames[turnResult1.attackResult]
      );

      if (this.player2.gameboard.allShipsSunk()) {
        console.log('PLAYER 1 WINS');
        break;
      }

      const turnResult2 = await this.takeTurn(this.player2, this.player1);

      this.updateSquares(
        this.userInterface.player2Board,
        this.userInterface.player1Board,
        turnResult2.coordinatesToUpdate,
        resultClassNames[turnResult2.attackResult]
      );

      if (this.player1.gameboard.allShipsSunk()) {
        console.log('PLAYER 2 WINS');
        break;
      }

      roundNo += 1;
      // await delay();
    }

    // Print winner
  }
}

function delay() {
  return new Promise((done) => {
    setTimeout(done, 50);
  });
}
