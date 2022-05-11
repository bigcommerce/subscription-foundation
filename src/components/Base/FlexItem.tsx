import withStyle from "@/frontend/hocs/withStyle";
import {
  FlexItem as BaseFlexItem,
  FlexItemProps
} from "@bigcommerce/big-design";
import { css } from "styled-components";

const baseCss = () => css``;

export default withStyle<FlexItemProps>(BaseFlexItem, {
  sub: "div",
  baseCss
});
