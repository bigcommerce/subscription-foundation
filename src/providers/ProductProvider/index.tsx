import ProductPayload from "@/shared/payloads/product/ProductPayload";
import VariantPayload from "@/shared/payloads/product/VariantPayload";
import React, { useState } from "react";
import { ProductContext, ProductPageView } from "./context";

const ProductProvider = (props: {
  children: React.ReactElement;
  products: ProductPayload[];
}) => {
  const [loading, setLoading] = useState<boolean>();
  const [product, setProduct] = useState<ProductPayload>();
  const [variant, setVariant] = useState<VariantPayload>();
  const [products, setProducts] = useState<ProductPayload[]>(props.products);
  const [view, setView] = useState<ProductPageView>(ProductPageView.LIST);

  return (
    <ProductContext.Provider
      value={{
        loading,
        setLoading,
        product,
        setProduct,
        variant,
        setVariant,
        view,
        setView,
        products,
        setProducts
      }}
    >
      {props.children}
    </ProductContext.Provider>
  );
};
export default ProductProvider;
