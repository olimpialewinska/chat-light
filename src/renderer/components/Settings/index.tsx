import { store } from "@/renderer/stores";
import { Container, Row, Switch } from "./style";

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
      <Row>
        <p>turn on dark mode</p>
        <Switch isOn={isOn} onClick={handleClick} />
      </Row>
      <Row>
        <p>Autostart</p>
        <Switch isOn={isOnAutostart} onClick={handleClickAutostart} />
      </Row>
    </Container>
  );
}
