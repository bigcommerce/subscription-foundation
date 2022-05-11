import ProductPayload from "@/shared/payloads/product/ProductPayload";
import { useProductContext } from "../context";

function useProducts() {
  const { products, setProducts, setProduct } = useProductContext();

  const updateProduct = (product: ProductPayload) => {
    setProduct(product);
    const index = products.findIndex(prd => prd.id == product.id);
    const newProducts = [...products];
    newProducts[index] = product;
    setProducts(newProducts);
  };

  return {
    updateProduct,
    products
  };
}

export default useProducts;
