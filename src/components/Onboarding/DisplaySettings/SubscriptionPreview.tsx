import { DiscountUnitType } from "@/shared/enums/DiscountUnitType";
import { FrequencyType } from "@/shared/enums/FrequencyType";
import { DisplaySettingPayload } from "@/shared/payloads/DisplaySettingPayload";
import SubscriptionOptionPayload from "@/shared/payloads/subscription/SubscriptionOptionPayload";
import React from "react";
import SubscriptionWidget from "../../Subscription/Widget";

export default function SubscriptionPreview(props: {
  config: DisplaySettingPayload;
}): JSX.Element {
  const options: SubscriptionOptionPayload[] = [
    {
      id: "123",
      frequency: 1,
      discount: 20,
      type: FrequencyType.Months,
      unit: DiscountUnitType.Percent
    },
    {
      id: "124",
      frequency: 3,
      discount: 15,
      type: FrequencyType.Months,
      unit: DiscountUnitType["US Dollars"]
    },
    {
      id: "125",
      frequency: 6,
      discount: 10,
      type: FrequencyType.Months,
      unit: DiscountUnitType.Percent
    }
  ];
  return (
    <>
      <SubscriptionWidget options={options} displaySettings={props.config} />
    </>
  );
}
