#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import { inquirerPrompt } from './game/inquirer';
import { handleDownload } from './electron-vite';

yargs(hideBin(process.argv))
  .command(
    ['game'],
    '游戏名称：《遗忘之地》',
    function (yargs) {
      return yargs.option('name', {
        describe: '游戏名称',
        type: 'string'
      });
    },
    (argv) => {
      inquirerPrompt(argv);
    }
  )
  .parse();

yargs(hideBin(process.argv))
  .command(
    ['my-electron-vite'],
    'electron vite项目模板',
    function (yargs) {
      return yargs.option('name', {
        demand: true,
        describe: '项目名称',
        type: 'string'
      });
    },
    (argv) => {
      handleDownload(argv.name);
    }
  )
  .parse();
