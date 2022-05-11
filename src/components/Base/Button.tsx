import { getLightenDarkenColor } from "@/frontend/utils/get-lighten-darken-color";
import { Button as BaseButton, ButtonProps } from "@bigcommerce/big-design";
import { css } from "styled-components";
import withStyle from "../../hocs/withStyle";

const defaultCss = (props: StylesProps) => css`
  border: none;
  border-width: 0;
  &:hover {
    background-color: ${props.backgroundColor
      ? getLightenDarkenColor(props.backgroundColor, 40) + "!important"
      : ""};
  }
`;
export default withStyle<ButtonProps>(BaseButton, {
  sub: "button",
  defaultCss
});
