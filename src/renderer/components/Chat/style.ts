import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: background-color 0.2s ease-in-out;
`;

export const ChatContainer = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: auto;
  transition: 0.2s background-color;
`;

export const ChatInput = styled.div`
  display: flex;
  flex-direction: row;
  padding: 0 14px;
  transition: background-color 0.2s ease-in-out;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 2px -3px 3px rgba(0, 0, 0, 0.1);
`;

export const Attachment = styled.div`
  border-radius: 50%;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  min-width: 24px;
  height: 24px;

  &:hover {
    opacity: 1;
  }
`;

export const MessageContainer = styled.div`
  flex: 1;
  background-color: rgba(255, 255, 255, 0.1);
  margin: 10px;
  color: rgb(255, 255, 255);
  padding: 8px;
  padding-left: 12px;
  border-radius: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export const MessageInput = styled.div`
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 16px;
  color: #fff;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;

  resize: none;
  &:focus {
    outline: none;
  }
`;

export const Send = styled.button`
  border-radius: 50%;
  background-size: 24px;
  background-repeat: no-repeat;
  background-position: center;
  filter: invert(1);
  cursor: pointer;
  opacity: 0.7;
  transition: 0.1s all;
  min-width: 24px;
  height: 24px;
  border: none;
  background-color: transparent;

  &:hover {
    opacity: 1;
  }
`;
