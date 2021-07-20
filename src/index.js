import Game from './game';
import './style.css';

const button = document.querySelector('.start');
const initialize = (e) => {
  Game();
  e.target.removeEventListener('click', initialize);
};
button.addEventListener('click', initialize);
