#!/usr/bin/env node
"use strict";

var _yargs = _interopRequireDefault(require("yargs"));
var _helpers = require("yargs/helpers");
var _inquirer = require("./game/inquirer");
var _electronVite = require("./electron-vite");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
(0, _yargs.default)((0, _helpers.hideBin)(process.argv)).command(['game'], '游戏名称：《遗忘之地》', function (yargs) {
  return yargs.option('name', {
    describe: '游戏名称',
    type: 'string'
  });
}, argv => {
  (0, _inquirer.inquirerPrompt)(argv);
}).parse();
(0, _yargs.default)((0, _helpers.hideBin)(process.argv)).command(['my-electron-vite'], 'electron vite项目模板', function (yargs) {
  return yargs.option('name', {
    demand: true,
    describe: '项目名称',
    type: 'string'
  });
}, argv => {
  (0, _electronVite.handleDownload)(argv.name);
}).parse();