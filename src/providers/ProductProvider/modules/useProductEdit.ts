import ProductPayload from "@/shared/payloads/product/ProductPayload";
import { ProductPageView, useProductContext } from "../context";
import useVariant from "./useVariant";
import { axios } from "@/frontend/libs";

function useProductEdit() {
  const { view, setProduct, product, setView, setLoading } =
    useProductContext();
  const { showSubConfigEditView } = useVariant();

  const showVariantProductList = async (prd: ProductPayload) => {
    setLoading(true);
    const { data } = await axios.get(`/api/product/${prd.id}`);
    setProduct(data);
    if (data.variants?.length == 1) {
      showSubConfigEditView(data.variants[0]);
    } else setView(ProductPageView.VARIANT_PRODUCTS);
    setLoading(false);
  };

  const hideVariantProductList = () => {
    setView(ProductPageView.LIST);
  };

  return {
    product,
    showVariantProductList,
    hideVariantProductList,
    view,
    setView
  };
}

export default useProductEdit;
