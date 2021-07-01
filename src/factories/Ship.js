const Ship = (length) => {
  let hits = Array(length).fill('');
  const hit = (num) => {
    for (let i = 0; i < hits.length; i++) {
      if (i === num) {
        hits[num] = 'X';
        return hits;
      }
    }
  };
  const isSunk = () => {
    if (hits.every((space) => (space = 'X'))) {
      return true;
    }
  };
  return { length, hits, hit, isSunk };
};

export default Ship;
