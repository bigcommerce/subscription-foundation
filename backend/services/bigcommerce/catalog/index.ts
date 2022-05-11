import { BigApi } from "..";
import ProductMetaApi from "./product-meta";
import ProductVariantMetafieldApi from "./product-variant-metafield";
import ProductApi from "./products";

export default class CatalogApi {
  public products: ProductApi;
  public productMeta: ProductMetaApi;
  public productVariantMeta: ProductVariantMetafieldApi;
  constructor(bigApi: BigApi) {
    this.products = new ProductApi(bigApi);
    this.productMeta = new ProductMetaApi(bigApi);
    this.productVariantMeta = new ProductVariantMetafieldApi(bigApi);
  }
}
