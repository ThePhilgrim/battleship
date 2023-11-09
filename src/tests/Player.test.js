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

    while (shipsToPlace.length > 0) {
      let ship = shipsToPlace.shift();
      aiPlayer.placeShip(ship);
    }

    expect(aiPlayer.gameboard.ships.length).toBe(5);
  });
});
