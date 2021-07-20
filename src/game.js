import Player from './factories/Player';
import Gameboard from './factories/Gameboard';

const Game = () => {
  const playerOne = Player('human');
  const playerTwo = Player('computer');
  const human = Gameboard();
  const computer = Gameboard();

  const playerOneBoard = document.querySelector('.human-board');
  const playerTwoBoard = document.querySelector('.computer-board');
  const humanBoard = human.board;
  const computerBoard = computer.board;
  const playerTurn = document.querySelector('.turn');
  const start = document.querySelector('.start');
  let currentPlayer;
  let winner;

  human.createFleet();
  human.placeShip();
  computer.createFleet();
  computer.placeShip();

  const addShipsToBoard = (boardArr, player) => {
    for (let i = 0; i < boardArr.length; i++) {
      for (let ship of player.fleet) {
        for (let j = 0; j < ship.location.length; j++) {
          if (i === ship.location[j]) {
            boardArr[i] = ship.location[j];
          }
        }
      }
    }
    return boardArr;
  };
  addShipsToBoard(humanBoard, human);
  addShipsToBoard(computerBoard, computer);

  const renderGameBoard = (boardArr, boardOwner) => {
    const boardNameOne = document.getElementById('playerOne');
    const boardNameTwo = document.getElementById('playerTwo');
    if (boardArr === humanBoard) {
      boardNameOne.innerText = 'Your Board';
    } else {
      boardNameTwo.innerText = 'Enemy Board';
    }
    for (let i = 0; i < boardArr.length; i++) {
      let square = document.createElement('div');
      square.id = i;
      if (boardArr[i] === '') {
        square.classList.add('empty');
        square.classList.add('square');
      } else if (boardArr === computerBoard && boardArr[i] !== '') {
        square.classList.add('hidden');
        square.classList.add('square');
      } else {
        square.classList.add('occupied');
        square.classList.add('square');
      }
      boardOwner.append(square);
    }
  };
  renderGameBoard(humanBoard, playerOneBoard);
  renderGameBoard(computerBoard, playerTwoBoard);

  const squares = document.querySelectorAll('.square');
};

export default Game;
