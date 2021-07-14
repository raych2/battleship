import Gameboard from '../factories/Gameboard';

describe('renderBoard', () => {
  test('returns board array', () => {
    let newBoard = Gameboard();
    newBoard.renderBoard();
    expect(newBoard.board).toHaveLength(100);
  });
});
describe('createFleet', () => {
  test('returns array of ships created from shipType', () => {
    let newBoard = Gameboard();
    newBoard.createFleet();
    expect(newBoard.fleet).toHaveLength(5);
  });
});
describe('getRandomCoordinate', () => {
  test('returns random coordinate', () => {
    let newBoard = Gameboard();
    expect(newBoard.getRandomCoordinate(0, 99)).toBeGreaterThanOrEqual(0);
    expect(newBoard.getRandomCoordinate(0, 99)).toBeLessThanOrEqual(99);
  });
});
describe('checkForHorizontalRestrictions', () => {
  let newBoard = Gameboard();
  test('changes initialPosition if the length is 2 and initialPosition is number in last grid column', () => {
    expect(
      newBoard.checkForHorizontalRestrictions(2, 98)
    ).toBeGreaterThanOrEqual(0);
    expect(newBoard.checkForHorizontalRestrictions(2, 98)).toBeLessThanOrEqual(
      98
    );
  });
  test('changes initialPosition if the length is greater or equal to 3 and less than or equal to 5 and initialPosition is number in last grid column', () => {
    expect(
      newBoard.checkForHorizontalRestrictions(4, 98)
    ).toBeGreaterThanOrEqual(0);
    expect(newBoard.checkForHorizontalRestrictions(4, 98)).toBeLessThanOrEqual(
      94
    );
  });
});
describe('checkForVerticalRestrictions', () => {
  let newBoard = Gameboard();
  test('changes initialPosition if the length is 5 and initialPosition is greater than 60', () => {
    expect(newBoard.checkForVerticalRestrictions(5, 98)).toBeGreaterThanOrEqual(
      0
    );
    expect(newBoard.checkForVerticalRestrictions(5, 98)).toBeLessThanOrEqual(
      59
    );
  });
  test('changes initialPosition if the length is 4 and initialPosition is greater than 70', () => {
    expect(newBoard.checkForVerticalRestrictions(4, 98)).toBeGreaterThanOrEqual(
      0
    );
    expect(newBoard.checkForVerticalRestrictions(4, 98)).toBeLessThanOrEqual(
      69
    );
  });
  test('changes initialPosition if the length is 3 and initialPosition is greater than 80', () => {
    expect(newBoard.checkForVerticalRestrictions(3, 98)).toBeGreaterThanOrEqual(
      0
    );
    expect(newBoard.checkForVerticalRestrictions(3, 98)).toBeLessThanOrEqual(
      79
    );
  });
  test('changes initialPosition if the length is 2 and initialPosition is greater than 90', () => {
    expect(newBoard.checkForVerticalRestrictions(2, 98)).toBeGreaterThanOrEqual(
      0
    );
    expect(newBoard.checkForVerticalRestrictions(2, 98)).toBeLessThanOrEqual(
      89
    );
  });
});
describe('assignShipLocation', () => {
  let newBoard = Gameboard();
  newBoard.createFleet();
  test('returns array containing direction and location', () => {
    expect(newBoard.assignShipLocation(5)).toHaveLength(2);
  });
});
describe('checkForOverlap', () => {
  let newBoard = Gameboard();
  newBoard.createFleet();
  test('returns true if both arrays have a duplicate', () => {
    let arr = [
      { location: [1, 2] },
      { location: [3, 4, 5] },
      { location: [6, 7, 8] },
    ];
    let fourthShip = [3, 4, 5, 6];
    expect(newBoard.checkForOverlap(arr, fourthShip)).toBeTruthy();
  });
  test('returns false if both arrays do not have a duplicate', () => {
    let arr = [
      { location: [1, 2] },
      { location: [3, 4, 5] },
      { location: [6, 7, 8] },
    ];
    let thirdShip = [58, 69, 79];
    expect(newBoard.checkForOverlap(arr, thirdShip)).toBeFalsy();
  });
});
describe('placeShip', () => {
  let newBoard = Gameboard();
  newBoard.createFleet();
  newBoard.placeShip();
  let fifthShip = newBoard.fleet[4];
  test('ship direction and location are now defined', () => {
    expect(fifthShip.direction).not.toBeNull();
    expect(fifthShip.location).toHaveLength(5);
  });
});
describe('receiveAttack', () => {
  let newBoard = Gameboard();
  newBoard.createFleet();
  newBoard.placeShip();
  let secondShip = newBoard.fleet[1];
  secondShip.location = [5, 6, 7];
  test('sends the ‘hit’ function to the correct ship', () => {
    newBoard.receiveAttack(6);
    expect(secondShip.hits).toContain(6);
    newBoard.receiveAttack(5);
    expect(secondShip.hits).toContain(5);
    newBoard.receiveAttack(7);
    expect(secondShip.hits).toContain(7);
  });
  test('ship is sunk if all locations are hit', () => {
    expect(secondShip.isSunk).toBeTruthy();
    expect(newBoard.sunkenShips).toHaveLength(1);
  });
  test('missedAttacks collect all the missed hits', () => {
    newBoard.receiveAttack(99);
    expect(newBoard.missedAttacks).toContain(99);
  });
});
describe('checkAllSunk', () => {
  let newBoard = Gameboard();
  newBoard.createFleet();
  newBoard.placeShip();
  let sunkenTest = newBoard.sunkenShips;
  test('returns true when all ships have been sunk', () => {
    sunkenTest.length = 5;
    expect(sunkenTest).toHaveLength(5);
    expect(newBoard.checkAllSunk()).toBeTruthy();
  });
  test('returns false when not all ships have been sunk', () => {
    sunkenTest.length = 2;
    expect(newBoard.sunkenShips).toHaveLength(2);
    expect(newBoard.checkAllSunk()).toBeFalsy();
  });
});
