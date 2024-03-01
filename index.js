const { app, BrowserWindow } = require("electron/main");

function createWindow() {
  const WINDOW_WIDTH = 1000;
  const WINDOW_HEIGHT = 750;

  const win = new BrowserWindow({
    width: WINDOW_WIDTH,
    height: WINDOW_HEIGHT,
    webPreferences: {
      contextIsolation: true,
    },
  });

  win.loadFile("index.html");
}

// require("electron-reload")(__dirname, {
//   electron: require(`${__dirname}/node_modules/electron`),
// });
// console.log("\n🚀 ~ refreshed");

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
