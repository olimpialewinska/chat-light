import styled from "styled-components";

export const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  scrollbar-width: 0;
  scrollbar-color: transparent transparent;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ChatCard = styled.div`
  -webkit-app-region: no-drag;
  justify-self: flex-start;
  align-self: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  padding: 5px 10px 5px 10px;
  margin-top: 2px;
  margin-right: 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;
  font-size: 12px;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
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
  min-width: 25px;
  height: 24px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: 16px;
  -webkit-app-region: no-drag;
  justify-self: flex-start;
  align-self: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-bottom: none;
  border-radius: 10px 10px 0 0;
  margin-top: 2px;
  margin-right: 2px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
