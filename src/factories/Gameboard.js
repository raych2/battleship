import Ship from '../factories/Ship';
import getRandomCoordinate from '../helpers/getRandomCoordinate';

const Gameboard = () => {
  let board = Array(100).fill('');
  let shipType = [
    { name: 'patrolBoat', length: 2 },
    { name: 'submarine', length: 3 },
    { name: 'destroyer', length: 3 },
    { name: 'battleship', length: 4 },
    { name: 'carrier', length: 5 },
  ];
  let fleet = [];
  let sunkenShips = [];
  let missedAttacks = [];

  const renderBoard = () => {
    return board;
  };
  const createFleet = () => {
    shipType.forEach((ship) => {
      let newShip = Ship(ship.length);
      fleet.push(newShip);
    });
    return fleet;
  };
  //split grid into coordinate groups to help with validation
  let grid = Array.from({ length: 100 }, (v, i) => i);
  let gridSections = [];
  let rightHalf = [];
  let leftHalf = [];
  const splitGrid = (size) => {
    for (let i = 0; i < grid.length; i += size) {
      gridSections.push(grid.slice(i, i + size));
    }
    gridSections = gridSections.slice(0, 20);
    return gridSections;
  };
  splitGrid(5);

  const getAllLeftHalfNums = () => {
    for (let i = 0; i < gridSections.length; i += 2) {
      if (leftHalf.length < 10) {
        leftHalf.push(gridSections[i]);
      }
    }
    leftHalf = leftHalf.flat();
    return leftHalf;
  };
  const getAllRightHalfNums = () => {
    for (let i = 1; i < gridSections.length; i += 2) {
      if (rightHalf.length < 10) {
        rightHalf.push(gridSections[i]);
      }
    }
    rightHalf = rightHalf.flat();
    return rightHalf;
  };
  getAllLeftHalfNums();
  getAllRightHalfNums();

  const shuffleLeftHalf = () => {
    let num;
    for (let i = leftHalf.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = leftHalf[i];
      leftHalf[i] = leftHalf[j];
      leftHalf[j] = temp;
      num = leftHalf[j];
    }
    return num;
  };

  //prevent vertical ships from going off board
  const checkForVerticalRestrictions = (length, num) => {
    if (length === 5 && num >= 60) {
      num = getRandomCoordinate(0, 59);
    } else if (length === 4 && num >= 70) {
      num = getRandomCoordinate(0, 69);
    } else if (length === 3 && num >= 80) {
      num = getRandomCoordinate(0, 79);
    } else if (length === 2 && num >= 90) {
      num = getRandomCoordinate(0, 89);
    }
    return num;
  };
  const assignShipLocation = (length) => {
    const directions = ['horizontal', 'vertical'];
    let direction = directions[getRandomCoordinate(0, 1)];
    let initialPosition;
    let shipLocation = [];
    if (direction === 'horizontal') {
      //prevent horizontal ships from going off board
      initialPosition = shuffleLeftHalf();
    } else {
      initialPosition = getRandomCoordinate(0, 89);
      checkForVerticalRestrictions(length, initialPosition);
    }
    for (let i = 0; i < length; i++) {
      if (direction === 'horizontal') {
        shipLocation.push(initialPosition++);
      } else {
        shipLocation.push((initialPosition += 10));
      }
    }
    return [direction, shipLocation];
  };
  const checkForOverlap = (arr, location) => {
    for (let i = 0; i < arr.length; i++) {
      let ship = arr[i];
      for (let j = 0; j < location.length; j++) {
        if (ship.location.indexOf(location[j]) >= 0 || location[j] > 99) {
          return true;
        }
      }
    }
    return false;
  };
  const placeShip = () => {
    let temp;
    for (let ship of fleet) {
      do {
        temp = assignShipLocation(ship.length);
      } while (checkForOverlap(fleet, temp[1]));
      {
        ship.direction = temp[0];
        ship.location = temp[1];
      }
    }
    return fleet;
  };
  const receiveAttack = (coords) => {
    for (let ship of fleet) {
      for (let i = 0; i < ship.location.length; i++) {
        if (ship.location[i] === coords) {
          ship.hit(coords);
          if (ship.isSunk()) {
            sunkenShips.push(ship);
          }
        }
      }
    }
    missedAttacks.push(coords);
  };
  const checkAllSunk = () => {
    if (sunkenShips.length === fleet.length) {
      return true;
    }
    return false;
  };
  return {
    board,
    fleet,
    sunkenShips,
    missedAttacks,
    grid,
    gridSections,
    leftHalf,
    rightHalf,
    renderBoard,
    createFleet,
    splitGrid,
    getAllLeftHalfNums,
    getAllRightHalfNums,
    shuffleLeftHalf,
    checkForVerticalRestrictions,
    assignShipLocation,
    checkForOverlap,
    placeShip,
    receiveAttack,
    checkAllSunk,
  };
};

export default Gameboard;
