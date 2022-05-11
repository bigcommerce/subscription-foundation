import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { userClient, storeClient, usersOnStoresClient } from "@/backend/prisma";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import crypto from "crypto";

@injectable()
export class AuthController extends BaseBigCommerceController {
  public requiresAuth = false;
  public requiresUserStore = false;
  public async run(
    req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const authData = await this.BigCommerceClient.authorize(req.query);
    const accessToken: string = authData.access_token;
    const storeHash: string = authData.context.split("/")[1];

    // Create or update the user
    this.user = await userClient.upsert({
      where: {
        id: authData.user.id
      },
      create: {
        id: authData.user.id,
        token: crypto.randomBytes(30).toString("hex"),
        email: authData.user.email,
        username: authData.user.username
      },
      update: {
        email: authData.user.email,
        username: authData.user.username
      }
    });

    // Create or update the store
    this.store = (await storeClient.upsert({
      where: {
        hash: storeHash
      },
      create: {
        hash: storeHash,
        accessToken
      },
      update: {
        accessToken
      }
    })) as any;

    await usersOnStoresClient.upsert({
      where: {
        userId_storeId: {
          userId: this.user.id,
          storeId: this.store.id
        }
      },
      create: {
        userId: this.user.id,
        storeId: this.store.id
      },
      update: {}
    });

    // Update BigCommerce API client with store hash and access token
    this.initBigApi();

    // Initialize BigCommerce webhooks
    this.bigApi.webhooks.initAppWebhooks();

    return await this.authFlow(req, res, true);
  }
}

export default appContainer
  .resolve(AuthController)
  .addRequestType(RequestType.GET)
  .getRouteHandler();
