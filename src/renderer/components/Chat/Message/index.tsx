import React from "react";
import { MessageContent, StyledMessage, Row } from "./style";
import { observer } from "mobx-react-lite";
import { IMessage } from "@/renderer/constants/interfaces/messageInterface";
import { store } from "@/renderer/stores";

interface MessageProps {
  message: IMessage;
}

export const Message = observer((props: MessageProps) => {
  return (
    <StyledMessage isSelf={props.message.isSelf}>
      <Row isSelf={props.message.isSelf}>
        <MessageContent
          style={{
            backgroundColor: props.message.isSelf
              ? store.appSettings.color
              : "rgba(0, 0, 0, 0.1)",
            color: store.appSettings.theme.name === "light" ? "#000" : "#fff",
          }}
          isSelf={props.message.isSelf}
        >
          {props.message.text}
        </MessageContent>
      </Row>
    </StyledMessage>
  );
});
