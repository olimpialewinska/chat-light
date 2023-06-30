import { IMessage } from "../constants/interfaces/messageInterface";
import { url } from "../constants/url";
import { store } from "../stores";

export async function send(
  message: string,
  files: File[] | null,
  chatId: string
) {
  const formData = new FormData();
  formData.append("message", message);
  const messages = store.chatManager.currentChat?.chat.map((message) => ({
    role: message.isSelf ? "user" : "assistant",
    content: message.text,
  }));
  formData.append("messages", JSON.stringify(messages));
  if (files) {
    files.forEach((file) => {
      formData.append("files", file, file.name);
    });
  }
  try {
    const response = await fetch(`${url}/askGpt`, {
      method: "POST",
      body: formData,
    });
    const res = await response.text();
    store.chatManager.addMessage(
      { text: res, isSelf: false, image: null },
      chatId
    );
    store.chatManager.setLoading(chatId, false);
  } catch (e) {
    store.chatManager.addMessage(
      { text: "Unexpected error occurred", isSelf: false, image: null },
      chatId
    );
    store.chatManager.setLoading(chatId, false);
  }
}
