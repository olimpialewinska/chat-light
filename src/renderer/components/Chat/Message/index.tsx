import React from "react";
import { MessageContent, StyledMessage, Row } from "./style";
import { observer } from "mobx-react-lite";
import { IMessage } from "@/renderer/constants/interfaces/messageInterface";

interface MessageProps {
  message: IMessage;
  color: string | null;
}

export const Message = observer((props: MessageProps) => {
  return (
    <StyledMessage isSelf={props.message.isSelf}>
      <Row isSelf={props.message.isSelf}>
        <MessageContent
          style={{
            backgroundColor: props.message.isSelf
              ? props.color
                ? props.color
                : ""
              : "",
          }}
          isSelf={props.message.isSelf}
        >
          {props.message.text}
        </MessageContent>
      </Row>
    </StyledMessage>
  );
});
