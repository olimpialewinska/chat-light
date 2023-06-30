import { store } from "@/renderer/stores";
import React, { useCallback, useLayoutEffect, useState } from "react";
import { Box, Color, Container, Label, Row, Switch, Wrapper } from "./style";

export function Settings() {
  const [isOn, setIsOn] = useState(false);
  const [isOnAutostart, setIsOnAutostart] = useState(false);
  const [selectedColor, setSelectedColor] = useState("");

  const handleClick = () => {
    const theme = isOn ? "light" : "dark";
    window.electron.ipcRenderer.send("save-theme", theme);
    store.appSettings.setTheme(theme);
    setIsOn(!isOn);
  };

  const handleClickAutostart = () => {
    const autostart = !isOnAutostart;
    window.electron.ipcRenderer.send("save-autostart", autostart);
    store.appSettings.setAutostart(autostart);
    setIsOnAutostart(!isOnAutostart);
  };

  const handleColorClick = useCallback((color: string) => {
    window.electron.ipcRenderer.send("save-color", color);
    store.appSettings.setColor(color);
    setSelectedColor(color);
  }, []);

  useLayoutEffect(() => {
    setIsOn(store.appSettings.theme.name === "dark");
    setIsOnAutostart(store.appSettings.autostart);
    setSelectedColor(store.appSettings.color);
  }, []);

  const getColorStyle = (color: string) => {
    const backgroundColor = {
      orange: "rgba(255, 169, 93, 0.5)",
      red: "rgba(251, 108, 103, 0.5)",
      pink: "rgba(255, 118, 221, 0.5)",
      blue: "rgba(103, 138, 255, 0.5)",
      purple: "rgba(178, 95, 255, 0.5)",
      green: "rgba(119, 255, 121, 0.5)",
    }[color];
    const border = selectedColor === color ? "1px solid" : "none";
    return { backgroundColor, border };
  };

  const renderColor = (color: string) => (
    <Color
      key={color}
      onClick={() => handleColorClick(color)}
      style={getColorStyle(color)}
    />
  );

  return (
    <Container style={{ color: store.appSettings.theme["text-color"] }}>
      <Wrapper>
        <Row>
          <Label>Dark Mode</Label>
          <Switch isOn={isOn} onClick={handleClick} />
        </Row>
        <Row>
          <Label>Autostart</Label>
          <Switch isOn={isOnAutostart} onClick={handleClickAutostart} />
        </Row>
        <Row>
          <Label>Chat Colors</Label>
          <Box>
            {renderColor("orange")}
            {renderColor("red")}
            {renderColor("pink")}
            {renderColor("blue")}
            {renderColor("purple")}
            {renderColor("green")}
          </Box>
        </Row>
      </Wrapper>
    </Container>
  );
}
