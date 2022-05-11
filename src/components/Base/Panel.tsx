import withStyle from "@/frontend/hocs/withStyle";
import { Panel as BasePanel, PanelProps } from "@bigcommerce/big-design";
import { css } from "styled-components";
import { color } from "styled-system";

const defaultCss = () => css`
  border: none;
  border-width: 0;
  & label,
  h2 {
    ${color}
  }
`;

const Panel = withStyle<PanelProps>(BasePanel, {
  sub: "div",
  defaultCss
});
export default Panel;
