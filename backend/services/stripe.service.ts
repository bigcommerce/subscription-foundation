import Stripe from "stripe";
import dotenv from "dotenv";
import { stripeClient } from "@/backend/prisma";
import { v4 as uuidv4 } from "uuid";
import { singleton } from "tsyringe";

dotenv.config();

@singleton()
export class StripeService {
  //#region Properties

  public stripe: Stripe;
  public stripeClient: typeof stripeClient;
  public store_id: number;

  //#endregion

  //#region Public Methods

  /**
   * Initalize Stripe
   * @param authorizeMerchant boolean  Optional. If true, auths Stripe with merchant token
   */
  public async initStripe(authorizeMerchant: boolean): Promise<void> {
    // Set Prisma Stripe client
    this.stripeClient = stripeClient;

    if (authorizeMerchant) {
      const merchant_id = await this.getMerchantId();

      // Initalize Stripe module with merchant access token
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        stripeAccount: merchant_id,
        apiVersion: null
      });
    } else {
      // Initalize Stripe module with app secret key
      this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
        apiVersion: null
      });
    }
  }

  /**
   * Connect to Stripe
   * @param code string  Required. Stripe authorization code
   * @returns
   */
  public async connectAccount(code: string): Promise<Stripe.OAuthToken> {
    const tokenResponse = await this.stripe.oauth.token({
      grant_type: "authorization_code",
      code
    });
    return tokenResponse;
  }

  /**
   * Set BigCommerce Store ID
   * @param store_id number  Required.
   */
  public setStoreId(store_id: number) {
    this.store_id = store_id;
  }

  public async createCustomer(
    params: Stripe.CustomerCreateParams
  ): Promise<Stripe.Response<Stripe.Customer>> {
    return await this.stripe.customers.create(params, {
      idempotencyKey: uuidv4()
    });
  }

  public async createPaymentMethod(
    params: Stripe.PaymentMethodCreateParams
  ): Promise<Stripe.Response<Stripe.PaymentMethod>> {
    return await this.stripe.paymentMethods.create(params, {
      idempotencyKey: uuidv4()
    });
  }

  public async getPaymentIntent(id: string) {
    return await this.stripe.paymentIntents.retrieve(id);
  }

  /**
   * Create Subscription
   * https://stripe.com/docs/billing/subscriptions/overview
   * @param   customer_id          Stripe.SubscriptionCreateParams  Required. Stripe subscription create parameters
   * @returns Stripe.Subscription
   */
  public async createSubscription(
    params: Stripe.SubscriptionCreateParams
  ): Promise<Stripe.Response<Stripe.Subscription>> {
    return await this.stripe.subscriptions.create(params);
  }

  //#endregion

  //#region Private Methods

  /**
   * Get Stripe merchant id
   **/
  private async getMerchantId(): Promise<string> {
    const merchantStripeResponse = await this.stripeClient.findUnique({
      where: {
        storeId: this.store_id
      },
      select: {
        stripeUserId: true
      }
    });
    return merchantStripeResponse.stripeUserId;
  }

  //#endregion
}
