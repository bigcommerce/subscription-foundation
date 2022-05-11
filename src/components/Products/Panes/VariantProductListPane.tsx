import React from "react";
import {
  Button,
  Flex,
  Grid,
  GridItem,
  Input,
  Pagination,
  Select
} from "@bigcommerce/big-design";
import { SearchIcon } from "@bigcommerce/big-design-icons";
import ActionBar from "../../Base/ActionBar";
import PageLayout from "../../Base/PageLayout";
import useProductEdit from "@/frontend/providers/ProductProvider/modules/useProductEdit";
import ProductVariantList from "../Variant/List";
import useVariantProductUI from "@/frontend/providers/GlobalProvider/modules/variant-product-list/useVariantProductUI";
import enumToOptions from "@/frontend/utils/enum-to-options";
import { VariantProductTypeEnum } from "@/frontend/providers/GlobalProvider/modules/variant-product-list/context";
import { useTranslations } from "next-intl";

const VariantProductListPane = (): JSX.Element => {
  const t = useTranslations("VariantProductListPane");
  const { product, hideVariantProductList } = useProductEdit();
  const {
    variantProductListUI,
    setProductType,
    setLmit,
    setSearchText,
    limitOptions,
    setCurrentPage
  } = useVariantProductUI();
  const { searchText, currentPage, limit, productType } = variantProductListUI;
  if (!product?.variants) return <> </>;

  const resultVariants = product.variants.filter(
    ({ option_values, sub_config }) => {
      if (
        searchText &&
        !option_values
          .map(({ label }) => label)
          .join(" ")
          .toLowerCase()
          .includes(searchText.toLowerCase())
      )
        return false;
      switch (productType) {
        case VariantProductTypeEnum["All Variants Products"]:
          return true;
        case VariantProductTypeEnum["Disabled Subscriptions"]:
          return sub_config?.is_enabled === false;
        case VariantProductTypeEnum["Enabled Subscriptions"]:
          return (
            sub_config?.is_enabled !== false && sub_config?.options?.length
          );
        case VariantProductTypeEnum["None Subscription Config"]:
          return (sub_config?.options?.length ?? 0) < 1;
        default:
          return true;
      }
    }
  );

  const maxProducts = currentPage * limit;
  const lastItem = Math.min(maxProducts, resultVariants.length);
  const firstItem = Math.max(0, maxProducts - limit);
  const currentItems = resultVariants.slice(firstItem, lastItem);

  const template = `
  "input select" 60px
  / 3fr 1fr
  `;

  return (
    <PageLayout title={t("title")}>
      <Grid gridTemplate={template}>
        <GridItem gridArea="input">
          <Input
            onChange={e => setSearchText(e.target.value)}
            value={searchText}
            placeholder={t("searchInputPlaceholder")}
            iconLeft={<SearchIcon />}
          />
        </GridItem>
        <GridItem gridArea="select">
          <Select
            onOptionChange={setProductType}
            value={productType}
            options={enumToOptions(VariantProductTypeEnum)}
            placeholder={t("allProductsPlaceholder")}
            placement="top"
            required
          />
        </GridItem>
      </Grid>

      <ProductVariantList
        variants={currentItems}
        variantsCount={resultVariants.length}
      />
      <Flex justifyContent="flex-end">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={limit}
          itemsPerPageOptions={limitOptions}
          totalItems={resultVariants.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setLmit}
        />
      </Flex>

      <ActionBar
        buttons={[
          <Button
            key="product_back_button"
            variant="subtle"
            onClick={() => hideVariantProductList()}
          >
            {t("backButtonText")}
          </Button>
        ]}
      />
    </PageLayout>
  );
};

export default VariantProductListPane;

export async function getStaticProps({ locale }) {
  const messages = await import(`../../../locales/${locale}.json`);
  return {
    props: {
      messages: messages.default
    }
  };
}
