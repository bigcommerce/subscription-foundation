import React from "react";
import {
  Box,
  Button,
  Flex,
  FlexItem,
  H1,
  Text,
  Link
} from "@bigcommerce/big-design";
import Head from "next/head";
import { useTranslations } from "next-intl";

const Onboarding = (): JSX.Element => {
  const t = useTranslations("Home");
  return (
    <>
      <Head>
        <style type="text/css">
          {`      
          body {
            max-width: 1080px;
            margin: 2rem auto;
            padding-bottom: 2rem;
          }
        `}
        </style>
      </Head>

      <Flex flexDirection={{ mobile: "column", desktop: "row" }}>
        <FlexItem flexGrow={1}>
          <Box margin="medium" marginTop="xxxLarge">
            <img src="/images/stripe-subscription-logo.svg" width={100} />
          </Box>
          <Box margin="medium">
            <H1>{t("title")}</H1>
            <Text marginRight="xLarge">{t("description")}</Text>

            <Link href="/onboarding">
              <Button marginTop="medium">{t("buttonText")}</Button>
            </Link>

            <Box marginTop="medium">
              <Text as="span">{t("createAccountText")}</Text>{" "}
              <Link href="#" target="_blank" external>
                {t("createAccountLinkText")}
              </Link>
            </Box>
          </Box>
        </FlexItem>
        <FlexItem
          flexGrow={1}
          style={{ textAlign: "center" }}
          marginVertical="xxxLarge"
        >
          <Box
            borderRadius="normal"
            shadow="floating"
            style={{ maxWidth: 541, margin: "auto" }}
          >
            <img src="/images/stripe-product-image.svg" />
          </Box>
        </FlexItem>
      </Flex>
    </>
  );
};

export async function getStaticProps({ locale }) {
  const messages = await import(`../locales/${locale}.json`);
  return {
    props: {
      messages: messages.default
    }
  };
}

export default Onboarding;
