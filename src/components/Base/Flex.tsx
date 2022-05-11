import withStyle from "@/frontend/hocs/withStyle";
import { Flex as BaseFlex, FlexProps } from "@bigcommerce/big-design";
import { css } from "styled-components";

const baseCss = () => css``;

export default withStyle<FlexProps>(BaseFlex, {
  sub: "div",
  baseCss
});
