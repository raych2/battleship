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
  const announcement = document.querySelector('.announcement');
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

  const play = (e) => {
    currentPlayer = playerOne;
    playerOne.attack(computer, Number(e.target.id));
    if (!e.target.matches('.hidden')) {
      e.target.innerText = 'X';
    } else {
      e.target.classList.add('hit');
    }
    e.target.removeEventListener('click', play);
    findWinner();
    currentPlayer = playerTwo;
    let compTarget = document.getElementById(
      `${playerTwo.computerAttack(human)}`
    );
    if (!compTarget.matches('.occupied')) {
      compTarget.innerText = 'X';
    } else {
      compTarget.classList.add('hit');
    }
    compTarget.removeEventListener('click', play);
    findWinner();
    currentPlayer = playerOne;
  };
  const findWinner = () => {
    if (human.checkAllSunk() === true) {
      winner = playerTwo;
      endGame();
      announcement.style.display = 'block';
      announcement.innerText = `Computer wins! Play again!`;
    } else if (computer.checkAllSunk() === true) {
      winner = playerOne;
      endGame();
      announcement.style.display = 'block';
      announcement.innerText = `You win! Play again!`;
    }
  };
  const endGame = () => {
    squares.forEach((square) => {
      square.removeEventListener('click', play);
    });
  };

  squares.forEach((square) => {
    square.addEventListener('click', play);
  });
};

export default Game;
