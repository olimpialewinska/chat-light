import styled, { css } from "styled-components";

interface BaseMessageProps {
  isSelf: boolean;
}

export const StyledMessage = styled.div<BaseMessageProps>`
  display: flex;
  flex-direction: column;
  margin: 10px;
  align-items: flex-start;
  position: relative;

  ${(props) =>
    props.isSelf &&
    css`
      align-self: flex-end;
    `}
`;

export const Row = styled.div<BaseMessageProps>`
  display: flex;
  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.isSelf &&
    css`
      flex-direction: row-reverse;
      align-items: center;
    `}
`;

export const Nick = styled.div`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  margin-top: 2px;
  margin-bottom: 2px;
`;

export const MessageContent = styled.div<BaseMessageProps>`
  border-radius: 20px;
  padding: 10px;

  white-space: pre-wrap;

  ${(props) =>
    props.isSelf &&
    css`
      color: rgb(255, 255, 255);
      align-self: flex-end;
      flex-direction: row-reverse;
    `}
`;

export const Content = styled.div`
  padding: 4px 10px;
  white-space: nowrap;
  border-radius: 4px;
  font-size: 14px;
  margin: 0 2px;
  cursor: pointer;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
`;
