import { input, confirm, select } from '@inquirer/prompts';
import {
  MONSTER_SHOW_MSG,
  ROLE,
  ROLE_CHOSE_MSG,
  ROLE_CHOSE_START_MSG,
  START_MSG,
  MONSTER,
  SKILL
} from './content';
import { fightOnce, getScene } from './utils';

let roleName = '';
let strike = 0; // 失败的次数

// 交互式询问列表
function inquirerPrompt(argv) {
  const { name: defaultName } = argv;
  return new Promise((resolve, reject) => {
    input({
      type: 'input',
      name: 'name',
      message: START_MSG,
      default: defaultName
    })
      .then((name) => {
        select({
          message: ROLE_CHOSE_MSG(name || defaultName || '你'),
          choices: Object.entries(ROLE).map(([key, item]) => ({
            name: item.name,
            value: key,
            description: item.desc
          }))
        }).then((role) => {
          roleName = ROLE[role].name + name;
          confirm({
            message: ROLE_CHOSE_START_MSG(roleName)
          }).then((value) => {
            if (value) {
              handleScene(0);
            } else {
              resolve();
            }
          });
        });
      })
      .catch((error) => {
        reject(error);
      });
  });
}

const handleScene = (curScene) => {
  const { name, desc } = getScene(curScene);
  if (name) {
    select({
      message: MONSTER_SHOW_MSG(desc, name, roleName),
      choices: Object.entries(SKILL).map(([key, item]) => ({
        name: item.name,
        value: key,
        description: item.desc
      }))
    }).then((answers) => {
      handleFight(answers === 'attack' ? true : false, curScene);
    });
  } else {
    // 游戏结束
    handleGameOver(1);
  }
};

const handleFight = (fight, curScene) => {
  if (fight) {
    if (fightOnce()) {
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

const output = ({ message }) => {
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
      message: `游戏结束，你揭开了遗迹的秘密，那被你战胜的${MONSTER.boss.name}，其实是${MONSTER.boss.desc}！`
    });
    return;
  }
};

export { inquirerPrompt };
