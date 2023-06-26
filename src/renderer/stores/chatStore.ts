import { makeObservable, observable } from "mobx";
import { IMessage } from "../constants/interfaces/messageInterface";

export class Chat {
  public chat: IMessage[] = [
    {
      text: "Welcome to the chat!",
      isSelf: false,
    },
  ];

  constructor() {
    makeObservable(this, {
      chat: observable,
    });
  }

  public addMessage(message: IMessage) {
    this.chat.push(message);
  }

  public clearChat() {
    this.chat = [];
  }
}
