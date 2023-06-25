import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  nativeTheme,
  webContents,
} from "electron";
import { store } from "./store";

let mainWindow: BrowserWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    title: "ChatLight",
    frame: false,
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

ipcMain.on("close-window", () => {
  mainWindow.close();
});

ipcMain.on("get-theme", () => {
  let theme = store.get("userData.theme");
  if (!theme) {
    ipcMain.handle("dark-mode:toggle", () => {
      if (nativeTheme.shouldUseDarkColors) {
        nativeTheme.themeSource = "light";
      } else {
        nativeTheme.themeSource = "dark";
      }
      return nativeTheme.shouldUseDarkColors;
    });

    theme = nativeTheme.shouldUseDarkColors ? "dark" : "light";
    store.set("userData.theme", theme);
  }

  mainWindow.webContents.send("set-theme", theme);
});

ipcMain.on("minimize-window", () => {
  mainWindow.minimize();
});

ipcMain.on("maximize-window", () => {
  mainWindow.isMaximized() ? mainWindow.unmaximize() : mainWindow.maximize();
});

ipcMain.on("fullscreen-window", () => {
  mainWindow.setFullScreen(!mainWindow.isFullScreen());
});

ipcMain.on("save-theme", (event, theme: string) => {
  store.set("userData", { theme: theme });
});
