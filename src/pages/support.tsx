import React from "react";
import { useTranslations } from "next-intl";
import CheckoutSettings from "../components/Onboarding/CheckoutSettings";
import PageLayout from "../components/Base/PageLayout";

const Support = (): JSX.Element => {
  const t = useTranslations("Support");

  return (
    <PageLayout title={t("title")}>
      <CheckoutSettings />
    </PageLayout>
  );
};

export default Support;

export async function getStaticProps({ locale }) {
  const messages = await import(`../locales/${locale}.json`);
  return {
    props: {
      messages: messages.default
    }
  };
}
