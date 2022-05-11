import React from "react";
import { Grid, GridItem, Input, Select } from "@bigcommerce/big-design";
import { DiscountUnitType } from "@/shared/enums/DiscountUnitType";
import SubscriptionOptionPayload from "@/shared/payloads/subscription/SubscriptionOptionPayload";

export default function Discount({
  option,
  setOption
}: {
  option: SubscriptionOptionPayload;
  setOption: (option: SubscriptionOptionPayload) => void;
}): JSX.Element {
  const discountTypeOptions = Object.keys(DiscountUnitType).map(v => {
    return {
      value: DiscountUnitType[v],
      content: v
    };
  });

  return (
    <Grid gridColumns="repeat(2, 1fr)">
      <GridItem>
        <Input
          type="number"
          placeholder="0"
          min={0}
          step={0.01}
          title="Currency"
          pattern="^\d+(?:\.\d{1,2})?$"
          value={option.discount}
          onChange={e => {
            setOption({
              ...option,
              discount: parseInt(e.target.value)
            });
          }}
        />
      </GridItem>
      <GridItem>
        <Select
          maxHeight={300}
          onOptionChange={e => {
            setOption({
              ...option,
              unit: e
            });
          }}
          options={discountTypeOptions}
          placement={"bottom-start"}
          required
          value={option.unit}
        />
      </GridItem>
    </Grid>
  );
}
