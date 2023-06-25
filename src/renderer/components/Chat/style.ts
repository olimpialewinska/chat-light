import styled from "styled-components";

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

export const ChatContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  align-items: center;
`;

export const ChatInput = styled.div`
  height: 50px;
  background-color: rgb(54, 54, 54);
  display: flex;
  flex-direction: row;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  padding: 0 10px;
  transition: background-color 0.2s ease-in-out;
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
  width: 24px;
  height: 24px;
  height: auto;

  &:hover {
    opacity: 1;
  }
`;

export const MessageContainer = styled.div`
  flex: 1;
  background-color: rgb(64, 64, 64);
  margin: 10px;
  color: rgb(255, 255, 255);
  padding: 16px;
  padding-right: 16px;
  border-radius: 24px;
  font-size: 14px;
  display: flex;
  align-items: center;
`;

export const MessageInput = styled.input`
  background-color: transparent;
  border: none;
  flex: 1;
  font-size: 16px;
  color: #fff;

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
  width: 24px;
  height: 24px;
  height: auto;
  border: none;
  background-color: transparent;

  &:hover {
    opacity: 1;
  }
`;
