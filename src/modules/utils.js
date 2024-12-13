// modules/utils.js

export function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

export function getRandomDirection() {
  const directions = [
    { x: 1, y: 0 },
    { x: -1, y: 0 },
    { x: 0, y: 1 },
    { x: 0, y: -1 }
  ];
  return directions[getRandomInt(directions.length)];
}