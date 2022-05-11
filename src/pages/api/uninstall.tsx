import { NextApiRequest } from "@/types/next";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { NextApiResponse } from "next";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";

@injectable()
export class UninstallController extends BaseBigCommerceController {
  public requiresAuth = false;
  public requiresUserStore = false;
  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    console.log("Uninstall callback received");

    // If not responding to a callback, go to onboarding page
    return res.redirect(`/`);
  }
}

export default appContainer
  .resolve(UninstallController)
  .addRequestType(RequestType.GET)
  .getRouteHandler();
