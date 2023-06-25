import { configure } from "mobx";
import { ThemeStore } from "./themeStore";

configure({ enforceActions: "never" });

export class Store {
  public themeStore = new ThemeStore();

  constructor() {}
}

export const store = new Store();
