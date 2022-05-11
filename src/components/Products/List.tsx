/* eslint-disable react/display-name */
import React from "react";
import StyledTable from "../Base/StyledTable";
import ProductRowAction from "./Row/Action";
import ThumbnailWithName from "./Row/ThumbnailWithName";
import { css } from "styled-components";
import useProductEdit from "@/frontend/providers/ProductProvider/modules/useProductEdit";
import { useBigStore } from "../../providers/BigStoreProvider/context";
import EnabledSubscriptionCheck from "./Items/EnabledSubscriptionCheck";
import { truncate } from "lodash";
import { Box, Link, Text } from "@bigcommerce/big-design";
import ProductPayload from "@/shared/payloads/product/ProductPayload";

const Table = StyledTable<ProductPayload>(
  () => css`
    tr:hover {
      background-color: #f1f8fe;
      td {
        background-color: #f1f8fe;
      }
    }
  `
);
export default function ProductList({
  products,
  productCount
}: {
  products: ProductPayload[];
  productCount: number;
}): JSX.Element {
  const { showVariantProductList } = useProductEdit();
  const { store } = useBigStore();

  return (
    <Table
      columns={[
        {
          header: `${productCount} Products`,
          hash: "id",
          render: product => (
            <ThumbnailWithName
              image={product.primary_image}
              name={product.name}
              onClick={() => showVariantProductList(product)}
            />
          )
        },
        {
          header: "SKU",
          hash: "sku",
          render: ({ sku }) => (
            <Text>
              {truncate(sku, {
                length: 10
              })}
            </Text>
          )
        },
        {
          header: "Subscription Options",
          hash: "subOptions",
          render: ({ sub_config }) =>
            `${sub_config.configsCount} Configs / ${sub_config.optionsCount} Options`
        },
        {
          header: "Enable Subscription",
          hash: "isEnabledSubscription",
          render: product => <EnabledSubscriptionCheck product={product} />
        },
        {
          header: "",
          hash: "actions",
          render: product => (
            <ProductRowAction
              product={product}
              store={store}
              setIsOpen={showVariantProductList}
            />
          )
        }
      ]}
      items={products}
      borderLeft="1px solid #D9DCE9"
      borderRight="1px solid #D9DCE9"
      emptyComponent={
        <Box
          backgroundColor="white"
          padding="large"
          borderRight="box"
          borderBottom="box"
          borderLeft="box"
          style={{ textAlign: "center" }}
        >
          <Link
            href={`https://store-${store.hash}.mybigcommerce.com/manage/products`}
            target="_top"
          >
            Assign products
          </Link>{" "}
          to this channel to make them available for subscription interval and
          discount configuration.
        </Box>
      }
      stickyHeader
    />
  );
}
