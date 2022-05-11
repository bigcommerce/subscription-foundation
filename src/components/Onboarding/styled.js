import styled from "styled-components";

const PanelHeader = styled.header`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 1rem;

  h2 {
    margin-bottom: 0;
  }

  img {
    margin-right: 1rem;
    width: 10em;
    height: auto;
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  margin-bottom: 1rem;
  li svg {
    margin-right: 0.5rem;
  }
`;

const Step = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  max-width: 75px;
  margin-top: -0.75rem;

  svg {
    margin-bottom: 0.5rem;
  }

  @media (max-width: 768px) {
    white-space: initial;
  }
`;

const StepDivider = styled.div`
  height: 0;
  border: 1px solid #d9dce9;
  width: 100px;

  @media (max-width: 768px) {
    width: 25px;
  }
`;

const CompletedStepDivider = styled.div`
  height: 0;
  border: 1px solid rgb(40, 82, 235);
  width: 100px;

  @media (max-width: 768px) {
    width: 25px;
  }
`;

const NumberCircle = styled.div`
  border-radius: 50%;
  width: 9px;
  height: 9px;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  line-height: 9px;

  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  color: #ffffff;
  background: #b4bad1;
`;
const CompletedNumberCircle = styled.div`
  border-radius: 50%;
  width: 9px;
  height: 9px;
  padding: 8px;
  text-align: center;
  vertical-align: middle;
  line-height: 9px;

  font-family: Source Sans Pro;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;

  color: #ffffff;
  background: rgb(40, 82, 235);
`;

export {
  List,
  Step,
  StepDivider,
  CompletedStepDivider,
  PanelHeader,
  NumberCircle,
  CompletedNumberCircle
};
