import withStyle from "@/frontend/hocs/withStyle";
import { Input, InputProps } from "@bigcommerce/big-design";
import { FlattenSimpleInterpolation } from "styled-components";

const StyledInput = (baseCss: () => FlattenSimpleInterpolation = null) =>
  withStyle<InputProps>(Input, {
    sub: "input",
    baseCss
  });
export default StyledInput;
