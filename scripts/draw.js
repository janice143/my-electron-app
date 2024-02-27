// 游戏的基本参数
// 按钮值: a d, ArrowLeft, ArrowRight
export const LEFT_KEY_CODES = [65, 37];
export const RIGHT_KEY_CODES = [68, 39];
export const SPACE_KEY_CODE = 32;

// 游戏画布
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 600;

// 球
export const BALL_RADIUS = 8;
const BALL_COLOR = "#0095DD";
export const BALL_OFFSET_LEFT = CANVAS_WIDTH / 2; // 横向居中对齐
export const BALL_OFFSET_TOP = CANVAS_HEIGHT * 0.8;
export const INITIAL_ANGLE = 150; // 起始发球角度，相对于x轴
export const BALL_SHIFT_STEP = 4; // 横向移动距离

// 砖块
export const BRICKS = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

export const BRICK_HEIGHT = 20;
export const BRICK_WIDTH = 50;
export const BRICK_GAP = 2;
export const BRICK_OFFSET_TOP = 10;
export const BRICK_OFFSET_LEFT = 10;

// 接板
export const PADDLE_HEIGHT = 8;
export const PADDLE_WIDTH = 80;
const PADDLE_COLOR = "#0095DD";
export const PADDLE_OFFSET_LEFT = (CANVAS_WIDTH - PADDLE_WIDTH) / 2; // 横向居中对齐
export const PADDLE_OFFSET_TOP = BALL_OFFSET_TOP + BALL_RADIUS; // 纵向位于球的下方
export const PADDLE_SHIFT_STEP = 7;

export function drawBall(ctx, x, y) {
  ctx.beginPath();
  ctx.arc(x, y, BALL_RADIUS, 0, Math.PI * 2);
  ctx.fillStyle = BALL_COLOR;
  ctx.fill();
  ctx.closePath();
}

export function drawPaddle(ctx, x, y) {
  ctx.beginPath();
  ctx.rect(x, y, PADDLE_WIDTH, PADDLE_HEIGHT);
  ctx.fillStyle = PADDLE_COLOR;
  ctx.fill();
  ctx.closePath();
}

export function drawBricks(ctx, BRICKS) {
  for (let r = 0; r < BRICKS.length; r++) {
    for (let c = 0; c < BRICKS[0].length; c++) {
      if (BRICKS[r][c] === 1) {
        let brickX = c * (BRICK_WIDTH + BRICK_GAP) + BRICK_OFFSET_LEFT;
        let brickY = r * (BRICK_HEIGHT + BRICK_GAP) + BRICK_OFFSET_TOP;

        ctx.beginPath();
        ctx.rect(brickX, brickY, BRICK_WIDTH, BRICK_HEIGHT);
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
