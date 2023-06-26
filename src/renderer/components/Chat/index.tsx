import * as React from "react";
import {
  Container,
  ChatContainer,
  Attachment,
  ChatInput,
  MessageContainer,
  MessageInput,
  Send,
} from "./style";
import { ATTACHMENT_ICON, SEND_ICON } from "@/renderer/constants/icons";
import { store } from "@/renderer/stores";
import { observer } from "mobx-react-lite";
import { Message } from "./Message";

export const Chat = observer(() => {
  const [message, setMessage] = React.useState<string>("");
  const sendMessage = React.useCallback(() => {
    if (message.trim() === "") return;
    store.chatStore.addMessage({ text: message, isSelf: true });
    setMessage("");
  }, [message]);

  return (
    <Container
      style={{
        color: store.appSettings.currentappSettings["text-color"],
      }}
    >
      <ChatContainer>
        {store.chatStore.chat.map((message, index) => (
          <Message key={index} message={message} color={"red"} />
        ))}
      </ChatContainer>

      <ChatInput
        style={{
          backgroundColor:
            store.appSettings.currentappSettings["input-container-bg"],
        }}
      >
        <Attachment
          style={{
            backgroundImage: `url(${ATTACHMENT_ICON})`,
            filter: `invert(${
              store.appSettings.currentappSettings.theme === "light" ? 0 : 1
            })`,
          }}
        />
        <MessageContainer
          style={{
            backgroundColor: store.appSettings.currentappSettings["input-bg"],
          }}
        >
          <MessageInput
            placeholder="Type a message"
            style={{
              color: store.appSettings.currentappSettings["text-color"],
            }}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </MessageContainer>
        <Send
          style={{
            backgroundImage: `url(${SEND_ICON})`,
            filter: `invert(${
              store.appSettings.currentappSettings.theme === "light" ? 0 : 1
            })`,
          }}
          onClick={sendMessage}
        />
      </ChatInput>
    </Container>
  );
});
