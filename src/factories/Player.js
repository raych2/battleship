import getRandomCoordinate from '../helpers/getRandomCoordinate';

const Player = (type) => {
  const attacks = [];
  const attack = (enemy, num) => {
    enemy.receiveAttack(num);
  };
  const computerAttack = (enemy) => {
    let num = getRandomCoordinate(0, 99);
    while (attacks.includes(num)) {
      num = getRandomCoordinate(0, 99);
    }
    if (!attacks.includes(num)) {
      enemy.receiveAttack(num);
      attacks.push(num);
    }
    return num;
  };
  return { type, attacks, attack, computerAttack };
};

export default Player;
