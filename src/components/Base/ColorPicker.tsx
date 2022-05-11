import { applyStyle } from "@/frontend/styled/applyStyle";
import {
  Box,
  Flex,
  FlexItem,
  Input,
  InputProps
} from "@bigcommerce/big-design";
import React, { useRef } from "react";
import styled from "styled-components";
const StyledBox = styled(Box)`
  box-sizing: content-box;
  min-height: 2.25rem;
  min-width: 2.25rem;
  border-radius: 0.2rem;
  margin-bottom: 17px;
  margin-left: 0.2rem;
  margin-right: 0.5rem;
  background-color: #ffffff;
  border: 1px solid #d9dce9;
  ${applyStyle}
`;

export default function ColorPicker(
  props: InputProps & { value: string }
): JSX.Element {
  const inputRef = useRef<HTMLInputElement>(null);
  const openColorPicker = () => inputRef.current.click();

  return (
    <>
      <Flex flexDirection="row" alignItems="flex-end">
        <FlexItem>
          <Input
            {...props}
            onFocus={openColorPicker}
            onClick={openColorPicker}
          ></Input>
          <input
            value={props.value}
            onChange={props.onChange}
            type="color"
            ref={inputRef}
            style={{
              position: "relative",
              zIndex: -100,
              height: 0,
              padding: 0,
              border: "none"
            }}
          ></input>
        </FlexItem>
        <FlexItem>
          <StyledBox
            onClick={openColorPicker}
            background={props.value}
          ></StyledBox>
        </FlexItem>
      </Flex>
    </>
  );
}
