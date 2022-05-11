import BigBaseApi from "../big-base-api";

export enum ProductMetaPermissionType {
  app_only = "app_only",
  read = "read",
  write = "write",
  read_and_sf_access = "read_and_sf_access",
  write_and_sf_access = "write_and_sf_access"
}

export interface ProductMetaPayload {
  id?: number;
  permission_set: ProductMetaPermissionType;
  namespace: string;
  key: string;
  value: string;
  description: string;
}

export default class ProductMetaApi extends BigBaseApi {
  public baseUri = "/catalog/products";

  public async get(productId, key): Promise<ProductMetaPayload> {
    const { data } = await this.client.get(
      `${this.baseUri}/${productId}/metafields?key=${key}`
    );
    return data?.[0];
  }

  public async update(productId, metaId, payload) {
    const { data } = await this.client.put(
      `${this.baseUri}/${productId}/metafields/${metaId}`,
      payload
    );
    return data;
  }

  public async create(productId, payload: ProductMetaPayload) {
    const { data } = await this.client.post(
      `${this.baseUri}/${productId}/metafields`,
      payload
    );
    return data;
  }

  public async upsert(productId, payload: ProductMetaPayload) {
    const meta = await this.get(productId, payload.key);
    if (meta) {
      return await this.update(productId, meta.id, payload);
    } else {
      return await this.create(productId, payload);
    }
  }
}
