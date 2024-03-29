import styled from "styled-components";

export const StyledApp = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  transition: background-color 0.2s ease-in-out;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
`;

export const StyledHeader = styled.div`
  -webkit-app-region: drag;
  height: 36px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  transition: background-color 0.2s ease-in-out;
`;

export const WindowControls = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.1));
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

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;

export const ClearButton = styled.div`
  -webkit-app-region: no-drag;
  height: 20px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0 10px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  margin-right: 10px;
  opacity: 0.8;

  &:hover {
    opacity: 1;
  }
`;
