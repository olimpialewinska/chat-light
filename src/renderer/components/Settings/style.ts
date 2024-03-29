import styled from "styled-components";

export const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: background-color 0.2s ease-in-out;
`;

export const Switch = styled.div<{ isOn: boolean }>`
  display: inline-block;
  width: 40px;
  height: 24px;
  background-color: ${(props) => (props.isOn ? "#4CAF50" : "#ccc")};
  border-radius: 12px;
  position: relative;
  cursor: pointer;

  &:after {
    content: "";
    position: absolute;
    width: 22px;
    height: 22px;
    border-radius: 50%;
    background-color: white;
    top: 1px;
    left: ${(props) => (props.isOn ? "calc(100% - 23px)" : "1px")};
    transition: left 0.2s;
  }
`;

export const Wrapper = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const Row = styled.div`
  width: 500px;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 8px;
  justify-content: space-between;
  padding: 10px 20px;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease-in-out;
  position: relative;
  z-index: 0;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }

  @media (max-width: 600px) {
    width: 50%;
  }
  &:after {
    background-color: "transparent";
  }
`;

export const Label = styled.div`
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
`;

export const Color = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-left: 10px;
  z-index: 2;
  cursor: pointer;
  transition: 0.2s all;

  &:hover {
    transform: scale(1.1);
  }
`;

export const Box = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;
