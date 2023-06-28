import { makeObservable, observable } from "mobx";
import { v4 } from "uuid";
import { IMessage } from "../constants/interfaces/messageInterface";

interface Conversation {
  id: string;
  name: string;
  chat: IMessage[];
}

export class ChatManager {
  chats: Conversation[] = [
    {
      id: v4(),
      name: "New chat",
      chat: [
        {
          text: "Hello",
          isSelf: false,
        },
      ],
    },
  ];
  currentChat: Conversation | null = null;

  constructor() {
    makeObservable(this, {
      chats: observable,
      currentChat: observable,
    });
  }

  init() {
    this.currentChat = this.chats[0];
  }

  addChat() {
    const newChat = {
      id: v4(),
      name: "New chat",
      chat: [
        {
          text: "Hello",
          isSelf: false,
        },
      ],
    };
    this.chats.push(newChat);
    this.currentChat = newChat;
  }

  addMessage(message: IMessage, chatId: string) {
    const chat = this.chats.find((chat) => chat.id === chatId);
    if (chat) {
      chat.chat.push(message);
      chat.name = message.text.substring(0, 15) + "...";
      this.currentChat = chat;
    }
  }

  clearChat() {
    if (this.currentChat) {
      this.currentChat.chat = [];
      this.currentChat.name = "New chat";
    }
  }

  setCurrentChat(id: string) {
    const chat = this.chats.find((chat) => chat.id === id);
    if (chat) {
      this.currentChat = chat;
    }
  }

  deleteChat(id: string) {
    const chat = this.chats.find((chat) => chat.id === id);
    if (chat) {
      const index = this.chats.indexOf(chat);
      this.chats.splice(index, 1);
      if (this.currentChat?.id === chat.id) {
        if (index === 0) {
          this.currentChat = this.chats[0];
          return;
        }
        this.currentChat = this.chats[index - 1];
      }
    }
  }
}
