import { AuthApiController } from "./auth-api-controller";
import { BigApi } from "../services/bigcommerce";
import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { setCookieOnBackend } from "@/frontend/utils/cookies";
import {
  BC_APP_ID,
  BC_APP_CLIENT_ID,
  BC_APP_SECRET,
  BC_APP_CALLBACK_URL,
  SUBSCRIPTION_CHANNEL_NAME
} from "@/shared/constants/bigcommerce";
import { isNullOrUndefined } from "@/shared/utils/isNullOrUndefined";
import BigCommerce from "node-bigcommerce";

export abstract class BaseBigCommerceController extends AuthApiController {
  //#region Properties

  public BigCommerceClient: BigCommerce;
  public bigApi: BigApi;

  //#endregion

  //#region Protected Methods

  constructor() {
    super();
    this.BigCommerceClient = new BigCommerce({
      logLevel: "info",
      accessToken: null,
      clientId: BC_APP_CLIENT_ID,
      secret: BC_APP_SECRET,
      callback: BC_APP_CALLBACK_URL,
      responseType: "json",
      apiVersion: "v3"
    });
  }

  protected override async beforeRun(req?: NextApiRequest): Promise<void> {
    await super.beforeRun(req);
    this.initBigApi();
  }

  //#endregion

  //#region Public Methods

  /**
   * Initialize BigCommerce API
   * The majority of API calls use v3 but some require v2
   * @param  api_version  string - Version of the BigCommerce API to use (v2 or v3)
   */
  public initBigApi(
    api_version = "v3",
    response_type = "json",
    log_level = "info"
  ) {
    this.BigCommerceClient = new BigCommerce({
      logLevel: log_level,
      accessToken: null,
      clientId: BC_APP_CLIENT_ID,
      secret: BC_APP_SECRET,
      callback: BC_APP_CALLBACK_URL,
      responseType: response_type,
      apiVersion: api_version
    });

    if (
      !isNullOrUndefined(this.store) &&
      !isNullOrUndefined(this.store.accessToken) &&
      !isNullOrUndefined(this.store.hash)
    ) {
      this.BigCommerceClient.config.accessToken = this.store.accessToken;
      this.BigCommerceClient.config.storeHash = this.store.hash;
      this.bigApi = new BigApi(this.BigCommerceClient);
    }
  }

  public async authFlow(
    req: NextApiRequest,
    res: NextApiResponse,
    reset = false
  ) {
    const channelFound = await this.bigApi.channels.find(
      SUBSCRIPTION_CHANNEL_NAME
    );

    setCookieOnBackend(res, "token", this.user.token);
    setCookieOnBackend(res, "store_id", this.store.id);

    // If store already has a channel with the same name, skip channel creation
    if (channelFound) {
      if (reset || !["connected", "active"].includes(channelFound.status)) {
        await this.bigApi.channels.update(channelFound.id, {
          is_visible: false,
          is_listable_from_ui: false,
          is_enabled: false,
          config_meta: {
            app: {
              id: BC_APP_ID,
              sections: null
            }
          }
        });
      } else {
        setCookieOnBackend(res, "channel_id", channelFound.id);

        // Redirect to requested page if the "section" query string is present. Otherwise, redirect to the products page.
        const slug = req.query["section"] ?? "products";
        return res.redirect(`/${slug}`);
      }
    }

    return res.redirect(`/`);
  }

  //#endregion
}
