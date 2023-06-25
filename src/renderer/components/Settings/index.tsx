import { store } from "@/renderer/stores";
import { Container, Row, Switch } from "./style";

import React, { useLayoutEffect, useState } from "react";

export function Settings() {
  const [isOn, setIsOn] = useState(false);

  const handleClick = () => {
    window.electron.ipcRenderer.send("save-theme", isOn ? "light" : "dark");
    store.themeStore.setTheme(isOn ? "light" : "dark");
    setIsOn(!isOn);
  };

  useLayoutEffect(() => {
    store.themeStore.currentThemeStore.theme === "dark"
      ? setIsOn(true)
      : setIsOn(false);
  }, []);

  return (
    <Container
      style={{ color: store.themeStore.currentThemeStore["text-color"] }}
    >
      <Row>
        <p>turn on dark mode</p>
        <Switch isOn={isOn} onClick={handleClick} />
      </Row>
    </Container>
  );
}
