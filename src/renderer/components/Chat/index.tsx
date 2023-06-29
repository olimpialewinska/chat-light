import * as React from "react";
import {
  Container,
  ChatContainer,
  Attachment,
  ChatInput,
  MessageContainer,
  MessageInput,
  Send,
  Error,
  Loader,
  FileRow,
  Image,
} from "./style";
import { ATTACHMENT_ICON, SEND_ICON } from "@/renderer/constants/icons";
import { store } from "@/renderer/stores";
import { observer } from "mobx-react-lite";
import { Message } from "./Message";
import { send } from "@/renderer/utils/sendMessage";
import { observe, set } from "mobx";

export const Chat = observer(() => {
  const [selectedfiles, setSelectedFiles] = React.useState<File[] | null>(null);
  const chatContentRef = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const messageInputRef = React.useRef<HTMLDivElement>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [errorVisible, setErrorVisible] = React.useState(false);

  const handleFileChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files;
      if (files) {
        setSelectedFiles(Array.from(files));
      }
    },
    []
  );

  const deleteFile = React.useCallback(
    (index: number) => {
      if (selectedfiles) {
        const newFiles = [...selectedfiles];
        newFiles.splice(index, 1);
        setSelectedFiles(newFiles.length > 0 ? newFiles : null);
      }
    },
    [selectedfiles]
  );

  React.useLayoutEffect(() => {
    setSelectedFiles(null);
    requestAnimationFrame(() => {
      messageInputRef.current!.innerHTML = "";

      if (chatContentRef.current) {
        chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
      }
    });
  }, [store.chatManager.currentChat]);

  React.useEffect(() => {
    observe(store.chatManager.currentChat!, () => {
      requestAnimationFrame(() => {
        if (chatContentRef.current) {
          chatContentRef.current.scrollTop =
            chatContentRef.current.scrollHeight;
        }
      });
    });
  }, [store.chatManager.currentChat, store.chatManager.currentChat?.chat]);

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

  const errorFunction = React.useCallback((message: string) => {
    setErrorVisible(true);
    setError(message);
    setTimeout(() => {
      setErrorVisible(false);
    }, 3000);
  }, []);

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const sendMessage = React.useCallback(async () => {
    const message = (messageInputRef.current?.innerText ?? "").trim();

    if (
      store.chatManager.checkIfChatIsLoading(store.chatManager.currentChat?.id!)
    ) {
      errorFunction("A request is already in progress. Please wait.");
      return;
    }

    requestAnimationFrame(() => {
      messageInputRef.current!.innerHTML = "";
    });

    if (message === "" && !selectedfiles) {
      return;
    }
    store.chatManager.setLoading(store.chatManager.currentChat?.id!, true);

    if (message !== "") {
      const messageData = {
        text: message,
        isSelf: true,
        image: null,
      };

      store.chatManager.addMessage(
        messageData,
        store.chatManager.currentChat?.id!
      );
    }

    if (selectedfiles) {
      selectedfiles.forEach((file) => {
        store.chatManager.addMessage(
          {
            text: file.name,
            isSelf: true,
            image: URL.createObjectURL(file),
          },
          store.chatManager.currentChat?.id!
        );
      });
    }

    setSelectedFiles(null);
    const data = await send(
      message,
      selectedfiles,
      store.chatManager.currentChat?.id!
    );
  }, [messageInputRef.current?.innerText, selectedfiles, store.chatManager]);

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
      <Error
        style={{
          opacity: errorVisible ? 1 : 0,
          pointerEvents: errorVisible ? "inherit" : "none",
        }}
      >
        {error}
      </Error>
      <ChatContainer ref={chatContentRef}>
        {store.chatManager.currentChat?.chat.map((message, index) => (
          <Message key={index} message={message} />
        ))}
        {store.chatManager.currentChat?.isLoading && (
          <div
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.1)",
              borderRadius: 20,
              padding: 4,
              width: 108,
              marginLeft: 10,
            }}
          >
            <Loader />
          </div>
        )}
      </ChatContainer>
      {selectedfiles && (
        <FileRow>
          {selectedfiles.map((file, index) => (
            <Image
              key={index}
              style={{
                backgroundImage: `url(${URL.createObjectURL(file)})`,
              }}
              onClick={() => deleteFile(index)}
            />
          ))}
        </FileRow>
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
