import { makeObservable, observable } from "mobx";
import { darkTheme, lightTheme } from "../constants/themes";

export class AppSettings {
  public currentappSettings = lightTheme;
  public autostart: boolean = true;

  constructor() {
    makeObservable(this, {
      currentappSettings: observable,
      autostart: observable,
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
}
