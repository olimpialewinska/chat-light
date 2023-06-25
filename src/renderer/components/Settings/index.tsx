import { store } from "@/renderer/stores";
import { Container, Label, Row, Switch, Wrapper } from "./style";

import React, { useLayoutEffect, useState } from "react";

export function Settings() {
  const [isOn, setIsOn] = useState(false);
  const [isOnAutostart, setIsOnAutostart] = useState(false);

  const handleClick = () => {
    window.electron.ipcRenderer.send("save-theme", isOn ? "light" : "dark");
    store.appSettings.setTheme(isOn ? "light" : "dark");
    setIsOn(!isOn);
  };

  const handleClickAutostart = () => {
    window.electron.ipcRenderer.send("save-autostart", !isOnAutostart);
    store.appSettings.setAutostart(!isOnAutostart);
    setIsOnAutostart(!isOnAutostart);
  };

  useLayoutEffect(() => {
    store.appSettings.currentappSettings.theme === "dark"
      ? setIsOn(true)
      : setIsOn(false);
    store.appSettings.autostart === true
      ? setIsOnAutostart(true)
      : setIsOnAutostart(false);
  }, []);

  return (
    <Container
      style={{ color: store.appSettings.currentappSettings["text-color"] }}
    >
      <Wrapper>
        <Row>
          <Label>Dark Mode</Label>
          <Switch isOn={isOn} onClick={handleClick} />
        </Row>
        <Row>
          <Label>Autostart</Label>
          <Switch isOn={isOnAutostart} onClick={handleClickAutostart} />
        </Row>
      </Wrapper>
    </Container>
  );
}
