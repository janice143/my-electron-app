"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.START_MSG = exports.SKILL = exports.SCENE = exports.ROLE_CHOSE_START_MSG = exports.ROLE_CHOSE_MSG = exports.ROLE = exports.MONSTER_SHOW_MSG = exports.MONSTER = void 0;
// 开篇词
const START_MSG = exports.START_MSG = '欢迎来到《遗忘之地》\n\n你是一个勇敢的探险家，被派往一个神秘的岛屿调查一个古老的遗迹。岛上充满了危险，野兽、怪物、以及古老的诅咒。你的目标是揭开遗迹的秘密并安全返回。\n请输入你的名字：';

// 选择角色
const ROLE_CHOSE_MSG = name => `角色选择\n${name}可以选择以下角色之一：`;
exports.ROLE_CHOSE_MSG = ROLE_CHOSE_MSG;
const ROLE = exports.ROLE = {
  warrior: {
    name: '战士',
    desc: '强大的物理攻击，高生命值。'
  },
  mage: {
    name: '法师',
    desc: '强大的魔法攻击，但生命值较低。'
  },
  rogue: {
    name: '盗贼',
    desc: '敏捷且擅长闪避，平衡的攻击和生命值。'
  }
};
const ROLE_CHOSE_START_MSG = roleName => `${roleName}，惊险刺激的征途开始了，你准备好了吗？`;

// 技能
exports.ROLE_CHOSE_START_MSG = ROLE_CHOSE_START_MSG;
const SKILL = exports.SKILL = {
  attack: {
    name: '攻击',
    desc: '对敌人进行攻击。'
  },
  escape: {
    name: '逃跑',
    desc: '尝试逃离战斗。'
  }
};

// 场景
const SCENE = exports.SCENE = {
  forest: {
    name: '幽暗森林',
    desc: '一片密布着古老树木的森林，阳光难以穿透其浓密的树冠。奇异的声音和动物的叫声在林间回响，不时有影子在树木之间快速移动。'
  },
  ash: {
    name: '被遗忘的废墟',
    desc: '曾经辉煌的城市现在只剩下断壁残垣。古老的石制建筑物现在成为了野兽的巢穴和探险者寻宝的地点。'
  },
  castle: {
    name: '幽灵城堡',
    desc: '一座位于山顶上的古老城堡，被传说中的诅咒笼罩。城堡内部充满了幽灵和不死生物，墙壁上挂着褪色的挂毯和古老的盔甲。'
  },
  desert: {
    name: '毒刺沙漠',
    desc: '一片广阔的沙漠，炎热的阳光和热浪使得穿越变得极为困难。沙漠中散布着古老的遗迹和危险的生物。'
  },
  dungeon: {
    name: '隐秘的地下城',
    desc: '一个隐藏在地下的庞大迷宫，充满了机关陷阱和宝藏。昏暗的灯光下，墙壁上刻满了古老的符文。'
  },
  hole: {
    name: '龙之巢穴',
    desc: '龙之巢穴位于遗忘之地的最深处，一个隐藏在山脉之中的巨大洞穴。这里是荒古龙王的居所，也是它守护的秘密之地。洞穴内部充满了从各地搜集来的珍宝和古老的魔法物品，地面上散落着金币和宝石。洞顶悬挂着发光的晶石，照亮了整个空间。洞穴的中央是一个宽阔的平台，正是与萨洛纳克斯进行决战的地点。'
  }
};
const MONSTER_SHOW_MSG = (desc, name, roleName) => `你遇到了${name}，${desc}伟大的${roleName}，你准备战斗还是逃跑`;

// 怪物
exports.MONSTER_SHOW_MSG = MONSTER_SHOW_MSG;
const MONSTER = exports.MONSTER = {
  wolf: {
    name: '影子狼',
    desc: '黑暗森林中的猎食者，它们的皮毛如夜一般黑暗，眼睛在月光下闪烁着银色的光芒。以其敏捷和难以预测的移动而著称。',
    scene: SCENE.forest
  },
  giant: {
    name: '石皮巨人',
    desc: '古老废墟中的守护者，全身由岩石构成，移动虽缓慢，但具有强大的防御力和攻击力。',
    scene: SCENE.ash
  },
  magician: {
    name: '幽灵魔术师',
    desc: '废弃城堡的幽灵，穿着破烂的长袍，手持法杖，能够施展各种诡异的魔法。',
    scene: SCENE.castle
  },
  spider: {
    name: '毒刺蝎',
    desc: '沙漠遗迹中潜伏的危险生物，其尾部的毒刺能够释放致命的毒液。',
    scene: SCENE.desert
  },
  ghost: {
    name: '幻影刺客',
    desc: '被雇佣守护某些特定遗迹的神秘刺客，擅长隐身和快速发起致命一击。',
    scene: SCENE.dungeon
  },
  boss: {
    name: '荒古龙王',
    desc: '遗忘之地的最终守护者，古老而强大的龙族之王。它的鳞片硬如钻石，眼中闪烁着智慧与狂野的光芒。它能够呼唤风暴，喷吐毁灭性的火焰。极高的生命值和攻击力，能够进行物理攻击和魔法攻击，每隔几轮可以使用特殊技能，如召唤风暴或喷吐火焰，对玩家造成大量伤害。',
    scene: SCENE.hole
  }
};