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

  return (
    <StyledApp>
      <StyledHeader>
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
                store.appSettings.theme.name === "light"
                  ? `1px solid rgba(0, 0, 0, 0.25)`
                  : `1px solid rgba(255, 255,255, 0.5)`,
              color: store.appSettings.theme["text-color"],
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
                store.appSettings.theme.name === "light" ? 1 : 0
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
