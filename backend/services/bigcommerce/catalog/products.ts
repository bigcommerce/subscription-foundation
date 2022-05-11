import { SUBSCRIPTION_METAFIELD_KEY } from "@/shared/constants/bigcommerce";
import ProductPayload from "@/shared/payloads/product/ProductPayload";
import ProductSubConfigPayload from "@/shared/payloads/product/ProductSubConfigPayload";
import BigBaseApi from "../big-base-api";

export default class ProductApi extends BigBaseApi {
  public baseUri = "/catalog/products";

  public async get(
    id: number,
    params = { include: "primary_image" }
  ): Promise<ProductPayload> {
    const { data }: { data: ProductPayload } = await this.bigApi.client.get(
      `${this.baseUri}/${id}?${this.getParmasUrl(params)}`
    );

    const meta = await this.bigApi.catalog.productMeta.get(
      id,
      SUBSCRIPTION_METAFIELD_KEY
    );
    data.sub_config = new ProductSubConfigPayload(meta?.value);
    return data;
  }
}
