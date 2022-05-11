import { NextApiRequest } from "@/types/next";
import { DisplaySetting, Store, StoreSetting, User } from "@prisma/client";
import { verifyUserAndStore } from "../middlewares/auth";
import { getUserAndStore } from "@/shared/handlers/getUserAndStore";
import { ApiRouteController } from "./api-route-controller";
import { storeClient } from "@/backend/prisma";

/**
 * Controller class that provides API routing with
 * request authentication flows.
 */
export abstract class AuthApiController extends ApiRouteController {
  //#region Properties

  public requiresAuth = true;
  public requiresStore = false;
  public requiresUserStore = false;
  public frontendApi = false;

  protected user: User;
  protected store: Store & {
    DisplaySetting: DisplaySetting;
    StoreSetting: StoreSetting;
  };
  
  //#endregion

  //#region Private Methods

  protected override async beforeRun(req?: NextApiRequest): Promise<void> {
    if (this.requiresAuth) {
      const { user, store } = await verifyUserAndStore(req);

      this.user = user;
      this.store = store;
    } else if(this.requiresStore) {      
      const origin = req.headers?.origin;
      const producer = this.body?.producer;
      
      let where = {};

      if (producer || origin) {
        if (producer) {
          const storeHash = producer.split('/')[1]

          where = {
            hash: storeHash
          }
        } else {
          where = {
            url: origin
          }
        }

        this.store = (await storeClient.findFirst({ where })) as any;
      }
    } else if(this.requiresUserStore) {
      const { user, store } = await getUserAndStore(req.cookies);

      this.user = user;
      this.store = store;
    }
 
  }

  //#region
}