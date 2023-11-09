import { AI, Human } from '../js/modules/Player';
import { jest } from '@jest/globals';

let humanPlayer;
let aiPlayer;

describe('Testing the AI player', () => {
  beforeAll(() => {
    aiPlayer = new AI();
  });

  test('Make sure duplicate coordinates are not added to this.attackedSquares', () => {
    jest
      .spyOn(aiPlayer, 'getRandomCoordinates')
      .mockReturnValueOnce({ x: 3, y: 6 })
      .mockReturnValueOnce({ x: 3, y: 6 })
      .mockReturnValueOnce({ x: 1, y: 8 });

    expect(aiPlayer.attackedSquares).toHaveLength(0);
    aiPlayer.attack();
    expect(aiPlayer.attackedSquares).toHaveLength(1);
    aiPlayer.attack();
    expect(aiPlayer.attackedSquares).toHaveLength(2);
    expect(aiPlayer.getRandomCoordinates).toHaveBeenCalledTimes(3);
  });

  test('Place ships', () => {
    const shipsToPlace = [...aiPlayer.ships];
    let shipsPlaced = 0;

    while (shipsToPlace.length > 0) {
      let ship = shipsToPlace.shift();
      aiPlayer.placeShip(ship);
      shipsPlaced += 1;
      expect(aiPlayer.gameboard.ships.length).toBe(shipsPlaced);
    }

    expect(aiPlayer.gameboard.ships.length).toBe(5);
  });
});

describe('Testing the Human player', () => {
  beforeAll(() => {
    humanPlayer = new Human();
  });

  test('Place ship', () => {
    const shipsToPlace = [...humanPlayer.ships];
    expect(humanPlayer.gameboard.ships.length).toBe(0);

    humanPlayer.placeShip(shipsToPlace.shift(), { y: 0, x: 0 });
    expect(humanPlayer.gameboard.ships.length).toBe(1);

    humanPlayer.placeShip(shipsToPlace.shift(), { y: 0, x: 0 });
    expect(humanPlayer.gameboard.ships.length).toBe(1);

    humanPlayer.placeShip(shipsToPlace.shift(), { y: 4, x: 2 });
    expect(humanPlayer.gameboard.ships.length).toBe(2);

    humanPlayer.placeShip(shipsToPlace.shift(), { y: 4, x: 0 });
    expect(humanPlayer.gameboard.ships.length).toBe(2);
  });
});
