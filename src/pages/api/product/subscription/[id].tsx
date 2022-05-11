import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { IdNumberRequest } from "@/requests/IdRequest";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import { ProductMetaPermissionType } from "@/backend/services/bigcommerce/catalog/product-meta";
import ProductSubConfigPayload from "@/shared/payloads/product/ProductSubConfigPayload";
import {
  SUBSCRIPTION_CHANNEL_NAME,
  SUBSCRIPTION_METAFIELD_KEY,
  SUBSCRIPTION_METAFIELD_NAMESPACE
} from "@/shared/constants/bigcommerce";

@injectable()
export class ProductSubscriptionController extends BaseBigCommerceController {
  public requiresAuth = true;
  public requiresUserStore = false;
  public query = new IdNumberRequest();
  public body = new ProductSubConfigPayload();
  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const ret = await this.bigApi.catalog.productMeta.upsert(this.query.id, {
      permission_set: ProductMetaPermissionType.read_and_sf_access,
      namespace: SUBSCRIPTION_METAFIELD_NAMESPACE,
      key: SUBSCRIPTION_METAFIELD_KEY,
      value: JSON.stringify(this.body),
      description: `Subscription config for ${SUBSCRIPTION_CHANNEL_NAME}`
    });

    return res.json(ret);
  }
}

export default appContainer
  .resolve(ProductSubscriptionController)
  .addRequestType(RequestType.PUT)
  .getRouteHandler();
