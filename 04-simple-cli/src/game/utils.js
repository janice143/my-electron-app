import { MONSTER } from './content';

const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const fightOnce = () => {
  return randomInt(0, 1) ? true : false;
};

export const getScene = (cur = 0) => {
  if (cur === Object.keys(MONSTER).length) {
    return {};
  }
  return MONSTER[Object.keys(MONSTER)[cur]];
};
