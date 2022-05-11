import { Radio as BaseRadio, RadioProps } from "@bigcommerce/big-design";
import { css } from "styled-components";
import withStyle from "../../hocs/withStyle";

const defaultCss = (props: StylesProps) => css`
  label {
    font-size: ${props.fontSize};
  }
`;
export default withStyle<RadioProps>(BaseRadio, {
  sub: "div",
  defaultCss
});
