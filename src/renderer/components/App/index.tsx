import * as React from "react";
import {
  SettingsIcon,
  StyledApp,
  StyledBody,
  StyledHeader,
  WindowControlButton,
  WindowControls,
} from "./style";
import { SETTINGS_ICON } from "@/renderer/constants/icons";
import { Chat } from "../Chat";
import { Settings } from "../Settings";

export function App() {
  const [isSettingsOpen, setIsSettingsOpen] = React.useState(false);

  const handleClick = React.useCallback(() => {
    setIsSettingsOpen(!isSettingsOpen);
  }, [isSettingsOpen]);

  const handleControlButtonClicked = React.useCallback((action: string) => {
    window.electron.ipcRenderer.send(action);
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
            onClick={() => {
              handleControlButtonClicked("maximize-window");
            }}
            style={{
              backgroundColor: "#27C93F",
            }}
            title="Maximize"
          />
        </WindowControls>
        <SettingsIcon
          style={{
            backgroundImage: `url(${SETTINGS_ICON})`,
          }}
          onClick={handleClick}
        />
      </StyledHeader>
      <StyledBody>{isSettingsOpen ? <Settings /> : <Chat />}</StyledBody>
    </StyledApp>
  );
}
