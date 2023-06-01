import { app, BrowserWindow, globalShortcut, ipcMain } from "electron";

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "ChatLight",
    frame: false,
    alwaysOnTop: true,
    webPreferences: {
      preload: __dirname + "/preload.js",
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: false,
    },
    icon: __dirname + "/icon.png",
  });
  mainWindow.setMenuBarVisibility(false);

  if (process.env.DEV === "1") {
    mainWindow.loadURL("http://localhost:4444/");
    mainWindow.webContents.openDevTools({ mode: "detach" });
  } else {
    mainWindow.loadFile("build/index.html");
  }

  globalShortcut.register("CommandOrControl+N", toggleWindow);

  globalShortcut.register("CommandOrControl+K", () => {
    app.quit();
  });
}

function toggleWindow() {
  if (!mainWindow.isVisible()) {
    mainWindow.show();
    mainWindow.focus();
  } else {
    mainWindow.hide();
  }
}

app.on("ready", createWindow);

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
