import { DisplaySetting, Store, StoreSetting } from "@prisma/client";
import {
  SUBSCRIPTION_METAFIELD_KEY,
  SUBSCRIPTION_METAFIELD_NAMESPACE
} from "@/shared/constants/bigcommerce";
import { APP_URL } from "@/constants/common";
import BigBaseApi from "../big-base-api";

export default class WidgetApi extends BigBaseApi {
  public baseUri = "/content/widgets";

  /**
   * Create Widget
   * @param uuid widgetTemplateId widget  template ID
   * @param displaySetting DisplaySetting  widget display settings
   * @returns response
   */
  public async create(
    uuid: string,
    store: Store & {
      DisplaySetting: DisplaySetting;
      StoreSetting: StoreSetting;
    }
  ) {
    const displaySetting = store.DisplaySetting;

    const widget_config = {
      appUrl: APP_URL,
      apiToken: store.storefrontToken,
      subscriptionMetafieldNamespace: SUBSCRIPTION_METAFIELD_NAMESPACE,
      subscriptionMetafieldKey: SUBSCRIPTION_METAFIELD_KEY,
      widgetLabel: displaySetting.widgetLabel,
      widgetBgColor: displaySetting.widgetBgColor,
      widgetTextColor: displaySetting.widgetTextColor,
      buttonLabel: displaySetting.buttonLabel,
      buttonBgColor: displaySetting.buttonBgColor,
      buttonTextColor: displaySetting.buttonTextColor
    };

    const response = await this.client.post(this.baseUri, {
      name: "Subscription Widget",
      widget_template_uuid: uuid,
      widget_configuration: widget_config
    });

    return response;
  }

  /**
   * Update widget
   * @param uuid string widgetId
   * @param widget_template_uuid string  widget template ID
   * @param displaySetting DisplaySetting  widget display settings
   * @returns response
   */
  public async update(
    widget_uuid: string,
    widget_template_uuid: string,
    store: Store & {
      DisplaySetting: DisplaySetting;
      StoreSetting: StoreSetting;
    }
  ) {
    const displaySetting = store.DisplaySetting;

    const widget_config = {
      appUrl: APP_URL,
      apiToken: store.storefrontToken,
      subscriptionMetafieldNamespace: SUBSCRIPTION_METAFIELD_NAMESPACE,
      subscriptionMetafieldKey: SUBSCRIPTION_METAFIELD_KEY,
      widgetLabel: displaySetting.widgetLabel,
      widgetBgColor: displaySetting.widgetBgColor,
      widgetTextColor: displaySetting.widgetTextColor,
      buttonLabel: displaySetting.buttonLabel,
      buttonBgColor: displaySetting.buttonBgColor,
      buttonTextColor: displaySetting.buttonTextColor
    };

    const response = await this.client.put(`${this.baseUri}/${widget_uuid}`, {
      name: "Subscription Widget",
      widget_template_uuid: widget_template_uuid,
      widget_configuration: widget_config
    });

    return response;
  }

  /**
   *
   * @param widgetTemplateId string  widget template ID
   * @param store object  store configuration and widget display settings
   * @returns
   */
  public async upsert(
    widgetTemplateId: string,
    store: Store & {
      DisplaySetting: DisplaySetting;
      StoreSetting: StoreSetting;
    }
  ) {
    if (store.widgetId) {
      try {
        return await this.update(store.widgetId, widgetTemplateId, store);
      } catch (error) {
        console.log("widget upsert :: error :: ", error);
      }
    }

    return await this.create(widgetTemplateId, store);
  }
}
