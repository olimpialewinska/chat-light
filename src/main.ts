import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  nativeTheme,
  webContents,
} from "electron";
import { store } from "./store";
import path from "path";

let mainWindow: BrowserWindow;
const appFolder = path.dirname(process.execPath);
const updateExe = path.resolve(appFolder, "..", "Update.exe");
const exeName = path.basename(process.execPath);

let autostart: boolean = store.get("userData.autostart");

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

app.on("ready", () => {
  createWindow();
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.setLoginItemSettings({
  openAtLogin: autostart,
  path: updateExe,
  args: [
    "--processStart",
    `"${exeName}"`,
    "--process-start-args",
    '"--hidden"',
  ],
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

ipcMain.on("get-autostart", () => {
  let autostart = store.get("userData.autostart");
  if (autostart === undefined) {
    store.set("userData.autostart", true);
    autostart = true;
  }

  mainWindow.webContents.send("set-autostart", autostart);
});

ipcMain.on("get-color", () => {
  let color = store.get("userData.color");
  if (color === undefined) {
    store.set("userData.color", "red");
    color = "red";
  }

  mainWindow.webContents.send("set-color", color);
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
  store.set("userData.theme", theme);
});

ipcMain.on("save-autostart", (event, autostart: boolean) => {
  store.set("userData.autostart", autostart);
});

ipcMain.on("save-color", (event, color: string) => {
  store.set("userData.color", color);
  console.log(store.get("userData.color"));
});
