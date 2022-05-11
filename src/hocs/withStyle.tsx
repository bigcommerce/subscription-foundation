import React from "react";
import styled, { DefaultTheme, StyledComponent } from "styled-components";
import {
  BackgroundColorProps,
  BorderBottomProps,
  BorderLeftProps,
  BorderRightProps,
  BorderTopProps,
  FontFamilyProps,
  FontSizeProps,
  MaxHeightProps,
  MaxWidthProps,
  RightProps
} from "styled-system";
import { applyStyle } from "../styled/applyStyle";

export const Wrapper: StyledComponent<
  "div",
  DefaultTheme,
  React.CSSProperties & WrapperConfig,
  any
> = styled.div<StylesProps & WrapperConfig>`
  ${props => (props.baseCss ? props.baseCss(props) : "")}
  &>${props => props.sub || "div"} {
    ${applyStyle}
  }
`;
export default function withStyle<PropsType>(Component, config: WrapperConfig) {
  return function StyleWrapper(
    props: PropsType &
      MaxHeightProps &
      MaxWidthProps &
      BorderRightProps &
      BorderLeftProps &
      BorderTopProps &
      BorderBottomProps &
      BackgroundColorProps &
      FontSizeProps &
      FontFamilyProps &
      RightProps
  ): JSX.Element {
    return (
      <>
        <Wrapper {...(props as any)} {...config}>
          <Component {...props} />
        </Wrapper>
      </>
    );
  };
}
