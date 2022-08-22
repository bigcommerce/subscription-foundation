import React from "react";
import {
  Box,
  Flex,
  FlexItem,
  Form,
  FormGroup,
  Grid,
  GridItem,
  Link,
  Panel,
  Small,
  Text,
  Textarea
} from "@bigcommerce/big-design";
import { APP_URL } from "@/constants/common";
import { useBigStore } from "../../providers/BigStoreProvider/context";
import { useTranslations } from "next-intl";

export default function CheckoutSettings(): JSX.Element {
  const { store } = useBigStore();
  const t = useTranslations("CheckoutSettings");

  const steps = [
    {
      title: t("stepOneTitle"),
      action: (
        <Link
          href={`https://store-${store.hash}.mybigcommerce.com/manage/storefront-manager/my-themes`}
          target="_blank"
          external
        >
          {t("stepOneLinkText")}
        </Link>
      )
    },
    {
      title: t("stepTwoTitle"),
      action: (
        <Link
          href={`https://support.bigcommerce.com/s/article/Stencil-Themes#edit`}
          target="_blank"
          external
        >
          {t("stepTwoLinkText")}
        </Link>
      )
    },
    {
      title: t("stepThreeTitle"),
      subtitle: t("stepThreeSubtitle"),
      code: {
        size: "small",
        content:
          '<!-- Start: Subscription Widget -->\n<div id="stripe_subscription_widget"></div>\n<!-- End: Subscription Widget -->'
      }
    },
    {
      title: t("stepFourTitle"),
      subtitle: t("stepFourSubtitle"),
      code: {
        size: "large",
        content: `<!-- Start: Subscription Customer Portal Link -->
<script>
fetch('/graphql', {
  method: 'POST',
  credentials: 'same-origin',
  headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer {{settings.storefront_api.token}}'
  },
  body: JSON.stringify({ query: \`query CustomerAttributes {
  customer {
    email
    entityId
    attributes {
        stripe_customer_id: attribute(entityId:{{customerAttributeFieldId}}) {
            entityId
            value
      }
    }
  }
}\`})
}).
then(async response => await response.json()).
then(json => {
    var node = document.createElement("li");
    node.classList.add('navBar-item');
    node.innerHTML = 
        '<form method="POST" id="manageSubscriptionForm" action="${APP_URL}/api/stripe/create-customer-portal-session">' + 
        '<button class="navBar-action" type="submit">Manage Subscriptions</button>' +
        '</form>';
    document.getElementsByClassName('navBar-section')[0].appendChild(node);

    var fieldNode = document.createElement("input"); 
    fieldNode.setAttribute('type', 'hidden');
    fieldNode.setAttribute('name', 'bigcommerce_id');
    fieldNode.setAttribute('value', json.data.customer.entityId);
    document.getElementById('manageSubscriptionForm').appendChild(fieldNode);
    
    fieldNode = document.createElement("input");
    fieldNode.setAttribute('type', 'hidden');
    fieldNode.setAttribute('name', 'bigcommerce_email');
    fieldNode.setAttribute('value', json.data.customer.email);
    document.getElementById('manageSubscriptionForm').appendChild(fieldNode);
    
    fieldNode = document.createElement("input");
    fieldNode.setAttribute('type', 'hidden');
    fieldNode.setAttribute('name', 'stripe_id');
    fieldNode.setAttribute('value', json.data.customer.attributes.stripe_customer_id.value);
    document.getElementById('manageSubscriptionForm').appendChild(fieldNode);
});
</script>
<!-- End: Subscription Customer Portal Link -->`
      }
    }
  ];

  const DynamicTextArea = ({ step, customerAttributeFieldId }) => { 
    let code = step.code.content;
    code = code.replace('{{customerAttributeFieldId}}', customerAttributeFieldId);
    
    return (
      <Textarea
        placeholder="< code >"
        rows={step.code.size === "small" ? 3 : 7}
        resize={true}
        defaultValue={code}
      />
    )
  }

  const StepNumber = ({ step }) => (
    <Box
      border="box"
      borderRadius="circle"
      paddingHorizontal="small"
      paddingVertical="xxSmall"
    >
      <Text bold>{step}</Text>
    </Box>
  );

  return (
    <Panel header={t("header")}>
      <Box marginBottom="large">
        <Text>{t("copy")}</Text>
      </Box>

      {steps.map((step, idx) => (
        <Box key={idx} borderTop="box" paddingVertical="small">
          <Flex>
            <FlexItem flexGrow={1}>
              <Grid gridColumns="35px 1fr">
                <GridItem>
                  <StepNumber step={idx + 1} />
                </GridItem>
                <GridItem marginVertical="xxSmall">
                  <Text bold>{step.title}</Text>
                </GridItem>
              </Grid>
            </FlexItem>
            {step.action && (
              <FlexItem alignSelf={{ tablet: "center" }}>
                <Grid gridColumns="35px 1fr">
                  <GridItem></GridItem>
                  <GridItem>{step.action}</GridItem>
                </Grid>
              </FlexItem>
            )}
          </Flex>

          {step.subtitle && (
            <Grid gridColumns="35px 1fr">
              <GridItem></GridItem>
              <GridItem>
                <Box>
                  <Small>{step.subtitle}</Small>
                </Box>
              </GridItem>
            </Grid>
          )}

          {step.code && (
            <Grid gridColumns="35px 1fr">
              <GridItem></GridItem>
              <GridItem>
                <Box marginTop="medium">
                  <Form fullWidth={true}>
                    <FormGroup>
                      <DynamicTextArea step={step} customerAttributeFieldId={store.customerAttributeFieldId} />
                    </FormGroup>
                  </Form>
                </Box>
              </GridItem>
            </Grid>
          )}
        </Box>
      ))}
    </Panel>
  );
}
