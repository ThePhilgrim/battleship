import { Human, AI } from './Player.js';
import GameBoard from './Gameboard.js';
import UserInterface from './UI.js';

export default class Battleships {
  constructor(
    player1 = new AI(new GameBoard()),
    player2 = new AI(new GameBoard()),
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

  async startNewGame() {
    const playersInitialized = [this.player1.placeShips(), this.player2.placeShips()];

    await Promise.all(playersInitialized);
    let roundNo = 1;

    const resultClassNames = {
      MISS: ['attacked'],
      HIT: ['attacked'],
      SUNK: ['attacked', 'sunk'],
    };

    while (!(this.player1.gameboard.allShipsSunk() || this.player2.gameboard.allShipsSunk())) {
      console.log('Round No: ', roundNo);
      const player1Coordinates = await this.player1.getCoordinates(this.player1.gameboard);
      this.player1.rememberAttack(player1Coordinates);
      const attackResult1 = this.player2.receiveAttack(player1Coordinates);
      console.log('ATTACK RESULTS: ', attackResult1);

      const coordinatesToUpdate1 = this.getCoordinatesArray(attackResult1, this.player2, player1Coordinates);

      this.updateSquares(
        this.userInterface.player1Tables,
        this.userInterface.player2Tables,
        coordinatesToUpdate1,
        resultClassNames[attackResult1]
      );

      if (this.player2.gameboard.allShipsSunk()) {
        console.log('PLAYER 1 WINS');
        break;
      }

      console.log('player2');
      const player2Coordinates = await this.player2.getCoordinates(this.player2.gameboard);
      this.player2.rememberAttack(player2Coordinates);
      const attackResult2 = this.player1.receiveAttack(player2Coordinates);

      const coordinatesToUpdate2 = this.getCoordinatesArray(attackResult2, this.player1, player2Coordinates);

      this.updateSquares(
        this.userInterface.player2Tables,
        this.userInterface.player1Tables,
        coordinatesToUpdate2,
        resultClassNames[attackResult2]
      );

      if (this.player2.gameboard.allShipsSunk()) {
        console.log('PLAYER 2 WINS');
        break;
      }

      roundNo += 1;
      await delay();
    }

    // Print winner
  }
}

function delay() {
  return new Promise((done) => {
    setTimeout(done, 50);
  });
}
