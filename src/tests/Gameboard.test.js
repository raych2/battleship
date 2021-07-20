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
describe('grid', () => {
  let newBoard = Gameboard();
  test('returns battleship grid array of 100 numbers', () => {
    expect(newBoard.grid).toHaveLength(100);
  });
});
describe('splitGrid', () => {
  let newBoard = Gameboard();
  test('splits battleship grid array into sections', () => {
    expect(newBoard.splitGrid(5)).toHaveLength(20);
  });
});
describe('getAllLeftHalfNums', () => {
  let newBoard = Gameboard();
  test('returns all numbers of the left half of the battleship grid', () => {
    newBoard.splitGrid(5);
    newBoard.getAllLeftHalfNums();
    expect(newBoard.leftHalf).toHaveLength(50);
  });
});
describe('getAllRightHalfNums', () => {
  let newBoard = Gameboard();
  test('returns all numbers of the right half of the battleship grid', () => {
    newBoard.splitGrid(5);
    newBoard.getAllRightHalfNums();
    expect(newBoard.rightHalf).toHaveLength(50);
  });
});
describe('shuffleLeftHalf', () => {
  let newBoard = Gameboard();
  test('returns a number from the leftHalf array', () => {
    newBoard.splitGrid(5);
    newBoard.getAllLeftHalfNums();
    let num = newBoard.shuffleLeftHalf();
    expect(newBoard.leftHalf.includes(num)).toBeTruthy();
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
  test('returns true if location value is greater than 99', () => {
    let arr = [
      { location: [1, 2] },
      { location: [3, 4, 5] },
      { location: [6, 7, 8] },
    ];
    let fourthShip = [79, 89, 99, 109];
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
  test('returns falsy if hit is missed', () => {
    expect(newBoard.receiveAttack(99)).toBeFalsy();
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
