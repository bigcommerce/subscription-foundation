/* eslint-disable react/display-name */
import React from "react";
import StyledTable from "../../Base/StyledTable";
import ThumbnailWithName from "../Row/ThumbnailWithName";
import { css } from "styled-components";
import VariantPayload from "@/shared/payloads/product/VariantPayload";
import useVariant from "@/frontend/providers/ProductProvider/modules/useVariant";
import SubscriptionToggle from "./SubscriptionToggle";

const Table = StyledTable<VariantPayload>(
  () => css`
    tr:hover {
      background-color: #f1f8fe;
      td {
        background-color: #f1f8fe;
      }
    }
  `
);
export default function ProductVariantList({
  variants,
  variantsCount
}: {
  variants: VariantPayload[];
  variantsCount: number;
}): JSX.Element {
  const { showSubConfigEditView } = useVariant();

  return (
    <Table
      columns={[
        {
          header: `${variantsCount} Variants`,
          hash: "id",
          render: variant => (
            <ThumbnailWithName
              image={{ url_thumbnail: variant.image_url }}
              name={variant.option_values.map(({ label }) => label).join(" | ")}
              onClick={() => showSubConfigEditView(variant)}
            />
          )
        },
        {
          header: "Subscription Options",
          hash: "subOptions",
          render: ({ sub_config }) => sub_config?.options?.length ?? 0
        },
        {
          header: "Enable Subscription",
          hash: "isEnabledSubscription",
          render: variant => <SubscriptionToggle variant={variant} />
        }
      ]}
      items={variants}
      borderLeft="1px solid #D9DCE9"
      borderRight="1px solid #D9DCE9"
      stickyHeader
    />
  );
}
