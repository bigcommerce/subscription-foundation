import withStyle from "@/frontend/hocs/withStyle";
import { Table, TableProps } from "@bigcommerce/big-design";
import { FlattenSimpleInterpolation } from "styled-components";

function StyledTable<ItemType>(
  baseCss: () => FlattenSimpleInterpolation = null
) {
  return withStyle<TableProps<ItemType>>(Table, {
    sub: "table",
    baseCss
  });
}
export default StyledTable;
