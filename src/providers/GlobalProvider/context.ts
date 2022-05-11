import { createContext, Dispatch, SetStateAction, useContext } from "react";
import { ProductListUIContext } from "./modules/product-list/context";
import { VariantProductListUIContext } from "./modules/variant-product-list/context";

export interface GlobalContextProps {
  productListUI: ProductListUIContext;
  setProductListUI?: Dispatch<SetStateAction<ProductListUIContext>>;
  variantProductListUI: VariantProductListUIContext;
  setVariantProductListUI?: Dispatch<
    SetStateAction<VariantProductListUIContext>
  >;
}

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

GlobalContext.displayName = "GlobalContext";
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  return context;
}
