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
export class StripeProductPriceController extends BaseStripeController {
  public query = new IdStringRequest();
  public body: any = this.body;
  public response: Stripe.Response<Stripe.Price>;

  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    // set store id
    this.stripeService.setStoreId(this.store.id);

    // init stripe with merchant token
    await this.stripeService.initStripe(true);

    switch (_req.method ?? "") {
      case RequestType.GET:
        await this.getStripePrice(_req, res);
        break;
      case RequestType.POST:
        if ("create" == this.query.id) {
          this.body = <Stripe.PriceCreateParams>this.body;
          this.createStripePrice(_req, res);
        } else {
          this.body = <Stripe.PriceUpdateParams>this.body;
          this.updateStripePrice(_req, res);
        }
        break;
      default:
        return res.status(HttpStatus.METHOD_NOT_ALLOWED);
    }
  }

  /**
   * Get a single Stripe price
   * @param _req
   * @param res
   */
  protected async getStripePrice(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    this.response = await this.stripeService.stripe.prices.retrieve(
      this.query.id
    );
    if (isNullOrUndefined(this.response)) {
      throw new HttpError("Stripe price not found", HttpStatus.NOT_FOUND);
    }

    res.json(this.response);
  }

  /**
   * Create Stripe product
   */
  protected async createStripePrice(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    this.response = await this.stripeService.stripe.prices.create(this.body, {
      idempotencyKey: uuidv4()
    });
    if (isNullOrUndefined(this.response)) {
      throw new HttpError(
        "Unable to create stripe price",
        HttpStatus.UNPROCESSABLE_ENTITY
      );
    }
    res.status(HttpStatus.CREATED).json(this.response);
  }

  /**
   * Update Stripe product
   */
  protected async updateStripePrice(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    if (this.body.active) {
      this.response = await this.stripeService.stripe.prices.update(
        this.query.id,
        this.body
      );
      if (isNullOrUndefined(this.response)) {
        throw new HttpError(
          "Unable to update the stripe price",
          HttpStatus.UNPROCESSABLE_ENTITY
        );
      }
    }
    res.status(HttpStatus.OK).json(this.response);
  }
}

export default appContainer
  .resolve(StripeProductPriceController)
  .addRequestType(RequestType.GET)
  .addRequestType(RequestType.POST)
  .getRouteHandler();
