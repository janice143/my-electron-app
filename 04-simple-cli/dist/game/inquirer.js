"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.inquirerPrompt = inquirerPrompt;
var _prompts = require("@inquirer/prompts");
var _content = require("./content");
var _utils = require("./utils");
let roleName = '';
let strike = 0; // 失败的次数

// 交互式询问列表
function inquirerPrompt(argv) {
  const {
    name: defaultName
  } = argv;
  return new Promise((resolve, reject) => {
    (0, _prompts.input)({
      type: 'input',
      name: 'name',
      message: _content.START_MSG,
      default: defaultName
    }).then(name => {
      (0, _prompts.select)({
        message: (0, _content.ROLE_CHOSE_MSG)(name || defaultName || '你'),
        choices: Object.entries(_content.ROLE).map(([key, item]) => ({
          name: item.name,
          value: key,
          description: item.desc
        }))
      }).then(role => {
        roleName = _content.ROLE[role].name + name;
        (0, _prompts.confirm)({
          message: (0, _content.ROLE_CHOSE_START_MSG)(roleName)
        }).then(value => {
          if (value) {
            handleScene(0);
          } else {
            resolve();
          }
        });
      });
    }).catch(error => {
      reject(error);
    });
  });
}
const handleScene = curScene => {
  const {
    name,
    desc
  } = (0, _utils.getScene)(curScene);
  if (name) {
    (0, _prompts.select)({
      message: (0, _content.MONSTER_SHOW_MSG)(desc, name, roleName),
      choices: Object.entries(_content.SKILL).map(([key, item]) => ({
        name: item.name,
        value: key,
        description: item.desc
      }))
    }).then(answers => {
      handleFight(answers === 'attack' ? true : false, curScene);
    });
  } else {
    // 游戏结束
    handleGameOver(1);
  }
};
const handleFight = (fight, curScene) => {
  if (fight) {
    if ((0, _utils.fightOnce)()) {
      output({
        message: '你战胜了怪物！你继续前行'
      });
      handleScene(curScene + 1);
    } else {
      if (strike >= 3) {
        output({
          message: '你被怪物打败了！'
        });
        handleGameOver(0);
      } else {
        output({
          message: '你被怪物打败了，再来一次吧！'
        });
        strike += 1;
        handleScene(curScene);
      }
    }
  }
};
const output = ({
  message
}) => {
  console.log(message);
};
const handleGameOver = (type = 0) => {
  if (type === 0) {
    output({
      message: '游戏结束，欢迎下次再来！'
    });
    return;
  }
  if (type === 1) {
    output({
      message: `游戏结束，你揭开了遗迹的秘密，那被你战胜的${_content.MONSTER.boss.name}，其实是${_content.MONSTER.boss.desc}！`
    });
    return;
  }
};