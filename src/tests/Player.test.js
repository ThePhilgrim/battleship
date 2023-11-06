import { AI, Human } from '../js/modules/Player';
import { jest } from '@jest/globals';

let humanPlayer;
let aiPlayer;

describe('Testing the AI player', () => {
  describe('Tests where the returned attack coordinates are fixed', () => {
    let aiPlayer;

    beforeAll(() => {
      aiPlayer = new AI();
      jest
        .spyOn(aiPlayer, 'getRandomCoordinates')
        .mockReturnValueOnce({ x: 3, y: 6 })
        .mockReturnValueOnce({ x: 3, y: 6 })
        .mockReturnValueOnce({ x: 1, y: 8 });
    });

    test('Make sure duplicate coordinates are not added to this.attackedSquares', () => {
      expect(aiPlayer.attackedSquares).toHaveLength(0);
      aiPlayer.attack();
      expect(aiPlayer.attackedSquares).toHaveLength(1);
      aiPlayer.attack();
      expect(aiPlayer.attackedSquares).toHaveLength(2);
      expect(aiPlayer.getRandomCoordinates).toHaveBeenCalledTimes(3);
    });
  });
});
