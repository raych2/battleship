import Ship from '../factories/Ship';

let newShip = Ship(3);

describe('Ship factory', () => {
  test('hits array should be equal to ship length', () => {
    expect(newShip.hits.length).toBe(3);
  });
  test('hits array should be at least 2', () => {
    expect(newShip.hits.length).toBeGreaterThanOrEqual(2);
  });
  test('hits array should be at most 5', () => {
    expect(newShip.hits.length).toBeLessThanOrEqual(5);
  });
  test('hit() makes accurate hit', () => {
    expect(newShip.hit(1)).toMatchObject(['', 'X', '']);
  });
  test('isSunk() returns true if sunk', () => {
    if (Ship.hits === ['X', 'X', 'X']) {
      expect(isSunk()).toBeTruthy();
    }
  });
  test('isSunk() returns false if not sunk', () => {
    if (Ship.hits === ['', '', '', '', '', '']) {
      expect(isSunk()).toBeFalsy();
    }
  });
});
