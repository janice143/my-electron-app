import { gameLoop, pauseGame, resetGame } from "./game.js";

document.getElementById("startButton")?.addEventListener("click", async () => {
  startGame();
});

document.getElementById("home")?.addEventListener("click", () => {
  backHome();
});

document.getElementById("help")?.addEventListener("click", () => {
  togglePopUp(true);
});

document.getElementById("popUpConfirmBtn")?.addEventListener("click", () => {
  togglePopUp(false);
});

document.getElementById("popUpCloseBtn")?.addEventListener("click", () => {
  togglePopUp(false);
});

function togglePopUp(flag) {
  if (flag) {
    document.getElementById("popUp").classList.add("visible");
    pauseGame();
  } else {
    document.getElementById("popUp").classList.remove("visible");
  }
}

function backHome() {
  document.getElementById("startScreen").style.display = "block";
  document.getElementById("onGame").style.display = "none";
  resetGame();
}

function startGame() {
  document.getElementById("startScreen").style.display = "none";
  document.getElementById("onGame").style.display = "block";
  gameLoop();
}

window.addEventListener("resize", () => {
  const canvas = document.getElementById("gameCanvas");
  canvas.width = window.innerWidth - 200;
  canvas.height = window.innerHeight - 300;
});
