import React, { useEffect, useRef } from "react";
import {
  Flex,
  Grid,
  GridItem,
  Input,
  Pagination,
  Select
} from "@bigcommerce/big-design";
import { SearchIcon } from "@bigcommerce/big-design-icons";
import PageLayout from "../../Base/PageLayout";
import ProductList from "../List";
import { useProductContext } from "@/frontend/providers/ProductProvider/context";
import useProductListUI from "@/frontend/providers/GlobalProvider/modules/product-list/useProductListUI";
import enumToOptions from "@/frontend/utils/enum-to-options";
import { ProductTypeEnum } from "@/frontend/providers/GlobalProvider/modules/product-list/context";
import { useTranslations } from "next-intl";

const ProductsListPane = (): JSX.Element => {
  const { products } = useProductContext();
  const t = useTranslations("ProductsListPane");
  const {
    setSearchText,
    productListUI,
    limitOptions,
    setProductType,
    setLmit,
    setCurrentPage
  } = useProductListUI();
  const template = `
  "input select" 60px
  / 3fr 1fr
  `;
  const inputRef = useRef<HTMLInputElement>();

  const { searchText, currentPage, limit, productType } = productListUI;

  useEffect(() => {
    inputRef.current.value = searchText;
  }, [searchText]);

  const resultProducts = products.filter(({ description, sku, sub_config }) => {
    if (
      searchText &&
      !description.toLowerCase().includes(searchText) &&
      !sku.toLowerCase().startsWith(searchText)
    )
      return false;
    switch (productType) {
      case ProductTypeEnum["All Products"]:
        return true;
      case ProductTypeEnum["Disabled Subscriptions"]:
        return sub_config?.is_enabled === false;
      case ProductTypeEnum["Enabled Subscriptions"]:
        return sub_config?.is_enabled !== false && sub_config?.configsCount;
      case ProductTypeEnum["None Subscription Config"]:
        return sub_config?.configsCount < 1;
      default:
        return true;
    }
  });

  const maxProducts = currentPage * limit;
  const lastItem = Math.min(maxProducts, resultProducts.length);
  const firstItem = Math.max(0, maxProducts - limit);
  const currentItems = resultProducts.slice(firstItem, lastItem);

  return (
    <PageLayout title={t("title")}>
      <Grid gridTemplate={template}>
        <GridItem gridArea="input">
          <Input
            ref={inputRef}
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
            options={enumToOptions(ProductTypeEnum)}
            placeholder={t("allProductsPlaceholder")}
            placement="top"
            required
          />
        </GridItem>
      </Grid>
      <ProductList
        products={currentItems}
        productCount={resultProducts.length}
      />
      <Flex justifyContent="flex-end">
        <Pagination
          currentPage={currentPage}
          itemsPerPage={limit}
          itemsPerPageOptions={limitOptions}
          totalItems={resultProducts.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setLmit}
        />
      </Flex>
    </PageLayout>
  );
};

export default ProductsListPane;
