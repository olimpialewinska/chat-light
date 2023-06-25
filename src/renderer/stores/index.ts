import { configure } from "mobx";
import { AppSettings } from "./appSettings";

configure({ enforceActions: "never" });

export class Store {
  public appSettings = new AppSettings();

  constructor() {}
}

export const store = new Store();
