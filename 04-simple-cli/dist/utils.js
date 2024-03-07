"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getScene = exports.fightOnce = void 0;
var _content = require("./content");
const randomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
const fightOnce = () => {
  return randomInt(0, 1) ? true : false;
};
exports.fightOnce = fightOnce;
const getScene = (cur = 0) => {
  if (cur === Object.keys(_content.MONSTER).length) {
    return {};
  }
  return _content.MONSTER[Object.keys(_content.MONSTER)[cur]];
};
exports.getScene = getScene;