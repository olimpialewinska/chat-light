import { configure } from "mobx";
import { AppSettings } from "./appSettings";
import { ChatManager } from "./chatManager";

configure({ enforceActions: "never" });

export class Store {
  public appSettings = new AppSettings();
  public chatManager = new ChatManager();

  constructor() {
    this.appSettings.init();
    this.chatManager.init();
  }
}

export const store = new Store();
