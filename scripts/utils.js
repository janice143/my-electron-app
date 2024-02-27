import { BALL_SHIFT_STEP } from "./draw.js";
// 根据起始角度和位置计算移动的距离
export function getBallCoordinate(x0, y0, angle) {
  //  yo - y = k * (x-x0) = tan(angle) * (x-x0)
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

export function delay(seconds) {
  return new Promise((resolve) => {
    // 将秒转换为毫秒
    const milliseconds = seconds * 1000;

    // 创建一个定时器
    const timerId = setTimeout(() => {
      clearTimeout(timerId); // 清除定时器
      resolve(); // 完成Promise
    }, milliseconds);
  });
}
