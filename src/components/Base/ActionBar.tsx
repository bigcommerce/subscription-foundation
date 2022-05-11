import React from "react";
import { Flex, FlexItem } from "@bigcommerce/big-design";
import styled from "styled-components";

const Footer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 50px;
  display: flex;
  border-top: 1px solid #d9dce9;
  padding: 0 5.5rem;
  background-color: #fff;
  flex-direction: row;

  button {
    margin-left: 1rem;
    margin-top: 0 !important;
  }

  @media (max-width: 1025px) {
    padding: 0 4rem;
  }

  @media (max-width: 720px) {
    padding: 0 3.5rem;

    div {
      margin-left: 1rem;
    }
  }
`;

export default function ActionBar({
  buttons
}: {
  buttons: Array<JSX.Element>;
}): JSX.Element {
  return (
    <Footer>
      <Flex flexDirection="row" alignItems="center" style={{ width: "100%" }}>
        <FlexItem key="flex_item_spacer" flexGrow={1}></FlexItem>
        {buttons.map(button => (
          <FlexItem key={button.key}>{button}</FlexItem>
        ))}
      </Flex>
    </Footer>
  );
}
