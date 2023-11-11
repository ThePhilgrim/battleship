import { Human, AI } from './Player';
import Ship from './Ship';
import GameBoard from './Gameboard';
import UserInterface from './UI';

export default class Battleships {
  constructor(
    player1 = new AI(new GameBoard()),
    player2 = new AI(new GameBoard()),
    userInterface = new UserInterface()
  ) {
    console.log('bs');
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

  async startNewGame() {
    const playersInitialized = [this.player1.placeShips(), this.player2.placeShips()];

    await Promise.all(playersInitialized);
    let roundNo = 1;
    while (!(this.player1.gameboard.allShipsSunk() || this.player2.gameboard.allShipsSunk())) {
      console.log('Round No: ', roundNo);
      const player1Coordinates = await this.player1.getCoordinates(this.player1.gameboard);
      this.player1.rememberAttack(player1Coordinates);
      this.player2.receiveAttack(player1Coordinates);

      if (this.player2.gameboard.allShipsSunk()) {
        console.log('PLAYER 1 WINS');
        break;
      }

      console.log('player2');
      const player2Coordinates = await this.player2.getCoordinates(this.player2.gameboard);
      this.player2.rememberAttack(player2Coordinates);
      this.player1.receiveAttack(player2Coordinates);

      this.printGameState(roundNo);

      if (this.player2.gameboard.allShipsSunk()) {
        console.log('PLAYER 2 WINS');
        break;
      }

      roundNo += 1;
      // await delay();
    }
  }
}

function delay() {
  return new Promise((done) => {
    setTimeout(done, 50);
  });
}

// GameMaster needs
// - Player 1 (Always human)
// - Player 2 (Default AI)

// Player needs
// - Gameboard
// - List of Ships
