import React, { useState } from "react";
import { GlobalContext } from "./context";
import {
  ProductListUIContext,
  ProductTypeEnum
} from "./modules/product-list/context";
import {
  VariantProductListUIContext,
  VariantProductTypeEnum
} from "./modules/variant-product-list/context";

const GlobalProvider = (props: { children: React.ReactElement }) => {
  const [productListUI, setProductListUI] = useState<ProductListUIContext>({
    currentPage: 1,
    limit: 20,
    searchText: "",
    productType: ProductTypeEnum["All Products"]
  });
  const [variantProductListUI, setVariantProductListUI] =
    useState<VariantProductListUIContext>({
      currentPage: 1,
      limit: 20,
      searchText: "",
      productType: VariantProductTypeEnum["All Variants Products"]
    });

  return (
    <GlobalContext.Provider
      value={{
        productListUI,
        setProductListUI,
        variantProductListUI,
        setVariantProductListUI
      }}
    >
      {props.children}
    </GlobalContext.Provider>
  );
};
export default GlobalProvider;
