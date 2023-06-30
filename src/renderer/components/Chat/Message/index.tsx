import React from "react";
import { MessageContent, StyledMessage, Row, Image } from "./style";
import { observer } from "mobx-react-lite";
import { IMessage } from "@/renderer/constants/interfaces/messageInterface";
import { store } from "@/renderer/stores";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  message: IMessage;
}

const getColorStyle = (color: string) => {
  const backgroundColor = {
    orange: "rgba(255, 169, 93, 0.5)",
    red: "rgba(251, 108, 103, 0.5)",
    pink: "rgba(255, 118, 221, 0.5)",
    blue: "rgba(103, 138, 255, 0.5)",
    purple: "rgba(178, 95, 255, 0.5)",
    green: "rgba(119, 255, 121, 0.5)",
  }[color];

  return backgroundColor;
};

export const Message = observer((props: MessageProps) => {
  const messageColor = getColorStyle(store.appSettings.color);

  const markdownExtractor = () => {
    const hasTags = props.message.text.includes("```");
    if (hasTags) {
      const result = props.message.text.split("```").map((str, index) => {
        if (index % 2 === 1) {
          return (
            <div
              style={{
                backgroundColor: "rgba(0,0,0, 0.3)",
                padding: 10,
                borderRadius: 20,
              }}
            >
              <ReactMarkdown key={index} children={str} />
            </div>
          );
        }
        return str;
      });

      return result;
    }
    return props.message.text;
  };

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
              color: store.appSettings.theme.name === "light" ? "#000" : "#fff",
            }}
            isSelf={props.message.isSelf}
          >
            {markdownExtractor()}
          </MessageContent>
        )}
      </Row>
    </StyledMessage>
  );
});
