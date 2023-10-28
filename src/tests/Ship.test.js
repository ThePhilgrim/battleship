import Ship from '../js/modules/Ship';

let carrier;

beforeEach(() => {
  carrier = new Ship('Destroyer', 5);
});

test('Calls Ship method hit() to increase noOfHits', () => {
  expect(carrier.noOfHits).toBe(0);
  carrier.hit();
  expect(carrier.noOfHits).toBe(1);
});

test('Sets Ship isSunk to true after enough hits', () => {
  expect(carrier.isSunk()).toBeFalsy();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  carrier.hit();
  expect(carrier.isSunk()).toBeTruthy();

  const submarine = new Ship('Submarine', 3);
  expect(submarine.isSunk()).toBeFalsy();

  submarine.hit();
  submarine.hit();
  submarine.hit();
  expect(submarine.isSunk()).toBeTruthy();
});
