import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { setCookieOnBackend } from "@/frontend/utils/cookies";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import { BC_APP_ID, SUBSCRIPTION_CHANNEL_NAME } from "@/shared/constants/bigcommerce";
import ChannelPayload from "@/shared/types/big-commerce/ChannelPayload";

@injectable()
export class ChannelController extends BaseBigCommerceController {
  public requiresAuth = true;
  public requiresUserStore = false;
  public channel: ChannelPayload;
  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    this.channel = await this.bigApi.channels.upsert({
      name: SUBSCRIPTION_CHANNEL_NAME,
      status: "connected",
      is_listable_from_ui: true,
      type: "marketing",
      platform: "custom",
      is_visible: true,
      config_meta: {
        app: {
          id: BC_APP_ID,
          sections: [
            {
              title: "Products",
              query_path: "products"
            },
            {
              title: "Settings",
              query_path: "settings"
            },
            {
              title: "Support",
              query_path: "support"
            }
          ]
        }
      }
    });

    setCookieOnBackend(res, "channel_id", this.channel.id);

    res.json(this.channel);
  }
}

export default appContainer
  .resolve(ChannelController)
  .addRequestType(RequestType.PUT)
  .getRouteHandler();
