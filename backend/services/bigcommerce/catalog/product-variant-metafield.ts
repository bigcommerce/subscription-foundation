import VariantMetafieldPayload from "@/shared/payloads/product/VariantMetafieldPayload";
import BigBaseApi from "../big-base-api";

export default class ProductVariantMetafieldApi extends BigBaseApi {
  public getBaseUri = (product_id, variant_id) =>
    `/catalog/products/${product_id}/variants/${variant_id}/metafields`;

  public async get(
    product_id,
    variant_id,
    key
  ): Promise<VariantMetafieldPayload> {
    const { data } = await this.bigApi.client.get(
      this.getBaseUri(product_id, variant_id) +
        "?" +
        new URLSearchParams({ key }).toString()
    );

    return data?.[0];
  }

  public async create(
    product_id,
    variant_id,
    payload: VariantMetafieldPayload
  ): Promise<VariantMetafieldPayload> {
    const { data } = await this.bigApi.client.post(
      this.getBaseUri(product_id, variant_id),
      payload
    );

    return data;
  }

  public async update(
    product_id,
    variant_id,
    metafield_id,
    payload: VariantMetafieldPayload
  ): Promise<VariantMetafieldPayload> {
    const { data } = await this.bigApi.client.put(
      this.getBaseUri(product_id, variant_id) + `/${metafield_id}`,
      payload
    );
    return data;
  }
  
  public async upsert(
    product_id,
    variant_id,
    payload: VariantMetafieldPayload
  ): Promise<VariantMetafieldPayload> {
    const metafield = await this.get(product_id, variant_id, payload.key);
    const data = metafield
      ? await this.update(product_id, variant_id, metafield.id, payload)
      : await this.create(product_id, variant_id, payload);

    return data;
  }
}
