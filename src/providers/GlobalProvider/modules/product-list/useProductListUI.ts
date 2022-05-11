import { useGlobalContext } from "../../context";
import { ProductListUIContext, ProductTypeEnum } from "./context";

const limitOptions = [20, 50, 100, 250];

function useProductListUI() {
  const { productListUI, setProductListUI } = useGlobalContext();

  const updateProductListUI = (context: ProductListUIContext) => {
    setProductListUI({
      ...productListUI,
      ...context
    });
  };
  const setProductType = (productType: ProductTypeEnum) =>
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
    productListUI,
    setProductListUI,
    setProductType,
    setLmit,
    setSearchText,
    limitOptions,
    setCurrentPage
  };
}

export default useProductListUI;
