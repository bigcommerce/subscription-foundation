import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import HttpStatus from "http-status-codes";
import { isNullOrUndefined } from "@/shared/utils/isNullOrUndefined";
import { StripeService } from "@/backend/services/stripe.service";

@injectable()
export class WebhooksController extends BaseBigCommerceController {
  public requiresAuth = false;
  public requiresStore = true;
  public stripeService: StripeService;
  public response: any;

  constructor() {
    super();
    this.stripeService = appContainer.resolve(StripeService);
  }

  /**
   * Routes the request to the appropriate method.
   */
  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    console.log("WebhooksController :: query :: ", this.query);
    console.log("WebhooksController :: body :: ", this.body);

    switch (_req.method ?? "") {
      /**
       * Send OK for CORS pre-flight request from the front-end widget js
       * front-end widget js location: /backend/services/bigcommerce/widgets/template.ts :: getTemplate
       */
      case RequestType.OPTIONS:
        res.status(HttpStatus.OK).send("ok");
        break;
      case RequestType.GET:
        break;
      case RequestType.POST:
        // Is the request an order create webhook?
        if (
          !isNullOrUndefined(this.body.scope) &&
          !isNullOrUndefined(this.body.data.type)
        ) {
          if (
            "store/order/created" == this.body.scope &&
            "order" == this.body.data.type
          ) {
            await this.orderCreated(res);
          }
        }

        break;
      case RequestType.DELETE:
        break;
      default:
        res.status(HttpStatus.METHOD_NOT_ALLOWED);
        break;
    }
  }

  protected async orderCreated(res) {
    // Init BigCommerce v2 api to get order and order products
    this.initBigApi("v2");

    // Get the order and products from the order id
    const order_id = this.body.data.id;
    const order: any = await this.bigApi.orders.get_order(order_id);
    const order_products = await this.bigApi.orders.get_order_products(
      order_id
    );

    console.log("BigCommerce Webhook :: Order Created :: order :: ", order);
    console.log("BigCommerce Webhook :: Order Created :: order_products :: ", order_products);

    // Set BigCommere store id
    this.stripeService.setStoreId(this.store.id);

    // Init Stripe with merchant token
    await this.stripeService.initStripe(true);

    // If payment hasn't gone through yet, return with no status
    // BigCommerce will try again and trigger the webhook
    if (isNullOrUndefined(order.payment_provider_id)) {
      console.log("BigCommerce Webhook :: Order Created :: Undefined order.payment_provider_id :: Waiting for webhook to be sent again");
      return;
    }
    const payment_intent = await this.stripeService.getPaymentIntent(
      order.payment_provider_id
    );

    const subscription_items = [];

    for (const i in order_products) {
      const product = order_products[i];

      // Get Stripe price id
      if (product.name.indexOf("price_") !== -1) {
        const pn_split = product.name.split("price_");
        const stripe_price_id = "price_" + pn_split[1];

        subscription_items.push({ price: stripe_price_id });
      }
    }

    if (!subscription_items.length) {
      return res.status(HttpStatus.OK).send("ok");
    }

    // Create subscription on Stripe
    const stripe_customer_id: string =
      typeof payment_intent.customer === "string"
        ? payment_intent.customer
        : "";
    const customer_payment_id: string =
      typeof payment_intent.payment_method === "string"
        ? payment_intent.payment_method
        : "";
    const subscription = await this.stripeService.createSubscription({
      customer: stripe_customer_id,
      items: subscription_items,
      default_payment_method: customer_payment_id,
      metadata: {
        bc_order_id: order_id
      }
    });

    console.log(
      "BigCommerce Webhook :: Order Created :: Stripe Create Subscription Response :: subscription :: ",
      subscription
    );

    this.initBigApi("v3");

    // Get current subscription ids
    const stripe_subscription_ids =
      (await this.bigApi.customers.getCustomerAttributeValue(
        "array",
        this.store.subscriptionsAttributeFieldId,
        order.customer_id
      )) || [];

    // Add new subscription id with any previous subscription ids
    stripe_subscription_ids.push(subscription.id);

    const subscription_id_response =
      await this.bigApi.customers.upsertCustomerAttributeValue(
        "array",
        this.store.subscriptionsAttributeFieldId,
        stripe_subscription_ids,
        order.customer_id
      );
    console.log(
      "BigCommerce Webhook :: Order Created :: Upsert Customer Attribute Value for Stripe Subscription IDs :: ",
      subscription_id_response
    );

    // Save Stripe customer id into BigCommerce store customer's account record
    // this will allow the customer to manage their subscription using Stripe's customer portal
    const customer_id_response =
      await this.bigApi.customers.upsertCustomerAttributeValue(
        "string",
        this.store.customerAttributeFieldId,
        stripe_customer_id,
        order.customer_id
      );
    console.log(
      "BigCommerce Webhook :: Order Created :: Upsert Customer Attribute Value for Stripe Customer ID :: ",
      customer_id_response
    );

    res.status(HttpStatus.OK).send("ok");
  }
}
export default appContainer
  .resolve(WebhooksController)
  .addRequestType(RequestType.OPTIONS)
  .addRequestType(RequestType.POST)
  .getRouteHandler();
