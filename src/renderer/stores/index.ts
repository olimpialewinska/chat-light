import { configure } from "mobx";
import { AppSettings } from "./appSettings";
import { Chat } from "./chatStore";

configure({ enforceActions: "never" });

export class Store {
  public appSettings = new AppSettings();
  public chatStore = new Chat();

  constructor() {}
}

export const store = new Store();
