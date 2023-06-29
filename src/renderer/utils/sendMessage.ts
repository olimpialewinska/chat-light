import { url } from "../constants/url";
import { store } from "../stores";

export async function send(
  message: string,
  files: File[] | null,
  chatId: string
) {
  const data = new FormData();
  data.append("message", message);
  if (files) {
    files.forEach((file) => {
      data.append("file", file);
    });
  }

  try {
    const response = await fetch(`${url}/photo`, {
      method: "POST",
      body: data,
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
  }
}
