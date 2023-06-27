import { makeObservable, observable } from "mobx";
import { darkTheme, lightTheme } from "../constants/themes";
import { store } from ".";

export class AppSettings {
  public theme = lightTheme;
  public autostart: boolean = true;
  public color: string = "#ff76dd";

  constructor() {
    makeObservable(this, {
      theme: observable,
      autostart: observable,
      color: observable,
    });
  }

  public init() {
    window.electron.ipcRenderer.on("set-theme", (event, theme) => {
      store.appSettings.setTheme(theme);
    });
    window.electron.ipcRenderer.on("set-autostart", (event, b) => {
      store.appSettings.setAutostart(b);
    });

    window.electron.ipcRenderer.on("set-color", (event, color) => {
      store.appSettings.setColor(color);
    });

    window.electron.ipcRenderer.send("get-theme");
    window.electron.ipcRenderer.send("get-color");
    window.electron.ipcRenderer.send("get-autostart");
  }

  public setTheme(theme: string) {
    if (theme === "light") {
      this.theme = lightTheme;
      return;
    }

    if (theme === "dark") {
      this.theme = darkTheme;
      return;
    }
  }

  public setAutostart(autostart: boolean) {
    this.autostart = autostart;
  }

  public setColor(color: string) {
    this.color = color;
  }
}
