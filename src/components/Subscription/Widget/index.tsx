import React, { useState } from "react";
import { H2, Small } from "@bigcommerce/big-design";
import CenterDiv from "../../Base/CenterDiv";
import SubscriptionButton from "./Button";
import Panel from "../../Base/Panel";
import { SubscriptionConfig } from "@/types/subscriptions";
import Radio from "../../Base/Radio";
import SubscriptionOptionPayload from "@/shared/payloads/subscription/SubscriptionOptionPayload";
import { useTranslations } from "next-intl";

export default function SubscriptionWidget({
  displaySettings,
  options
}: SubscriptionConfig): JSX.Element {
  const [selected, setSelected] = useState(0);
  const t = useTranslations("SubscriptionWidget");
  const handleChange = event => {
    setSelected(event.target.value);
  };

  const getLabel = (option: SubscriptionOptionPayload) => {
    const { frequency, discount, type, unit } = option;
    const saveLable = ` - Save ${discount}${unit}`;
    return (
      (frequency < 2 ? `Every ${type}` : `Every ${frequency} ${type}s`) +
      saveLable
    );
  };
  return (
    <CenterDiv wordBreak="break-all">
      <>
        <Small>{t("widgetPreviewText")}</Small>

        <Panel
          backgroundColor={displaySettings.widgetBgColor}
          color={displaySettings.widgetTextColor}
          fontSize="0.9rem"
        >
          <H2>
            {t("widgetLabel", {
              label: displaySettings.widgetLabel
            }) || t("widgetLabelPlaceholder")}
          </H2>
          {options.map((option, index) => {
            return (
              <div key={index} style={{ marginTop: "10px" }}>
                <Radio
                  label={t("widgetRadioLabel", {
                    radioLabel: getLabel(option)
                  })}
                  checked={selected == index}
                  value={index}
                  onChange={handleChange}
                  fontSize="0.9rem "
                />
              </div>
            );
          })}
          <SubscriptionButton
            marginTop="large"
            displaySettings={displaySettings}
          />
        </Panel>
      </>
    </CenterDiv>
  );
}

export async function getStaticProps({ locale }) {
  const messages = await import(`../../../locales/${locale}.json`);
  return {
    props: {
      messages: messages.default
    }
  };
}
