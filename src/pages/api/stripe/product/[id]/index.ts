import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseStripeController } from "@/backend/controllers/base-stripe-controller";
import { IdStringRequest } from "@/requests/IdStringRequest";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import Stripe from "stripe";
import HttpStatus from "http-status-codes";
import HttpError from "@/backend/exceptions/http-error";
import { isNullOrUndefined } from "@/shared/utils/isNullOrUndefined";
import { v4 as uuidv4 } from "uuid";

@injectable()
export class StripeProductController extends BaseStripeController {
  public query = new IdStringRequest();
  public body: any = this.body;
  public response: Stripe.Response<Stripe.Product>;

  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    // set store id
    this.stripeService.setStoreId(this.store.id);

    // init stripe with merchant token
    await this.stripeService.initStripe(true);

    if ("create" == this.query.id) {
      this.body = <Stripe.ProductCreateParams>this.body;
      await this.createStripeProduct(_req, res);
    } else {
      this.body = <Stripe.ProductUpdateParams>this.body;
      await this.updateStripeProduct(_req, res);
    }
  }

  /**
   * Create Stripe Product
   */
  protected async createStripeProduct(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    this.response = await this.stripeService.stripe.products.create(this.body, {
      idempotencyKey: uuidv4()
    });

    if (isNullOrUndefined(this.response)) {
      throw new HttpError("Stripe product not found", HttpStatus.NOT_FOUND);
    }

    res.status(HttpStatus.CREATED).json(this.response);
  }

  /**
   * Update Stripe Product
   */
  protected async updateStripeProduct(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    this.response = await this.stripeService.stripe.products.update(
      this.query.id,
      this.body
    );

    if (isNullOrUndefined(this.response)) {
      throw new HttpError(
        "Unable to update the stripe product",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }

    res.status(HttpStatus.OK).json(this.response);
  }
}

export default appContainer
  .resolve(StripeProductController)
  .addRequestType(RequestType.POST)
  .getRouteHandler();
