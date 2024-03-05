import { app, BrowserWindow } from 'electron';
import { resolve } from 'path';

let mainWindow: BrowserWindow | null = null;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 960,
    height: 720,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: true,
      webSecurity: false
    }
  });

  if (import.meta.env.MODE === 'dev') {
    if (import.meta.env.VITE_DEV_SERVER_URL) {
      mainWindow.loadURL(import.meta.env.VITE_DEV_SERVER_URL);
      mainWindow.webContents.openDevTools({ mode: 'bottom' });
    }
  } else {
    // mainWindow.webContents.openDevTools();
    mainWindow.loadFile(resolve(__dirname, '../render/index.html'));
  }
};

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
  app.quit();
});

export { mainWindow };
