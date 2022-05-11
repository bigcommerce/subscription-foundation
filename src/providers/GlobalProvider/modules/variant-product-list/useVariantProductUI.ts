import { useGlobalContext } from "../../context";
import { VariantProductTypeEnum, VariantProductListUIContext } from "./context";

const limitOptions = [20, 50, 100, 250];

function useVariantProductUI() {
  const { variantProductListUI, setVariantProductListUI } = useGlobalContext();

  const updateProductListUI = (context: VariantProductListUIContext) => {
    setVariantProductListUI({
      ...variantProductListUI,
      ...context
    });
  };
  const setProductType = (productType: VariantProductTypeEnum) =>
    updateProductListUI({
      productType
    });
  const setLmit = (limit: number) => {
    updateProductListUI({ currentPage: 1, limit });
  };
  const setCurrentPage = (currentPage: number) => {
    updateProductListUI({ currentPage });
  };
  const setSearchText = (searchText: string) => {
    updateProductListUI({ searchText, currentPage: 1 });
  };

  return {
    variantProductListUI,
    setVariantProductListUI,
    setProductType,
    setLmit,
    setSearchText,
    limitOptions,
    setCurrentPage
  };
}

export default useVariantProductUI;
