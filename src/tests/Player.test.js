import Player from '../factories/Player';
import Gameboard from '../factories/Gameboard';

describe('Player', () => {
  let human = Player('human');
  let computer = Player('computer');
  let humanBoard = Gameboard();
  let compBoard = Gameboard();
  test('creates new player', () => {
    expect(human.type).toBe('human');
    expect(computer.type).toBe('computer');
  });
  test('human player attacks enemy computer gameboard', () => {
    compBoard.createFleet();
    compBoard.placeShip();
    compBoard.fleet[0].location = [25, 26];
    human.attack(compBoard, 25);
    expect(compBoard.fleet[0].hits).toContain(25);
    human.attack(compBoard, 26);
    expect(compBoard.fleet[0].hits).toContain(26);
    expect(compBoard.fleet[0].isSunk).toBeTruthy();
  });
  test('computer player attacks enemy human gameboard', () => {
    humanBoard.createFleet();
    humanBoard.placeShip();
    computer.computerAttack(humanBoard);
    for (let ship of humanBoard.fleet) {
      if (ship.hits >= 1) {
        expect(ship.hits).toHaveLength(1);
      }
    }
    expect(computer.attacks).toHaveLength(1);
  });
});
