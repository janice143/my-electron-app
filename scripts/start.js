import { gameLoop } from "./game.js";

document.getElementById("startButton")?.addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("gameCanvas").style.display = "block";
  document.getElementById("menu").style.display = "block";

  gameLoop();
});

document.getElementById("backHome")?.addEventListener("click", () => {
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("gameCanvas").style.display = "none";
  document.getElementById("menu").style.display = "none";
});

gameLoop();
