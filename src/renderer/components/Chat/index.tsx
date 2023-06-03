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

export function Chat() {
  return (
    <Container>
      <ChatContainer></ChatContainer>

      <ChatInput>
        <Attachment
          style={{
            backgroundImage: `url(${ATTACHMENT_ICON})`,
          }}
        />
        <MessageContainer>
          <MessageInput placeholder="Type a message" />
        </MessageContainer>
        <Send
          style={{
            backgroundImage: `url(${SEND_ICON})`,
          }}
        />
      </ChatInput>
    </Container>
  );
}
