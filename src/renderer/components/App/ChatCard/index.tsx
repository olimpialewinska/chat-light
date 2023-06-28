import React, { useRef, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { store } from "@/renderer/stores";
import { ChatCard, Close, NewChat, Wrapper } from "./style";
import { ADD, CLOSE } from "@/renderer/constants/icons";

export const CardRow = observer(() => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrapperElement = wrapperRef.current;
    if (wrapperElement) {
      wrapperElement.scrollLeft = wrapperElement.scrollWidth;
    }
  }, [store.chatManager.chats, store.chatManager.chats.length]);

  return (
    <Wrapper ref={wrapperRef}>
      {store.chatManager.chats.length > 0 &&
        store.chatManager.chats.map((chat) => {
          return (
            <ChatCard
              key={chat.id}
              style={{
                color: store.appSettings.theme["text-color"],
                backgroundColor:
                  store.chatManager.currentChat?.id === chat.id
                    ? "rgba(255, 255, 255, 0.2)"
                    : "",
                paddingRight: store.chatManager.chats.length > 1 ? 8 : 10,
              }}
              onMouseDown={() => {
                store.chatManager.setCurrentChat(chat.id);
              }}
            >
              {chat.name}

              <Close
                style={{
                  backgroundImage: `url(${CLOSE})`,
                  filter: `invert(${
                    store.appSettings.theme.name === "light" ? 1 : 0
                  })`,
                  display: store.chatManager.chats.length > 1 ? "" : "none",
                }}
                onMouseDown={(e) => {
                  e.stopPropagation();
                }}
                onClick={() => store.chatManager.deleteChat(chat.id)}
              />
            </ChatCard>
          );
        })}

      <NewChat
        style={{
          backgroundImage: `url(${ADD})`,
          filter: `invert(${store.appSettings.theme.name === "light" ? 1 : 0})`,
        }}
        onClick={() => store.chatManager.addChat()}
      ></NewChat>
    </Wrapper>
  );
});
