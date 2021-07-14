import Ship from '../factories/Ship';

const Gameboard = () => {
  let board = Array.from({ length: 100 }, (v, i) => i);
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
  const getRandomCoordinate = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  };
  //prevent horizontal ships from going off board
  const checkForHorizontalRestrictions = (length, num) => {
    let lastColumn = [9, 19, 29, 39, 49, 59, 69, 79, 89, 99];
    if (lastColumn.includes(num) && length === 2) {
      num = getRandomCoordinate(0, 98);
    } else if (lastColumn.includes(num) || (length <= 5 && length >= 3)) {
      num = getRandomCoordinate(0, 94);
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
      initialPosition = getRandomCoordinate(0, 98);
      checkForHorizontalRestrictions(length, initialPosition);
    } else {
      initialPosition = getRandomCoordinate(0, 98);
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
        if (ship.location.indexOf(location[j]) >= 0) {
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
    renderBoard,
    createFleet,
    getRandomCoordinate,
    checkForHorizontalRestrictions,
    checkForVerticalRestrictions,
    assignShipLocation,
    checkForOverlap,
    placeShip,
    receiveAttack,
    checkAllSunk,
  };
};

export default Gameboard;
