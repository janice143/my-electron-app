import {
  BALL_SHIFT_STEP,
  BRICK_GAP,
  BRICK_HEIGHT,
  BRICK_WIDTH,
} from "./draw.js";
// 根据起始角度和位置计算移动的距离
export function getBallCoordinate(x0, y0, angle) {
  //  yo - y = k * (x-x0) = tan(angle) * (x-x0)
  // -180 <= angle <= 180
  const k = Math.tan((angle / 180) * Math.PI);
  let [x, y] = [x0, y0];

  if (Math.abs(angle) < 90) {
    x = x0 + BALL_SHIFT_STEP;
  } else {
    x = x0 - BALL_SHIFT_STEP;
  }

  y = y0 - k * (x - x0);
  return { x, y };
}

export function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

export function getBrickCoordinate(brickX, brickY) {
  const left = brickX;
  const right = brickX + BRICK_WIDTH;
  const top = brickY;
  const bottom = brickY + BRICK_HEIGHT;

  return { left, right, top, bottom };
}

export function getBricks(BRICKS, BRICK_OFFSET_LEFT, BRICK_OFFSET_TOP) {
  const rows = BRICKS.length,
    cols = BRICKS[0].length;
  const bricks = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => ({})),
  );

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (BRICKS[r][c] === 1) {
        bricks[r][c].status = 1;
        let brickX = c * (BRICK_WIDTH + BRICK_GAP) + BRICK_OFFSET_LEFT;
        let brickY = r * (BRICK_HEIGHT + BRICK_GAP) + BRICK_OFFSET_TOP;
        bricks[r][c].x = brickX;
        bricks[r][c].y = brickY;
      } else {
        bricks[r][c].status = 0;
      }
    }
  }
  return bricks;
}
