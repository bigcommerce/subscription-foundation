import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { IdStringRequest } from "@/requests/IdStringRequest";
import { BaseStripeController } from "@/backend/controllers/base-stripe-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import Stripe from "stripe";
import HttpStatus from "http-status-codes";
import HttpError from "@/backend/exceptions/http-error";
import { isNullOrUndefined } from "@/shared/utils/isNullOrUndefined";

@injectable()
export class StripeProductPriceController extends BaseStripeController {
  public query = new IdStringRequest();
  public response: Stripe.ApiList<Stripe.Price>;

  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    // set store id
    this.stripeService.setStoreId(this.store.id);

    // init stripe with merchant token
    await this.stripeService.initStripe(true);

    // get all stripe prices
    this.response = await this.stripeService.stripe.prices.list();

    if (isNullOrUndefined(this.response)) {
      throw new HttpError("Stripe prices not found", HttpStatus.NOT_FOUND);
    }
    res.json(this.response);
  }
}

export default appContainer
  .resolve(StripeProductPriceController)
  .addRequestType(RequestType.GET)
  .getRouteHandler();
