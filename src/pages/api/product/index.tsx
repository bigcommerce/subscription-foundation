import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import ProductPayload from "@/shared/payloads/product/ProductPayload";

@injectable()
export class ProductController extends BaseBigCommerceController {
  public requiresAuth = true;
  public requiresUserStore = false;
  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const channel_id: string = _req.cookies?.channel_id;
    const products = await this.bigApi.channels.listings.get(channel_id);
    const detailedProducts: ProductPayload[] = await Promise.all(
      products.map(async product => {
        return await this.bigApi.catalog.products.get(product.product_id);
      })
    );

    res.json(detailedProducts);
  }
}

export default appContainer
  .resolve(ProductController)
  .addRequestType(RequestType.GET)
  .getRouteHandler();
