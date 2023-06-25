import { makeObservable, observable } from "mobx";
import { darkTheme, lightTheme } from "../constants/themes";

export class ThemeStore {
  public currentThemeStore = lightTheme;

  constructor() {
    makeObservable(this, {
      currentThemeStore: observable,
    });
  }

  public setTheme(theme: string) {
    if (theme === "light") {
      this.currentThemeStore = lightTheme;
      return;
    }

    if (theme === "dark") {
      this.currentThemeStore = darkTheme;
      return;
    }
  }
}
