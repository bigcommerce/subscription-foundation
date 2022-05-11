import { ProgressCircle } from "@bigcommerce/big-design";
import styled from "styled-components";

const OverlayDiv = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  background: grey;
  top: 0;
  right: 0;
  z-index: 100000;
  display: flex;
  align-items: center;
  justify-content: space-around;
  opacity: 0.55;
`;
export default function LoadingScreen(): JSX.Element {
  return (
    <OverlayDiv>
      <ProgressCircle size="large" />
    </OverlayDiv>
  );
}
