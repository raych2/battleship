import Game from './game';
import './style.css';

const startButton = document.querySelector('.start');
const resetButton = document.querySelector('.reset');
const announcement = document.querySelector('.announcement');

resetButton.style.display = 'none';

const initialize = (e) => {
  Game();
  announcement.style.display = 'none';
  startButton.style.display = 'none';
};

startButton.addEventListener('click', initialize);
