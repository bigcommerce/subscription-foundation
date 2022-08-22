import React, { useState } from "react";
import { GetServerSideProps } from "next";
import { Button, Stepper } from "@bigcommerce/big-design";
import ActionBar from "../Base/ActionBar";
import useStripe from "@/frontend/providers/BigStoreProvider/modules/useStripe";
import StripeConnect from "./StripeConnect";
import DisplaySettings from "./DisplaySettings";
import CheckoutSettings from "./CheckoutSettings";
import { axios } from "@/frontend/libs";
import useDisplaySetting from "@/frontend/providers/BigStoreProvider/modules/displaySetting";
import AsyncButton from "../Base/AsyncButton";
import PageLayout from "../Base/PageLayout";
import alertManager from "@/frontend/libs/alerts";
import { useBigStore } from "../../providers/BigStoreProvider/context";
import { useTranslations } from "next-intl";
import { BC_APP_ID } from "@/constants/bigcommerce";

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const messages = await import(`/src/locales/${locale}.json`);

  return {
    props: {
      messages: messages.default
    }
  };
};

const stepComponents = {
  0: StripeConnect,
  1: DisplaySettings,
  2: CheckoutSettings
};

function OnboardingFlow(): JSX.Element {
  const { connected } = useStripe();
  const { store } = useBigStore();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const { updateDisplaySetting } = useDisplaySetting();
  const t = useTranslations("OnboardingFlow");
  const steps = [t("stepOne"), t("stepTwo"), t("stepThree")];

  const increaseStep = async () => {
    try {
      if (currentStep === 1) {
        await updateDisplaySetting();
      }
      if (currentStep < 2) {
        setCurrentStep(currentStep + 1);
      } else {
        const { data } = await axios.put("/api/channel/put");
        if (data?.id) {
          alertManager.clear();
          alertManager.add({
            messages: [{ text: t("successMessage") }],
            type: "success",
            autoDismiss: true
          });

          setTimeout(() => {
            const windowRef = window.top ? window.top : window;
            windowRef.location.href = `https://store-${store.hash}.mybigcommerce.com/manage/channel/${data.id}/app?id=${BC_APP_ID}`;
          }, 2000);
        }
      }
    } catch (error) {}
  };

  function decreaseStep(): void {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  }

  const CurrentStep = stepComponents[currentStep];

  return (
    <PageLayout title={t("title")}>
      <Stepper steps={steps} currentStep={currentStep} />

      <CurrentStep next={increaseStep} />

      <ActionBar
        buttons={[
          <Button
            key="onboarding_prev_step_btn"
            disabled={currentStep === 0}
            variant="subtle"
            onClick={decreaseStep}
          >
            {t("cancelButtonText")}
          </Button>,
          <AsyncButton
            key="onboarding_next_step_btn"
            variant="primary"
            onClick={increaseStep}
            disabled={connected ? false : true}
          >
            {currentStep === 2
              ? t("createChannelText")
              : t("continueButtonText")}
          </AsyncButton>
        ]}
      />
    </PageLayout>
  );
}

export default OnboardingFlow;
