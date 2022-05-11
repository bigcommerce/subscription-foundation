import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { userClient, storeClient, usersOnStoresClient } from "@/backend/prisma";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import crypto from "crypto";

@injectable()
export class LoadController extends BaseBigCommerceController {
  public requiresAuth = false;
  public requiresUserStore = false;
  public async run(
    req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const data = this.BigCommerceClient.verify(req.query["signed_payload"]);

    this.user = await userClient.upsert({
      where: {
        id: data.user.id
      },
      create: {
        id: data.user.id,
        token: crypto.randomBytes(30).toString("hex"),
        email: data.user.email,
        username: data.user.username
      },
      update: {}
    });

    // Find store by hash
    this.store = (await storeClient.findUnique({
      where: {
        hash: data.store_hash
      }
    })) as any;

    if (!this.store) new Error(`No store found with hash: ${data.store_hash}`);

    // Create or update the store
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

    return await this.authFlow(req, res);
  }
}

export default appContainer
  .resolve(LoadController)
  .addRequestType(RequestType.GET)
  .getRouteHandler();
