import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { IdNumberRequest } from "@/requests/IdRequest";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import SubscriptionConfigPayload from "@/shared/payloads/subscription/SubscriptionConfigPayload";
import { SUBSCRIPTION_METAFIELD_KEY } from "@/shared/constants/bigcommerce";

@injectable()
export class ProductVariantController extends BaseBigCommerceController {
  public requiresAuth = true;
  public requiresUserStore = false;
  public query = new IdNumberRequest();

  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const product = await this.bigApi.catalog.products.get(this.query.id, {
      include: "primary_image,variants"
    });

    product.variants = await Promise.all(
      product.variants.map(async variant => {
        const meta = await this.bigApi.catalog.productVariantMeta.get(
          product.id,
          variant.id,
          SUBSCRIPTION_METAFIELD_KEY
        );
        variant.sub_config = new SubscriptionConfigPayload(meta?.value);
        return variant;
      })
    );
    return res.json(product);
  }
}

export default appContainer
  .resolve(ProductVariantController)
  .addRequestType(RequestType.GET)
  .getRouteHandler();
