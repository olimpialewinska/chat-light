import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  flex-direction: row;
  overflow-x: auto;
  scrollbar-width: 0;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatCard = styled.div`
  min-width: 125px;
  -webkit-app-region: no-drag;
  justify-self: flex-start;
  align-self: flex-start;
  border-radius: 6px;
  padding: 0 10px;
  height: 28px;
  margin-right: 2px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  white-space: nowrap;
  font-size: 12px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background-color: rgba(255, 255, 255, 0.08);

  &:hover {
    background-color: rgba(255, 255, 255, 0.15);
  }
`;

export const Close = styled.button`
  border-radius: 50%;
  background-size: 12px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  min-width: 12px;
  height: 12px;
  border: none;
  background-color: transparent;
  margin-left: 10px;
  transition: 0.2s all;

  &:hover {
    opacity: 1;
  }
`;

export const NewChat = styled.div`
  min-width: 28px;
  height: 28px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
  -webkit-app-region: no-drag;
  justify-self: flex-start;
  border-radius: 6px;
  margin-right: 2px;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
