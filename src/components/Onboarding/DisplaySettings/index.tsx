import React from "react";
import {
  Panel,
  Input,
  Small,
  Form,
  FormGroup,
  Link,
  FlexItem,
  H4,
  Textarea
} from "@bigcommerce/big-design";
import SubscriptionPreview from "./SubscriptionPreview";
import ColorPicker from "../../Base/ColorPicker";
import Flex from "../../Base/Flex";
import _ from "lodash";
import useDisplaySetting from "@/frontend/providers/BigStoreProvider/modules/displaySetting";
import CenterDiv from "../../Base/CenterDiv";
import { useTranslations } from "next-intl";

export default function DisplaySettings(): JSX.Element {
  const { displaySetting, setDisplaySetting } = useDisplaySetting();

  const t = useTranslations("DisplaySettings");
  const debounceSetConfig = _.debounce(setDisplaySetting, 200);

  return (
    <Panel header={t("title")}>
      <Small>
        {t("descriptionLineOne")}
        <br />
        {t("descriptionLineTwo")}
        <Link href="#" target="_blank" external>
          {t("learnMoreLink")}
        </Link>
      </Small>

      <Flex
        flexDirection={{ mobile: "column", tablet: "row" } as any}
        justifyContent="space-between"
      >
        <FlexItem flexGrow={10}>
          <Form>
            <FormGroup>
              <Input
                value={displaySetting.widgetLabel}
                onChange={e => {
                  setDisplaySetting({
                    ...displaySetting,
                    widgetLabel: e.target.value
                  });
                }}
                label={t("subsWidgetLabelHeader")}
                placeholder={t("subsWidgetLabelPlaceholder")}
                description={t("subsWidgetDescription")}
                required
              />
            </FormGroup>
            <FormGroup>
              <Input
                value={displaySetting.buttonLabel}
                onChange={e => {
                  setDisplaySetting({
                    ...displaySetting,
                    buttonLabel: e.target.value
                  });
                }}
                label={t("addToCardLabelHeader")}
                placeholder={t("addToCardPlaceholder")}
                description={t("addToCardDescription")}
                required
              />
            </FormGroup>
            <H4>{t("widgetColorsHeader")}</H4>
            <Small>{t("widgetColorsDesc")}</Small>
            <Flex
              flexDirection={{ mobile: "column", tablet: "row" }}
              marginTop="large"
              maxWidth="26rem"
            >
              <FlexItem>
                <FormGroup>
                  <ColorPicker
                    description={t("widgetBGColorLabel")}
                    placeholder="#FFFFFF"
                    value={displaySetting.widgetBgColor}
                    onChange={e => {
                      debounceSetConfig({
                        ...displaySetting,
                        widgetBgColor: e.target.value
                      });
                    }}
                  />
                </FormGroup>
              </FlexItem>
              <FlexItem>
                <FormGroup>
                  <ColorPicker
                    description={t("widgetTextColorLabel")}
                    placeholder="#343434"
                    value={displaySetting.widgetTextColor}
                    onChange={e => {
                      debounceSetConfig({
                        ...displaySetting,
                        widgetTextColor: e.target.value
                      });
                    }}
                  />
                </FormGroup>
              </FlexItem>
            </Flex>
            <Flex
              flexDirection={{ mobile: "column", tablet: "row" }}
              maxWidth="26rem"
            >
              <FlexItem>
                <FormGroup>
                  <ColorPicker
                    description={t("buttonBGColorLabel")}
                    placeholder="#3C64F4"
                    value={displaySetting.buttonBgColor}
                    onChange={e => {
                      debounceSetConfig({
                        ...displaySetting,
                        buttonBgColor: e.target.value
                      });
                    }}
                  />
                </FormGroup>
              </FlexItem>
              <FlexItem>
                <FormGroup>
                  <ColorPicker
                    description={t("buttonTextColorLabel")}
                    placeholder="#FFFFFF"
                    value={displaySetting.buttonTextColor}
                    onChange={e => {
                      debounceSetConfig({
                        ...displaySetting,
                        buttonTextColor: e.target.value
                      });
                    }}
                  />
                </FormGroup>
              </FlexItem>
            </Flex>
          </Form>
        </FlexItem>
        <FlexItem flexGrow={1}>
          <SubscriptionPreview config={displaySetting} />
          <Form>
            <CenterDiv>
              <Small>{t("widgetTemplateLabel")}</Small>
            </CenterDiv>

            <FormGroup>
              <Textarea
                placeholder="< code >"
                rows={3}
                resize={true}
                defaultValue={'<div id="stripe_subscription_widget"></div>'}
              />
            </FormGroup>
          </Form>
        </FlexItem>
      </Flex>
    </Panel>
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
