import VariantPayload from "@/shared/payloads/product/VariantPayload";
import { ProductPageView, useProductContext } from "../context";
import _ from "lodash";
import useProducts from "./useProducts";

function useVariant() {
  const { variant, setVariant, setView, product, setProduct } =
    useProductContext();
  const { updateProduct } = useProducts();

  const showSubConfigEditView = (v: VariantPayload) => {
    setVariant(_.cloneDeep(v));
    setView(ProductPageView.SUBSCRIPTION_EDIT);
  };

  const hideSubConfigView = () => {
    if (product.variants?.length == 1) {
      setView(ProductPageView.LIST);
    } else setView(ProductPageView.VARIANT_PRODUCTS);
  };

  const getProduct = variant => {
    const index = product?.variants.findIndex(prd => prd.id == variant.id);
    const newVariants = [...product?.variants];
    newVariants[index] = variant;
    const enabledConfigs =
      newVariants?.filter(
        ({ sub_config }) =>
          sub_config?.is_enabled && sub_config?.options?.length
      ) ?? [];
    product.sub_config = {
      is_enabled: true,
      ...product?.sub_config,
      configsCount: enabledConfigs.length,
      optionsCount: enabledConfigs?.reduce(
        (all, { sub_config }) => all + sub_config.options.length,
        0
      )
    };
    return {
      ...product,
      variants: newVariants
    };
  };

  const updateVariant = variant => {
    const updatedProduct = getProduct(variant);
    updateProduct(updatedProduct);
  };

  const variants = product?.variants;

  return {
    product,
    setProduct,
    variants,
    variant,
    showSubConfigEditView,
    hideSubConfigView,
    setView,
    getProduct,
    updateVariant
  };
}

export default useVariant;
