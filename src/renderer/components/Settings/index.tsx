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
    setIsOn(store.appSettings.currentappSettings.theme === "dark");
    setIsOnAutostart(store.appSettings.autostart);
    setSelectedColor(store.appSettings.color);
  }, []);

  const getColorStyle = (color: string) => {
    const isLightTheme = store.appSettings.currentappSettings.theme === "light";
    const backgroundColor = {
      orange: isLightTheme ? "#ff7700" : "#ffa95d",
      red: isLightTheme ? "#ff0800" : "#fb6c67",
      pink: isLightTheme ? "#f001b4" : "#ff76dd",
      blue: isLightTheme ? "#1201ff" : "#678aff",
      purple: isLightTheme ? "#7901e2" : "#b25ffb",
      green: isLightTheme ? "#01c005" : "#2cff2f",
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
