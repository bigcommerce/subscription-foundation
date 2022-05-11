import React from "react";
import OnboardingFlow from "@/frontend/components/Onboarding";

const Onboarding = (): JSX.Element => {
  return (
    <>
      <OnboardingFlow />
    </>
  );
};

export default Onboarding;

export async function getStaticProps({ locale }) {
  const messages = await import(`../locales/${locale}.json`);
  return {
    props: {
      messages: messages.default
    }
  };
}
