import Ship from '../factories/Ship';

let newShip = Ship('submarine', 3);

describe('Ship factory', () => {
  test('ship should have a name', () => {
    expect(newShip.name).toBe('submarine');
  });
  test('ship length should be at least 2', () => {
    expect(newShip.length).toBeGreaterThanOrEqual(2);
  });
  test('ship length should be at most 5', () => {
    expect(newShip.length).toBeLessThanOrEqual(5);
  });
  test('ship direction is not yet set', () => {
    expect(newShip.direction).toBeUndefined();
  });
  test('ship location is not yet set', () => {
    expect(newShip.location).toStrictEqual([]);
  });
  test('hit() makes accurate hit', () => {
    expect(newShip.hit(1)).toMatchObject([1]);
  });
  test('isSunk() returns true if sunk', () => {
    if (newShip.hits === [1, 2, 3]) {
      expect(newShip.isSunk()).toBeTruthy();
    }
  });
  test('isSunk() returns false if not sunk', () => {
    if (newShip.hits === [1, 2]) {
      expect(newShip.isSunk()).toBeFalsy();
    }
  });
});
