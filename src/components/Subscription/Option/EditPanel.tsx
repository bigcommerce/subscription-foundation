import { useProductContext } from "@/frontend/providers/ProductProvider/context";
import useSubConfig from "@/frontend/providers/ProductProvider/modules/useSubConfig";
import {
  Box,
  Form,
  FormGroup,
  H4,
  Small,
  Checkbox,
  Flex,
  FlexItem,
  Panel
} from "@bigcommerce/big-design";
import React from "react";
import ThumbnailWithName from "../../Products/Row/ThumbnailWithName";
import Frequencies from "./Frequencies";
import { useTranslations } from "next-intl";

export default function SubscriptionEditPanel(): JSX.Element {
  const { oneTimePurchase, setOneTimePurchase, variant } = useSubConfig();
  const { product } = useProductContext();
  const t = useTranslations("SubscriptionEditPanel");

  return (
    <>
      {!!product && (
        <Panel>
          <Box padding="xLarge">
            <Form onSubmit={e => e.preventDefault()}>
              <FormGroup>
                <Box paddingTop="large">
                  <Flex>
                    <FlexItem>
                      <ThumbnailWithName
                        size="4.5rem"
                        image={product.primary_image}
                      />
                    </FlexItem>
                    <FlexItem>
                      <Flex
                        flexDirection="column"
                        justifyContent="space-between"
                      >
                        <FlexItem>
                          <H4>{product.name}</H4>
                        </FlexItem>
                        <FlexItem>
                          {product.variants?.length > 1 && (
                            <Small margin="none">
                              {t("variants")}{" "}
                              {variant.option_values
                                .map(({ label }) => label)
                                .join(" | ")}
                            </Small>
                          )}
                          <Small margin="none">SKU: {variant.sku}</Small>
                          <Small margin="none">
                            {t("price")} ${variant.calculated_price}
                          </Small>
                        </FlexItem>
                      </Flex>
                    </FlexItem>
                  </Flex>
                  <H4 marginTop="xLarge">{t("frequenciesTitle")}</H4>
                  <Small>{t("frequenciesCopy")}</Small>
                  <Checkbox
                    label={t("oneTimePurchaseLabel")}
                    checked={oneTimePurchase}
                    onChange={() => setOneTimePurchase(!oneTimePurchase)}
                  />
                </Box>
              </FormGroup>
              <FormGroup>
                <Frequencies />
              </FormGroup>
            </Form>
          </Box>
        </Panel>
      )}
    </>
  );
}
