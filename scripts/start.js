import { gameLoop } from "./game.js";

document.getElementById("startButton")?.addEventListener("click", async () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("onGame").style.display = "block";
  // document.getElementById("gameCanvas").style.display = "block";
  // document.getElementById("menu").style.display = "block";

  gameLoop();
});

document.getElementById("backHome")?.addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("onGame").style.display = "none";

  // document.getElementById("gameCanvas").style.display = "none";
  // document.getElementById("menu").style.display = "none";
});

window.addEventListener("resize", () => {
  const canvas = document.getElementById("gameCanvas");
  canvas.width = window.innerWidth - 200;
  canvas.height = window.innerHeight - 300;
});

gameLoop();
