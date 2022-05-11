import React from "react";
import { Grid, GridItem, Select } from "@bigcommerce/big-design";
import { FrequencyType } from "@/shared/enums/FrequencyType";
import SubscriptionOptionPayload from "@/shared/payloads/subscription/SubscriptionOptionPayload";
import { useTranslations } from "next-intl";

export default function RuleCondition({
  option,
  setOption
}: {
  option: SubscriptionOptionPayload;
  setOption: (option: SubscriptionOptionPayload) => void;
}): JSX.Element {
  const t = useTranslations("RuleConditions");
  const everyOptions = [1, 3, 6].map(num => {
    return {
      value: num,
      content: t("every", { num: num })
    };
  });

  const timeUnitOptions = Object.keys(FrequencyType).map(v => {
    return {
      value: FrequencyType[v],
      content: v
    };
  });

  return (
    <Grid gridColumns="repeat(2, 1fr)">
      <GridItem>
        <Select
          maxHeight={300}
          onOptionChange={x =>
            setOption({
              ...option,
              frequency: x
            })
          }
          options={everyOptions}
          placement={"bottom-start"}
          required
          value={option.frequency}
        />
      </GridItem>
      <GridItem>
        <Select
          maxHeight={300}
          onOptionChange={x =>
            setOption({
              ...option,
              type: x
            })
          }
          options={timeUnitOptions}
          placement={"bottom-start"}
          required
          value={option.type}
        />
      </GridItem>
    </Grid>
  );
}
