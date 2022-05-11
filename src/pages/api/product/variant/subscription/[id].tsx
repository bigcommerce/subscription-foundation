import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { IdNumberRequest } from "@/requests/IdRequest";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import SubConfigRequest from "@/shared/payloads/subscription/SubConfigRequest";
import { ProductMetaPermissionType } from "@/backend/services/bigcommerce/catalog/product-meta";
import {
  SUBSCRIPTION_CHANNEL_NAME,
  SUBSCRIPTION_METAFIELD_KEY,
  SUBSCRIPTION_METAFIELD_NAMESPACE
} from "@/shared/constants/bigcommerce";

@injectable()
export class ProductVariantController extends BaseBigCommerceController {
  public requiresAuth = true;
  public requiresUserStore = false;
  public query = new IdNumberRequest();
  public body = new SubConfigRequest();
  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const {
      variant: { product_id, id, sub_config }
    } = this.body;
    const value = JSON.stringify(sub_config);
    await this.bigApi.catalog.productVariantMeta.upsert(product_id, id, {
      key: SUBSCRIPTION_METAFIELD_KEY,
      value,
      namespace: SUBSCRIPTION_METAFIELD_NAMESPACE,
      permission_set: "read_and_sf_access"
    });
    await this.bigApi.catalog.productMeta.upsert(product_id, {
      permission_set: ProductMetaPermissionType.read_and_sf_access,
      namespace: SUBSCRIPTION_METAFIELD_NAMESPACE,
      key: SUBSCRIPTION_METAFIELD_KEY,
      value: JSON.stringify(this.body.subConfig),
      description: `Subscription config for ${SUBSCRIPTION_CHANNEL_NAME}`
    });
    return res.json({});
  }
}

export default appContainer
  .resolve(ProductVariantController)
  .addRequestType(RequestType.PUT)
  .getRouteHandler();
