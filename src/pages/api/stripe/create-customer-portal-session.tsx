import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { BigApi } from "@/backend/services/bigcommerce";
import BigCommerce from "node-bigcommerce";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseStripeController } from "@/backend/controllers/base-stripe-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import Stripe from "stripe";
import {
  BC_APP_CLIENT_ID,
  BC_APP_SECRET,
  BC_APP_CALLBACK_URL
} from "@/shared/constants/bigcommerce";
import { CUSTOMER_PORTAL_HEADLINE } from "@/constants/stripe";

@injectable()
export class StripeCustomerPortalController extends BaseStripeController {
  public requiresAuth = false;
  public requiresStore = true;
  public body: any = this.body;
  public response: Stripe.Response<Stripe.BillingPortal.Session>;

  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const config: Stripe.BillingPortal.ConfigurationCreateParams = {
      business_profile: {
        headline: CUSTOMER_PORTAL_HEADLINE,
        privacy_policy_url: this.store.url + "/privacy",
        terms_of_service_url: this.store.url + "/terms-of-service"
      },
      features: {
        customer_update: {
          allowed_updates: ["email", "tax_id"],
          enabled: true
        },
        invoice_history: {
          enabled: true
        },
        payment_method_update: {
          enabled: true
        },
        subscription_cancel: {
          enabled: true,
          mode: "immediately",
          proration_behavior: "none"
        }
      }
    };

    const { bigcommerce_id, bigcommerce_email, stripe_id } = this.body;

    const BigCommerceClient = new BigCommerce({
      accessToken: this.store.accessToken,
      storeHash: this.store.hash,
      clientId: BC_APP_CLIENT_ID,
      secret: BC_APP_SECRET,
      callback: BC_APP_CALLBACK_URL,
      apiVersion: "v3"
    });
    const bigApi = new BigApi(BigCommerceClient);

    // Validate the request by making sure the passed Stripe customer id matches what exists on the BigCommerce customer record
    const validCustomerAndEmail =
      await bigApi.customers.validateCustomerIdAndEmail(
        bigcommerce_id,
        bigcommerce_email
      );
    const validSubscriptionCustomer =
      await bigApi.customers.validateCustomerIdAttribute(
        this.store.customerAttributeFieldId,
        bigcommerce_id,
        stripe_id
      );

    if (validCustomerAndEmail && validSubscriptionCustomer) {
      // Set BigCommerce store id
      this.stripeService.setStoreId(this.store.id);

      // Init Stripe with merchant token
      await this.stripeService.initStripe(true);

      // Configure Stripe customer portal before creating session
      const configuration =
        await this.stripeService.stripe.billingPortal.configurations.create(
          config
        );

      // Create Stripe portal session
      this.response =
        await this.stripeService.stripe.billingPortal.sessions.create({
          customer: stripe_id,
          return_url: this.store.url + "/account.php",
          configuration: configuration.id
        });

      res.redirect(302, this.response.url);
    } else {
      // The request parameters could not be validated
      res.status(404).end("Not Found");
    }
  }
}

export default appContainer
  .resolve(StripeCustomerPortalController)
  .addRequestType(RequestType.POST)
  .getRouteHandler();
