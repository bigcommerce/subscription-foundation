import React from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  Radio,
  Text
} from "@bigcommerce/big-design";
import Discount from "./Discount";
import useSubConfig from "@/frontend/providers/ProductProvider/modules/useSubConfig";
import { useTranslations } from "next-intl";
import RuleCondition from "./RuleCondition";

export default function Frequencies(): JSX.Element {
  const {
    subOptions,
    setOption,
    addSubOption,
    deleteSubOption,
    defaultOption,
    setDefaultOption
  } = useSubConfig();
  const t = useTranslations("Frequencies");
  return (
    <Box>
      <Grid gridColumns="1fr 0.01fr 1fr 0.4fr 0.2fr">
        <GridItem>
          <Text bold={true}>{t("ruleCondition")}</Text>
        </GridItem>
        <GridItem></GridItem>
        <GridItem>
          <Text bold={true}>{t("discount")}</Text>
        </GridItem>
        <GridItem></GridItem>
        <GridItem></GridItem>
        {subOptions.map(option => {
          return (
            <React.Fragment key={option.id}>
              <GridItem>
                <RuleCondition option={option} setOption={setOption} />
              </GridItem>
              <GridItem>
                <Text>{t("equals")}</Text>
              </GridItem>
              <GridItem>
                <Discount option={option} setOption={setOption} />
              </GridItem>
              <GridItem>
                <Radio
                  className="no-word-wrap"
                  label={t("defaultOptionLabel")}
                  checked={defaultOption == option.id}
                  value={option.id}
                  onChange={e => setDefaultOption(e.target.value)}
                />
              </GridItem>
              <GridItem>
                <Button
                  actionType="destructive"
                  onClick={() =>
                    deleteSubOption(option.id, option.stripe_price_id)
                  }
                >
                  {t("delete")}
                </Button>
              </GridItem>
            </React.Fragment>
          );
        })}
      </Grid>
      <Box marginTop="small">
        <Button type="button" onClick={addSubOption}>
          {t("addNewRule")}
        </Button>
      </Box>
    </Box>
  );
}
