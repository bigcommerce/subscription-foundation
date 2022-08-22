import React, { useEffect } from "react";
import {
  Panel,
  Text,
  Button,
  ProgressCircle,
  Badge
} from "@bigcommerce/big-design";
import { PanelHeader } from "./styled";
import useStripe from "@/frontend/providers/BigStoreProvider/modules/useStripe";
import styled from "styled-components";
import AsyncButton from "../Base/AsyncButton";
import { useTranslations } from "next-intl";
import Image from "next/image";

const FlexItem = styled.div`
  margin-left: auto;
`;

export default function StripeConnect(props): JSX.Element {
  const { connecting, connected, stripe, startConnecting } = useStripe();
  const t = useTranslations("StripeConnect");

  useEffect(() => {
    if (connecting === false && props.next) {
      props.next();
    }
  }, [connecting, props]);

  const connectText = <Text>{t("connectText")}</Text>;

  return (
    <Panel>
      <PanelHeader>
        <Image src="/images/stripe-subscription-logo.svg" width={100} height={50} style={{ marginRight: "1rem" }} alt="" />
        {connected ? (
          <>
            <Badge label={t("badgeLabel")} variant="success" />
            <FlexItem>
              <AsyncButton
                variant="secondary"
                isLoading={connecting}
                onClick={startConnecting}
              >
                {t("switchAccount")}
              </AsyncButton>
            </FlexItem>
          </>
        ) : (
          <React.Fragment />
        )}
      </PanelHeader>
      {connected ? (
        <Text>{t("connectedText", { name: stripe.dashboardDisplayName })}</Text>
      ) : connecting ? (
        <React.Fragment>
          {connectText}
          <ProgressCircle />
        </React.Fragment>
      ) : (
        <React.Fragment>
          {connectText}
          <Button variant="primary" onClick={startConnecting}>
            {t("connectButtonText")}
          </Button>
        </React.Fragment>
      )}
    </Panel>
  );
}

export async function getStaticProps({ locale }) {
  const messages = await import(`../../locales/${locale}.json`);
  return {
    props: {
      messages: messages.default
    }
  };
}
