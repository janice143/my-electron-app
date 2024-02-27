import {
  BALL_OFFSET_LEFT,
  BALL_OFFSET_TOP,
  BALL_RADIUS,
  BRICKS,
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  INITIAL_ANGLE,
  LEFT_KEY_CODES,
  PADDLE_HEIGHT,
  PADDLE_OFFSET_LEFT,
  PADDLE_OFFSET_TOP,
  PADDLE_SHIFT_STEP,
  PADDLE_WIDTH,
  RIGHT_KEY_CODES,
  SPACE_KEY_CODE,
  drawBall,
  drawBricks,
  drawPaddle,
} from "./draw.js";
import { deepClone, getBallCoordinate, getBrickCoordinate } from "./utils.js";

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;

// 监听按键
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// 按键状态
let rightPressed = false,
  leftPressed = false,
  spacePressed = false;

// 挡板的坐标
let [paddleX, paddleY] = [PADDLE_OFFSET_LEFT, PADDLE_OFFSET_TOP];
let [ballX, ballY] = [BALL_OFFSET_LEFT, BALL_OFFSET_TOP];
let angle = INITIAL_ANGLE;

let bricks = deepClone(BRICKS);

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

function resetGame() {
  // 按键状态
  rightPressed = false;
  leftPressed = false;
  spacePressed = false;

  // 挡板的坐标
  [paddleX, paddleY] = [PADDLE_OFFSET_LEFT, PADDLE_OFFSET_TOP];
  [ballX, ballY] = [BALL_OFFSET_LEFT, BALL_OFFSET_TOP];
  angle = INITIAL_ANGLE;

  // 砖块
  bricks = deepClone(BRICKS);
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
    resetGame();
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

  // 碰到了砖块
  // hitBricks();
}

function hitBricks() {
  // 砖块碰撞检测
  for (let r = 0; r < bricks.length; r++) {
    for (let c = 0; c < bricks[0].length; c++) {
      if (bricks[r][c] === 1) {
        hitEdge(r, c);
      }
    }
  }
  // 碰到了砖块
  // 未碰到砖块
}

function removeBrick(r, c) {
  // 砖块被消除
  bricks[r][c] === 0;
}

function hitEdge(r, c) {
  const { left, right, top, bottom } = getBrickCoordinate(r, c);

  // 碰到了右边
  hitLeft(right, removeBrick);

  // 碰到了右边
  hitRight(left, removeBrick);

  // 碰到了上边
  hitTop(bottom, removeBrick);

  // 碰到了下边
  hitBottom(top, removeBrick);
}

function hitLeft(left, hitCallback) {
  const border = left + BALL_RADIUS;
  if (ballX < border) {
    angle =
      angle > 0 ? (180 - Math.abs(angle)) % 180 : (Math.abs(angle) - 180) % 180;
    ballX = border;
    hitCallback?.();
  }
}

function hitRight(right, hitCallback) {
  const border = right - BALL_RADIUS;
  if (ballX > border) {
    angle =
      angle > 0 ? (180 - Math.abs(angle)) % 180 : (Math.abs(angle) - 180) % 180;
    ballX = border;
    hitCallback?.();
  }
}

function hitTop(top, hitCallback) {
  const border = top + BALL_RADIUS;
  if (ballY < border) {
    angle = -angle;
    ballY = border;
    hitCallback?.();
  }
}

function hitBottom(bottom, hitCallback) {
  const border = bottom - BALL_RADIUS;
  if (ballY < border) {
    angle = -angle;
    ballY = border;
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
