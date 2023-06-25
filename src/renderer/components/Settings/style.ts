import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Switch = styled.div<{ isOn: boolean }>`
  display: inline-block;
  width: 50px;
  height: 30px;
  background-color: ${(props) => (props.isOn ? "#4CAF50" : "#ccc")};
  border-radius: 15px;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    width: 26px;
    height: 26px;
    border-radius: 50%;
    background-color: white;
    top: 2px;
    left: ${(props) => (props.isOn ? "calc(100% - 28px)" : "2px")};
    transition: left 0.2s;
  }
`;

export const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
`;
