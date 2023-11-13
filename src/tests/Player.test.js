import { AI, Human } from '../js/modules/Player.js';
import Gameboard from '../js/modules/Gameboard.js';
// import { jest } from '@jest/globals';

let aiPlayer;

describe('Testing the AI player', () => {
  beforeEach(() => {
    aiPlayer = new AI(new Gameboard());
  });

  test('Test placeShips() to ensure all ships are placed.', () => {
    expect(aiPlayer.gameboard.ships.length).toBe(0);
    aiPlayer.placeShips();
    expect(aiPlayer.gameboard.ships.length).toBe(aiPlayer.ships.length);
  });

  test('Ensure getCoordinates() base case', () => {
    const coordinates = aiPlayer.getCoordinates(new Gameboard());
    expect(coordinates).toHaveProperty('x');
    expect(coordinates).toHaveProperty('y');
  });

  test('Ensure getCoordinates() does not return coordinates already in Player.attackedSquares', () => {
    // Missing { y: 9, x: 9 }
    aiPlayer.attackedSquares = [
      { y: 0, x: 0 },
      { y: 0, x: 1 },
      { y: 0, x: 2 },
      { y: 0, x: 3 },
      { y: 0, x: 4 },
      { y: 0, x: 5 },
      { y: 0, x: 6 },
      { y: 0, x: 7 },
      { y: 0, x: 8 },
      { y: 0, x: 9 },
      { y: 1, x: 0 },
      { y: 1, x: 1 },
      { y: 1, x: 2 },
      { y: 1, x: 3 },
      { y: 1, x: 4 },
      { y: 1, x: 5 },
      { y: 1, x: 6 },
      { y: 1, x: 7 },
      { y: 1, x: 8 },
      { y: 1, x: 9 },
      { y: 2, x: 0 },
      { y: 2, x: 1 },
      { y: 2, x: 2 },
      { y: 2, x: 3 },
      { y: 2, x: 4 },
      { y: 2, x: 5 },
      { y: 2, x: 6 },
      { y: 2, x: 7 },
      { y: 2, x: 8 },
      { y: 2, x: 9 },
      { y: 3, x: 0 },
      { y: 3, x: 1 },
      { y: 3, x: 2 },
      { y: 3, x: 3 },
      { y: 3, x: 4 },
      { y: 3, x: 5 },
      { y: 3, x: 6 },
      { y: 3, x: 7 },
      { y: 3, x: 8 },
      { y: 3, x: 9 },
      { y: 4, x: 0 },
      { y: 4, x: 1 },
      { y: 4, x: 2 },
      { y: 4, x: 3 },
      { y: 4, x: 4 },
      { y: 4, x: 5 },
      { y: 4, x: 6 },
      { y: 4, x: 7 },
      { y: 4, x: 8 },
      { y: 4, x: 9 },
      { y: 5, x: 0 },
      { y: 5, x: 1 },
      { y: 5, x: 2 },
      { y: 5, x: 3 },
      { y: 5, x: 4 },
      { y: 5, x: 5 },
      { y: 5, x: 6 },
      { y: 5, x: 7 },
      { y: 5, x: 8 },
      { y: 5, x: 9 },
      { y: 6, x: 0 },
      { y: 6, x: 1 },
      { y: 6, x: 2 },
      { y: 6, x: 3 },
      { y: 6, x: 4 },
      { y: 6, x: 5 },
      { y: 6, x: 6 },
      { y: 6, x: 7 },
      { y: 6, x: 8 },
      { y: 6, x: 9 },
      { y: 7, x: 0 },
      { y: 7, x: 1 },
      { y: 7, x: 2 },
      { y: 7, x: 3 },
      { y: 7, x: 4 },
      { y: 7, x: 5 },
      { y: 7, x: 6 },
      { y: 7, x: 7 },
      { y: 7, x: 8 },
      { y: 7, x: 9 },
      { y: 8, x: 0 },
      { y: 8, x: 1 },
      { y: 8, x: 2 },
      { y: 8, x: 3 },
      { y: 8, x: 4 },
      { y: 8, x: 5 },
      { y: 8, x: 6 },
      { y: 8, x: 7 },
      { y: 8, x: 8 },
      { y: 8, x: 9 },
      { y: 9, x: 0 },
      { y: 9, x: 1 },
      { y: 9, x: 2 },
      { y: 9, x: 3 },
      { y: 9, x: 4 },
      { y: 9, x: 5 },
      { y: 9, x: 6 },
      { y: 9, x: 7 },
      { y: 9, x: 8 },
    ];

    const firstCoordinate = aiPlayer.getCoordinates(new Gameboard());
    expect(firstCoordinate).toMatchObject({ y: 9, x: 9 });
    aiPlayer.attackedSquares.push({ y: 9, x: 9 });

    console.log(aiPlayer.attackedSquares.shift());
    const secondCoordinate = aiPlayer.getCoordinates(new Gameboard());
    expect(secondCoordinate).toMatchObject({ y: 0, x: 0 });
  });

  test('Ensure rememberAttack() base case', () => {
    aiPlayer.rememberAttack({ y: 5, x: 3 });
    expect(aiPlayer.attackedSquares).toHaveLength(1);
    expect(aiPlayer.attackedSquares[0]).toMatchObject({ y: 5, x: 3 });
  });
});

describe('Testing the Human player', () => {});
