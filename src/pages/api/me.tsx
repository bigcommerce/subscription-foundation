import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { UserTransformer } from "@/backend/transformers/UserTransformer";
import { StoreTransformer } from "@/backend/transformers/StoreTransformer";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";

@injectable()
export class MeController extends BaseBigCommerceController {
  public requiresAuth = false;
  public requiresUserStore = true;

  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    res.json({
      user: new UserTransformer().getJSON(this.user),
      store: new StoreTransformer().getJSON(this.store)
    });
  }
}

export default appContainer
  .resolve(MeController)
  .addRequestType(RequestType.GET)
  .getRouteHandler();
