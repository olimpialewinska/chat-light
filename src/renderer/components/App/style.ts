import styled from "styled-components";

export const StyledApp = styled.div`
  background-color: #fff;
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;

export const StyledHeader = styled.div`
  -webkit-app-region: drag;
  background-color: #fff;
  height: 32px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

export const WindowControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const WindowControlButton = styled.div`
  -webkit-app-region: no-drag;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
  cursor: pointer;
  filter: brightness(1.1);
  transition: 0.2s all;

  &:hover {
    filter: brightness(1);
  }
`;

export const SettingsIcon = styled.div`
  -webkit-app-region: no-drag;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  opacity: 0.6;
  background-size: cover;
  background-position: center;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`;

export const StyledBody = styled.div`
  -webkit-app-region: no-drag;
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  height: 100%;
`;
