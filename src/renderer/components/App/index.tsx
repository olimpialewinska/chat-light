import * as React from "react";
import {
  ClearButton,
  SettingsIcon,
  StyledApp,
  StyledBody,
  StyledHeader,
  WindowControlButton,
  WindowControls,
  Wrapper,
} from "./style";
import { SETTINGS_ICON } from "@/renderer/constants/icons";
import { Chat } from "../Chat";
import { Settings } from "../Settings";
import { store } from "@/renderer/stores";
import { observer } from "mobx-react-lite";

export const App = observer(() => {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const handleClick = React.useCallback(() => {
    setIsSettingsOpen(!isSettingsOpen);
  }, [isSettingsOpen]);

  const handleControlButtonClicked = React.useCallback((action: string) => {
    window.electron.ipcRenderer.send(action);
  }, []);

  const handleChatClear = React.useCallback(() => {
    store.chatStore.clearChat();
  }, []);

  React.useEffect(() => {
    window.electron.ipcRenderer.on("set-theme", (event, theme) => {
      store.appSettings.setTheme(theme);
    });
    window.electron.ipcRenderer.on("set-autostart", (event, b) => {
      store.appSettings.setAutostart(b);
    });

    window.electron.ipcRenderer.on("set-color", (event, color) => {
      store.appSettings.setColor(color);
      console.log(color);
    });

    window.electron.ipcRenderer.send("get-theme");
    window.electron.ipcRenderer.send("get-color");
    window.electron.ipcRenderer.send("get-autostart");
  }, []);

  return (
    <StyledApp
      style={{
        backgroundColor:
          store.appSettings.currentappSettings["background-color"],
      }}
    >
      <StyledHeader
        style={{
          backgroundColor: store.appSettings.currentappSettings["nav-bg"],
        }}
      >
        <WindowControls>
          <WindowControlButton
            onClick={() => {
              handleControlButtonClicked("close-window");
            }}
            style={{
              backgroundColor: "#FF5F56",
            }}
            title="Close"
          />
          <WindowControlButton
            onClick={() => {
              handleControlButtonClicked("minimize-window");
            }}
            style={{
              backgroundColor: "#FFBD2E",
            }}
            title="Minimize"
          />
          <WindowControlButton
            onClick={(e: React.MouseEvent) => {
              handleControlButtonClicked(
                e.altKey ? "maximize-window" : "fullscreen-window"
              );
            }}
            style={{
              backgroundColor: "#27C93F",
            }}
            title="Maximize"
          />
        </WindowControls>
        <Wrapper>
          <ClearButton
            onClick={handleChatClear}
            style={{
              border:
                store.appSettings.currentappSettings.theme === "light"
                  ? `1px solid rgba(0, 0, 0, 0.25)`
                  : `1px solid rgba(255, 255,255, 0.5)`,
              color: store.appSettings.currentappSettings["text-color"],
              display: isSettingsOpen ? "none" : "flex",
            }}
          >
            {" "}
            Clear Chat
          </ClearButton>
          <SettingsIcon
            style={{
              backgroundImage: `url(${SETTINGS_ICON})`,
              filter: `invert(${
                store.appSettings.currentappSettings.theme === "light" ? 1 : 0
              })`,
            }}
            onClick={handleClick}
          />
        </Wrapper>
      </StyledHeader>
      <StyledBody>{isSettingsOpen ? <Settings /> : <Chat />}</StyledBody>
    </StyledApp>
  );
});
