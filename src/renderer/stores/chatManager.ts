import { makeObservable, observable } from "mobx";
import { v4 } from "uuid";
import { IMessage } from "../constants/interfaces/messageInterface";

interface Conversation {
  id: string;
  name: string;
  chat: IMessage[];
  isLoading: boolean;
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
          image: null,
        },
      ],
      isLoading: false,
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
          image: null,
        },
      ],
      isLoading: false,
    };
    this.chats.push(newChat);
    this.currentChat = newChat;
  }

  addMessage(message: IMessage, chatId: string) {
    const chat = this.chats.find((chat) => chat.id === chatId);
    if (chat) {
      chat.chat.push(message);
      chat.name = message.image
        ? "Image"
        : message.text.length >= 15
        ? message.text.substring(0, 15) + "..."
        : message.text;
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

  setLoading(id: string, isLoading: boolean) {
    const chat = this.chats.find((chat) => chat.id === id);
    if (chat) {
      chat.isLoading = isLoading;
    }
  }

  checkIfChatIsLoading(chatId: string) {
    const chat = this.chats.find(
      (chat) => chat.id === chatId && chat.isLoading
    );

    if (chat) {
      return true;
    }

    return false;
  }
}
