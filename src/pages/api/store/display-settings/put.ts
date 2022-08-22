import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { displaySettingClient, storeClient } from "@/backend/prisma";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { DisplaySettingPayload } from "@/shared/payloads/DisplaySettingPayload";
import HttpStatus from "http-status-codes";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import { STOREFRONT_CONTENT_MODE } from "@/constants/bigcommerce";

@injectable()
export class DisplaySettingController extends BaseBigCommerceController {
  public requiresAuth = true;
  public body = new DisplaySettingPayload();
  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const {
      widgetLabel,
      widgetBgColor,
      widgetTextColor,
      buttonLabel,
      buttonBgColor,
      buttonTextColor
    } = this.body;

    const inWidgetContentMode = (contentMode: string): boolean => {
      return contentMode === "widget"
    }

    // Upsert display settings for widget
    const displaySetting = await displaySettingClient.upsert({
      where: {
        storeId: this.store.id
      },
      create: {
        widgetLabel,
        widgetBgColor,
        widgetTextColor,
        buttonLabel,
        buttonBgColor,
        buttonTextColor,
        storeId: this.store.id
      },
      update: {
        widgetLabel,
        widgetBgColor,
        widgetTextColor,
        buttonLabel,
        buttonBgColor,
        buttonTextColor,
        storeId: this.store.id
      }
    });

    let updatedStoreData = {};

    this.store.DisplaySetting = displaySetting;

    if (inWidgetContentMode(STOREFRONT_CONTENT_MODE)) {
      // This mode uses the Widgets API

      // Create/update widget template
      const widgetTemplateData = await this.bigApi.widgets.template.upsert(
        this.store
      );
      const widgetTemplateId = widgetTemplateData.data.uuid;

      // Create/update a widget after creating/updating a widget template
      const widgetData = await this.bigApi.widgets.widget.upsert(
        widgetTemplateId,
        this.store
      );
      const widgetId = widgetData.data.uuid;

      // Create/update the placement after creating/updating the widget
      const widgetPlacementData = await this.bigApi.widgets.placement.upsert(
        widgetId,
        this.store
      );
      const widgetPlacementId = widgetPlacementData.data.uuid;

      updatedStoreData = {
        widgetId: widgetId,
        widgetTemplateId: widgetTemplateId,
        widgetPlacementId: widgetPlacementId
      };
    } else {
      // This mode uses the Scripts API

      // Create/update script
      const scriptData = await this.bigApi.scripts.upsert(this.store);

      updatedStoreData = {
        scriptId: scriptData.data.uuid
      };
    }

    // Get BigCommerce store information
    this.initBigApi("v2");
    const storeInfo: any = await this.bigApi.store.get();

    // Create GraphQL Token for the default BigCommerce storefront if one doesn't exist on store record
    this.initBigApi("v3");
    let storefrontTokenUpdate = {};
    if (!this.store?.storefrontToken?.length) {
      const graphToken = await this.bigApi.graphql.createToken(
        1,
        storeInfo.secure_url
      );

      storefrontTokenUpdate = {
        storefrontToken: graphToken.data?.token
      };
    }

    // Initialize Customer Attributes
    const customerAttributeIds =
      await this.bigApi.customers.upsertInitialCustomerAttributes();
    const customerAttributesUpdate = {
      customerAttributeFieldId:
        customerAttributeIds[process.env.SUBSCRIPTION_CUSTOMER_ATTRIBUTE_NAME],
      subscriptionsAttributeFieldId:
        customerAttributeIds[process.env.SUBSCRIPTION_IDS_ATTRIBUTE_NAME]
    };

    // Update store record with secure store URL and the script or widget ids from the upsert process above
    await storeClient.update({
      where: {
        id: this.store.id
      },
      data: {
        ...updatedStoreData,
        ...storefrontTokenUpdate,
        ...customerAttributesUpdate,
        url: storeInfo.secure_url
      }
    });

    res.status(HttpStatus.NO_CONTENT).json(null);
  }
}

export default appContainer
  .resolve(DisplaySettingController)
  .addRequestType(RequestType.PUT)
  .getRouteHandler();
