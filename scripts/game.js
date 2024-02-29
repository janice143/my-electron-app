import {
  BALL_RADIUS,
  BRICK_GAP,
  BRICK_WIDTH,
  INITIAL_ANGLE,
  LEFT_KEY_CODES,
  LEVEL,
  PADDLE_HEIGHT,
  PADDLE_SHIFT_STEP,
  PADDLE_WIDTH,
  RIGHT_KEY_CODES,
  SPACE_KEY_CODE,
  drawBall,
  drawBricks,
  drawPaddle,
} from "./draw.js";
import { getBallCoordinate, getBrickCoordinate, getBricks } from "./utils.js";

const canvas = document.getElementById("gameCanvas");
const scoreText = document.getElementById("score");

const ctx = canvas.getContext("2d");

window.innerWidth = 1000;
window.innerHeight = 900;

canvas.width = window.innerWidth - 200;
canvas.height = window.innerHeight - 300;

let BALL_OFFSET_LEFT = canvas.width / 2; // 横向居中对齐
let BALL_OFFSET_TOP = canvas.height * 0.8;

let PADDLE_OFFSET_LEFT = BALL_OFFSET_LEFT - PADDLE_WIDTH / 2; // 横向和球一样
let PADDLE_OFFSET_TOP = BALL_OFFSET_TOP + BALL_RADIUS; // 纵向位于球的下方

let curLevel = 0;
const CUR_BRICKS = LEVEL[curLevel];

// 水平居中
let BRICK_OFFSET_TOP = 10;
let BRICK_OFFSET_LEFT =
  canvas.width / 2 - (CUR_BRICKS[0].length * (BRICK_WIDTH + BRICK_GAP)) / 2;

// 监听按键
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// 游戏初始状态

// 按键状态
let rightPressed = false,
  leftPressed = false,
  spacePressed = false;

// 挡板的坐标
let [paddleX, paddleY] = [PADDLE_OFFSET_LEFT, PADDLE_OFFSET_TOP];
let [ballX, ballY] = [BALL_OFFSET_LEFT, BALL_OFFSET_TOP];
let angle = INITIAL_ANGLE;

let bricks = getBricks(CUR_BRICKS, BRICK_OFFSET_LEFT, BRICK_OFFSET_TOP);

let score = 0;

function keyDownHandler(e) {
  const { keyCode } = e;
  if (RIGHT_KEY_CODES.includes(keyCode)) {
    rightPressed = true;
  } else if (LEFT_KEY_CODES.includes(keyCode)) {
    leftPressed = true;
  }
}

function keyUpHandler(e) {
  const { keyCode } = e;
  if (RIGHT_KEY_CODES.includes(keyCode)) {
    rightPressed = false;
  } else if (LEFT_KEY_CODES.includes(keyCode)) {
    leftPressed = false;
  } else if (SPACE_KEY_CODE === keyCode) {
    // 发球
    spacePressed = !spacePressed;
  }
}

export function resetGame(level) {
  // 按键状态
  rightPressed = false;
  leftPressed = false;
  spacePressed = false;

  // 挡板的坐标
  [paddleX, paddleY] = [PADDLE_OFFSET_LEFT, PADDLE_OFFSET_TOP];
  [ballX, ballY] = [BALL_OFFSET_LEFT, BALL_OFFSET_TOP];
  angle = INITIAL_ANGLE;

  // 砖块
  bricks = getBricks(LEVEL[level || 0], BRICK_OFFSET_LEFT, BRICK_OFFSET_TOP);

  score = 0;
}

function getNextLevel(cur) {
  if (cur === LEVEL.length - 1) {
    curLevel = 0;
    return 0;
  }
  curLevel = cur + 1;
  return cur + 1;
}

export function pauseGame() {
  spacePressed = false;
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clearCanvas();
  // 游戏绘制逻辑
  drawBall(ctx, ballX, ballY);
  drawBricks(ctx, bricks);
  drawPaddle(ctx, paddleX, paddleY);

  // 游戏分数
  scoreText.innerText = score;
}

function updatePaddle() {
  if (!spacePressed) return;

  if (rightPressed && paddleX < canvas.width - PADDLE_WIDTH) {
    paddleX += PADDLE_SHIFT_STEP;
  } else if (leftPressed && paddleX > 0) {
    paddleX -= PADDLE_SHIFT_STEP;
  }
}

function updateBall() {
  if (!spacePressed) return;

  // 发球
  const { x, y } = getBallCoordinate(ballX, ballY, angle);
  ballX = x;
  ballY = y;

  // 球的运动
  // 没有接到球：球的最下方超过了板子的最下方
  if (ballY + BALL_RADIUS > paddleY + PADDLE_HEIGHT) {
    alert("失败");
    resetGame(curLevel);
    return;
  }

  // 碰撞检测
  // 碰到了画布边缘, 反弹
  hitLeft(0);

  // 碰到了右边
  hitRight(canvas.width);

  // 碰到了上边
  hitTop(0);

  // 碰到了板子
  if (
    ballY >= paddleY - BALL_RADIUS &&
    ballY <= paddleY + PADDLE_HEIGHT - BALL_RADIUS &&
    ballX >= paddleX &&
    ballX <= paddleX + PADDLE_WIDTH
  ) {
    angle = -angle;
    ballY = paddleY - BALL_RADIUS;
  }
  // hitBottom(paddleY, paddleX, paddleX + PADDLE_WIDTH);

  // 碰到了砖块
  hitBricks();
}

function hitBricks() {
  // 砖块碰撞检测
  for (let r = 0; r < bricks.length; r++) {
    for (let c = 0; c < bricks[0].length; c++) {
      if (bricks[r][c].status === 1) {
        hitEdge(bricks[r][c]);
      }
    }
  }
  // 碰到了砖块
  // 未碰到砖块
}

function doHitBrick(brick) {
  // 砖块被消除
  brick.status = 0;
  // 计分
  score++;

  // 如果砖块全部被消除了
  if (bricks.every((row) => row.every((col) => col.status === 0))) {
    alert("胜利");
    resetGame(getNextLevel(curLevel));
  }
}

function hitEdge(brick) {
  const { left, right, top, bottom } = getBrickCoordinate(brick.x, brick.y);

  // 碰到了右边
  hitLeft(right, top, bottom, () => doHitBrick(brick));

  // 碰到了右边
  hitRight(left, top, bottom, () => doHitBrick(brick));

  // 碰到了上边
  hitTop(bottom, left, right, () => doHitBrick(brick));

  // 碰到了下边
  hitBottom(top, left, right, () => doHitBrick(brick));
}

function hitLeft(pivot, top = 0, bottom = canvas.height, hitCallback) {
  const right = pivot + BALL_RADIUS;
  const left = pivot - BALL_RADIUS;
  if (left <= ballX && ballX <= right && top <= ballY && ballY <= bottom) {
    angle =
      angle > 0 ? (180 - Math.abs(angle)) % 180 : (Math.abs(angle) - 180) % 180;
    ballX = right;
    hitCallback?.();
  }
}

function hitRight(pivot, top = 0, bottom = canvas.height, hitCallback) {
  const left = pivot - BALL_RADIUS;
  const right = pivot + BALL_RADIUS;
  if (left <= ballX && ballX <= right && top <= ballY && ballY <= bottom) {
    angle =
      angle > 0 ? (180 - Math.abs(angle)) % 180 : (Math.abs(angle) - 180) % 180;
    ballX = left;
    hitCallback?.();
  }
}

// 球往上边撞
function hitTop(pivot, left = 0, right = canvas.width, hitCallback) {
  const bottom = pivot + BALL_RADIUS;
  const top = pivot - BALL_RADIUS;
  if (top <= ballY && ballY <= bottom && ballX >= left && ballX <= right) {
    angle = -angle;
    ballY = bottom;
    hitCallback?.();
  }
}

function hitBottom(pivot, left = 0, right = canvas.width, hitCallback) {
  const top = pivot - BALL_RADIUS;
  const bottom = pivot + BALL_RADIUS;
  if (top <= ballY && ballY <= bottom && ballX >= left && ballX <= right) {
    angle = -angle;
    ballY = top;
    hitCallback?.();
  }
}

function update() {
  // 游戏更新逻辑
  updatePaddle();
  updateBall();
}

export function gameLoop() {
  requestAnimationFrame(gameLoop);
  update();
  draw();
}
