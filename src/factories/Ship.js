const Ship = (length) => {
  let direction;
  let location = [];
  let hits = [];
  const hit = (num) => {
    hits.push(num);
    return hits;
  };
  const isSunk = () => {
    if (hits.length === length) {
      return true;
    }
    return false;
  };
  return { length, direction, location, hits, hit, isSunk };
};

export default Ship;
