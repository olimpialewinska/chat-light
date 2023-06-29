import React from "react";
import { MessageContent, StyledMessage, Row, Image } from "./style";
import { observer } from "mobx-react-lite";
import { IMessage } from "@/renderer/constants/interfaces/messageInterface";
import { store } from "@/renderer/stores";

interface MessageProps {
  message: IMessage;
}

const getColorStyle = (color: string) => {
  const backgroundColor = {
    orange: "#ffa95d",
    red: "#fb6c67",
    pink: "#ff76dd",
    blue: "#678aff",
    purple: "#b25ffb",
    green: "#77ff79",
  }[color];

  return backgroundColor;
};

export const Message = observer((props: MessageProps) => {
  const messageColor = getColorStyle(store.appSettings.color);

  return (
    <StyledMessage isSelf={props.message.isSelf}>
      <Row isSelf={props.message.isSelf}>
        {props.message.image !== null ? (
          <Image
            style={{
              backgroundImage: `url(${props.message.image})`,
            }}
          />
        ) : (
          <MessageContent
            style={{
              backgroundColor: props.message.isSelf
                ? messageColor
                : "rgba(0, 0, 0, 0.1)",
              color: props.message.isSelf
                ? "#000"
                : store.appSettings.theme.name === "light"
                ? "#000"
                : "#fff",
            }}
            isSelf={props.message.isSelf}
          >
            {props.message.text}
          </MessageContent>
        )}
      </Row>
    </StyledMessage>
  );
});
