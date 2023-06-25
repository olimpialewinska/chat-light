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

export const Chat = observer(() => {
  return (
    <Container
      style={{
        color: store.appSettings.currentappSettings["text-color"],
      }}
    >
      <ChatContainer></ChatContainer>

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
          />
        </MessageContainer>
        <Send
          style={{
            backgroundImage: `url(${SEND_ICON})`,
            filter: `invert(${
              store.appSettings.currentappSettings.theme === "light" ? 0 : 1
            })`,
          }}
        />
      </ChatInput>
    </Container>
  );
});
