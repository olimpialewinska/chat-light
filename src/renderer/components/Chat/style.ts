import styled, { keyframes } from "styled-components";

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

export const Error = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  color: #fff;
  padding: 10px;
  border-radius: 10px;
  margin: 10px;
  font-size: 12px;
  font-weight: 400;
  position: absolute;
  z-index: 999;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.2s opacity;
`;

const animloader = keyframes`
  0% {
    box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
  }
  25% {
    box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 2px;
  }
  50% {
    box-shadow: 14px 0 0 -2px,  38px 0 0 -2px,  -14px 0 0 2px,  -38px 0 0 -2px;
  }
  75% {
    box-shadow: 14px 0 0 2px,  38px 0 0 -2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
  }
  100% {
    box-shadow: 14px 0 0 -2px,  38px 0 0 2px,  -14px 0 0 -2px,  -38px 0 0 -2px;
  }
`;

export const Loader = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  margin: 10px 50px;
  position: relative;
  justify-self: flex-start;
  align-self: flex-start;
  color: #fff;
  box-sizing: border-box;
  animation: ${animloader} 2s linear infinite;
`;

export const FileRow = styled.div`
  flex: 1;
  max-height: 100px !important;
  display: flex;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.1);
  overflow-x: auto;
  overflow-y: hidden;
  position: relative;
  scrollbar-width: 0;
  padding: 10px 20px;
  justify-content: flex-start;
  align-items: center;
  scrollbar-color: transparent transparent;
`;

export const Image = styled.div`
  min-width: 100px;
  min-height: 100px;
  border-radius: 10px;
  margin-right: 10px;
  background-color: rgba(255, 255, 255, 0.1);
  background-image: none;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    opacity: 0.8;
  }
`;
