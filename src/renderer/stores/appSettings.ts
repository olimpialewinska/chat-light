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
    console.log(color);
    const isLightTheme = this.currentappSettings.theme === "light";
    const colorMap: { [key: string]: string } = {
      pink: isLightTheme ? "#f001b4" : "#ff76dd",
      orange: isLightTheme ? "#ff7700" : "#ffa95d",
      red: isLightTheme ? "#ff0800" : "#fb6c67",
      blue: isLightTheme ? "#1201ff" : "#678aff",
      purple: isLightTheme ? "#7901e2" : "#b25ffb",
      green: isLightTheme ? "#01c005" : "#2cff2f",
    };

    this.colorShadeBasedOnTheme =
      colorMap[color as keyof typeof colorMap] || "red";
    this.color = color;
  }
}
