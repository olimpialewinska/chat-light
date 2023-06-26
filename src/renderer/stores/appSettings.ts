import { makeObservable, observable } from "mobx";
import { darkTheme, lightTheme } from "../constants/themes";
import { store } from ".";

export class AppSettings {
  public currentappSettings = lightTheme;
  public autostart: boolean = true;
  public color: string = "red";
  public colorShadeBasedOnTheme: string = "";

  constructor() {
    makeObservable(this, {
      currentappSettings: observable,
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
      this.currentappSettings = lightTheme;
      return;
    }

    if (theme === "dark") {
      this.currentappSettings = darkTheme;
      return;
    }
  }

  public setAutostart(autostart: boolean) {
    this.autostart = autostart;
  }

  public setColor(color: string) {
    const isLightTheme = this.currentappSettings.theme === "light";
    const colorMap: { [key: string]: string } = {
      pink: isLightTheme ? "#f001b4" : "#ff76dd",
      orange: isLightTheme ? "#ff7700" : "#ffa95d",
      red: isLightTheme ? "#ff0800" : "#fb6c67",
      blue: isLightTheme ? "#1201ff" : "#678aff",
      purple: isLightTheme ? "#7901e2" : "#b25ffb",
      green: isLightTheme ? "#77ff79" : "#2cff2f",
    };

    this.colorShadeBasedOnTheme =
      colorMap[color as keyof typeof colorMap] || "red";
    this.color = color;
  }
}
