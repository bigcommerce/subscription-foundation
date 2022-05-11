import ProductPayload from "@/shared/payloads/product/ProductPayload";
import VariantPayload from "@/shared/payloads/product/VariantPayload";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export enum ProductPageView {
  LIST = "LIST",
  VARIANT_PRODUCTS = "VARIANT_PRODUCTS",
  SUBSCRIPTION_EDIT = "SUBSCRIPTION_EDIT"
}

export interface ProductContextProps {
  loading: boolean;
  setLoading?: Dispatch<SetStateAction<boolean>>;
  product: ProductPayload;
  setProduct?: Dispatch<SetStateAction<ProductPayload>>;
  variant: VariantPayload;
  setVariant?: Dispatch<SetStateAction<VariantPayload>>;
  products?: ProductPayload[];
  setProducts?: Dispatch<SetStateAction<ProductPayload[]>>;
  view: ProductPageView;
  setView: Dispatch<SetStateAction<ProductPageView>>;
}

export const ProductContext = createContext<ProductContextProps | undefined>(
  undefined
);
ProductContext.displayName = "ProductContext";

export function useProductContext() {
  const context = useContext(ProductContext);
  return context;
}
