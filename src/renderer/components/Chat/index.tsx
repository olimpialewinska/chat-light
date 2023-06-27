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
import { send } from "@/renderer/utils/sendMessage";
import { observe } from "mobx";

export const Chat = observer(() => {
  const [message, setMessage] = React.useState<string>("");
  const [selectedfiles, setSelectedFiles] = React.useState<File[] | null>(null);
  const chatContentRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const messageInputRef = React.useRef<HTMLDivElement>(null);

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        setSelectedFiles(Array.from(files));
      }
    },
    []
  );

  React.useEffect(() => {
    observe(store.chatStore.chat, () => {
      requestAnimationFrame(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }
      });
    });
  }, []);

  const handleAttachmentClick = React.useCallback(() => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  }, []);

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files;
    setSelectedFiles(selectedfiles ? [...selectedfiles, ...file] : [...file]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const sendMessage = React.useCallback(async () => {
    const message = (messageInputRef.current?.innerText ?? "").trim();
    requestAnimationFrame(() => {
      messageInputRef.current!.innerHTML = "";
    });

    if (message === "" && !selectedfiles) {
      return;
    }

    if (message !== "") {
      const messageData = {
        text: message,
        isSelf: true,
      };

      store.chatStore.addMessage(messageData);
    }

    if (selectedfiles) {
      selectedfiles.forEach((file) => {
        store.chatStore.addMessage({
          text: file.name,
          isSelf: true,
        });
      });
    }

    const data = await send(message, selectedfiles);
    if (data) {
      store.chatStore.addMessage({
        text: data,
        isSelf: false,
      });
    }
    setSelectedFiles(null);
  }, [message, selectedfiles]);

  const onInputKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && e.shiftKey) {
        return;
      }
      if (e.key === "Enter") {
        sendMessage();
      }
    },
    [sendMessage]
  );

  return (
    <Container
      style={{
        color: store.appSettings.theme["text-color"],
      }}
      onDrop={(e) => handleDrop(e)}
      onDragOver={(e) => handleDragOver(e)}
    >
      <ChatContainer ref={chatContentRef}>
        {store.chatStore.chat.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </ChatContainer>
      {selectedfiles && (
        <div>
          {selectedfiles.map((file, index) => (
            <div key={index}>{file.name}</div>
          ))}
        </div>
      )}

      <ChatInput>
        <Attachment
          onClick={handleAttachmentClick}
          style={{
            backgroundImage: `url(${ATTACHMENT_ICON})`,
            filter: `invert(${
              store.appSettings.theme.name === "light" ? 0 : 1
            })`,
          }}
        >
          <input
            type="file"
            ref={inputRef}
            style={{ display: "none" }}
            onChange={(e) => {
              handleFileChange(e);
            }}
            multiple
            accept="image/*"
          />
        </Attachment>
        <MessageContainer>
          <MessageInput
            placeholder="Type a message"
            style={{
              color: store.appSettings.theme["text-color"],
            }}
            ref={messageInputRef}
            contentEditable
            onKeyDown={onInputKeyDown}
          ></MessageInput>
        </MessageContainer>
        <Send
          style={{
            backgroundImage: `url(${SEND_ICON})`,
            filter: `invert(${
              store.appSettings.theme.name === "light" ? 0 : 1
            })`,
          }}
          onClick={sendMessage}
        />
      </ChatInput>
    </Container>
  );
});
