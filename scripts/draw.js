// 游戏的基本参数

// 按钮值: a d, ArrowLeft, ArrowRight
export const LEFT_KEY_CODES = [65, 37];
export const RIGHT_KEY_CODES = [68, 39];
export const SPACE_KEY_CODE = 32;

// 游戏画布
export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 500;

// 球
export const BALL_RADIUS = 8;
const BALL_COLOR = "#FFD700";

export const INITIAL_ANGLE = 30; // 起始发球角度，相对于x轴

// 调节球的速度
export const BALL_SHIFT_STEP = 2; // 横向移动距离

// 砖块布局
const BRICKS_1 = [
  [0, 0, 0, 0, 0, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];
const BRICKS_2 = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
];

// 关卡
export const LEVEL = [BRICKS_1, BRICKS_2];

const BRICKS_COLOR_PALETTE = ["#FF6B6B", "#FFD93D", "#6BCB77", "#4D96FF"]; // Vibrant color palette

export const BRICK_HEIGHT = 20;
export const BRICK_WIDTH = 50;
export const BRICK_GAP = 2;

// 接板
export const PADDLE_HEIGHT = 8;
export const PADDLE_WIDTH = 80;
const PADDLE_COLOR = "#FF6347";

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

export function drawBricks(ctx, bricks) {
  for (let r = 0; r < bricks.length; r++) {
    for (let c = 0; c < bricks[0].length; c++) {
      if (bricks[r][c].status === 1) {
        ctx.beginPath();
        ctx.rect(bricks[r][c].x, bricks[r][c].y, BRICK_WIDTH, BRICK_HEIGHT);
        // ctx.fillStyle =
        //   BRICKS_COLOR_PALETTE[
        //     Math.floor(Math.random(1) * 10) % BRICKS_COLOR_PALETTE.length
        //   ];
        ctx.fillStyle = BRICKS_COLOR_PALETTE[r % BRICKS_COLOR_PALETTE.length];
        ctx.fill();
        ctx.closePath();

        // FIXME:  debug
        // ctx.fillStyle = "white";
        // ctx.font = "8px Arial";
        // ctx.fillText(
        //   `${bricks[r][c].x}，${bricks[r][c].y}`,
        //   bricks[r][c].x,
        //   bricks[r][c].y,
        // );
      }
    }
  }
}
