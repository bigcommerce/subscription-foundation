import React from "react";
import { ButtonProps } from "@bigcommerce/big-design";
import Button from "../../Base/Button";
import { DisplaySettingPayload } from "@/shared/payloads/DisplaySettingPayload";
import { useTranslations } from "next-intl";

export default function SubscriptionButton(
  props: { displaySettings: DisplaySettingPayload } & ButtonProps
): JSX.Element {
  const t = useTranslations("SubscriptionButton");
  const {
    buttonTextColor: textColor,
    buttonBgColor: backgroundColor,
    buttonLabel: label
  } = props.displaySettings;
  return (
    <Button color={textColor} backgroundColor={backgroundColor} {...props}>
      {t("buttonLabel", { label: label }) || t("buttonDefaultLabel")}
    </Button>
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
