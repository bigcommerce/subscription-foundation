import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { storeClient } from "@/backend/prisma";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseStripeController } from "@/backend/controllers/base-stripe-controller";
import { StoreTransformer } from "@/backend/transformers/StoreTransformer";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";

@injectable()
export class StripeConnectController extends BaseStripeController {
  public async run(
    req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    this.stripeService.initStripe(false);
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      stripe_publishable_key: publishableKey,
      stripe_user_id: stripeUserId
    } = await this.stripeService.connectAccount(req.body.code);

    // Initialize Stripe API
    this.stripeService.initStripe(false);

    const stripeAccount = await this.stripeService.stripe.accounts.retrieve(
      stripeUserId
    );

    await this.stripeService.stripeClient.upsert({
      where: {
        storeId: this.store.id
      },
      create: {
        accessToken,
        refreshToken,
        publishableKey,
        email: stripeAccount.email,
        dashboardDisplayName: stripeAccount.settings.dashboard.display_name,
        stripeUserId,
        storeId: this.store.id
      },
      update: {
        accessToken,
        email: stripeAccount.email,
        dashboardDisplayName: stripeAccount.settings.dashboard.display_name,
        refreshToken,
        publishableKey,
        stripeUserId,
        storeId: this.store.id
      }
    });
    const store = await storeClient.findUnique({
      where: {
        id: this.store.id
      },
      include: {
        DisplaySetting: true,
        StoreSetting: true,
        Stripe: true
      }
    });
    return res.json(new StoreTransformer().getJSON(store));
  }
}

export default appContainer
  .resolve(StripeConnectController)
  .addRequestType(RequestType.POST)
  .getRouteHandler();
