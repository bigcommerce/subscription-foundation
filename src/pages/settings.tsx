import React from "react";
import StripeConnect from "../components/Onboarding/StripeConnect";
import DisplaySettings from "../components/Onboarding/DisplaySettings";
import ActionBar from "../components/Base/ActionBar";
import AsyncButton from "../components/Base/AsyncButton";
import PageLayout from "../components/Base/PageLayout";
import useDisplaySetting from "../providers/BigStoreProvider/modules/displaySetting";
import { useTranslations } from "next-intl";

const Settings = (): JSX.Element => {
  const { updateDisplaySetting } = useDisplaySetting();
  const t = useTranslations("Settings");

  return (
    <PageLayout title={t("title")}>
      <StripeConnect />

      <DisplaySettings />

      <ActionBar
        buttons={[
          <AsyncButton key={1} variant="primary" handler={updateDisplaySetting}>
            Save
          </AsyncButton>
        ]}
      />
    </PageLayout>
  );
};

export default Settings;

export async function getStaticProps({ locale }) {
  const messages = await import(`../locales/${locale}.json`);
  return {
    props: {
      messages: messages.default
    }
  };
}
