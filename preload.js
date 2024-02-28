const { contextBridge, ipcRenderer } = require("electron/renderer");

contextBridge.exposeInMainWorld("api", {
  getWindowSize: () => {
    return ipcRenderer.sendSync("get-window-size");
  },
});
