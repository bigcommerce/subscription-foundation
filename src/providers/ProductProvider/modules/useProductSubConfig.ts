/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback } from "react";
import { useProductContext } from "../context";
import ProductSubConfigPayload from "@/shared/payloads/product/ProductSubConfigPayload";

function useProductSubConfig() {
  const { setProduct, product } = useProductContext();

  const productSubConfig = product?.sub_config ?? {
    is_enabled: false,
    stripe_price_id: null
  };
  const setProductSubConfig = (sub_config: ProductSubConfigPayload) => {
    setProduct({
      ...product,
      sub_config
    });
  };

  const isEnabled = productSubConfig?.is_enabled ?? true;
  const setEnabled = useCallback(is_enabled => {
    return setProductSubConfig({
      ...productSubConfig,
      is_enabled
    });
  }, []);

  return {
    product,
    productSubConfig,
    setProductSubConfig,
    isEnabled,
    setEnabled
  };
}

export default useProductSubConfig;
