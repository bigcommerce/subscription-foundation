import { StorePayload } from "@/shared/payloads/StorePayload";
import { DisplaySetting, Store, StoreSetting, Stripe } from "@prisma/client";
import { BaseTransformer } from "./BaseTransformer";
import { DisplaySettingTransformer } from "./DisplaySettingTransformer";
import { StoreSettingTransformer } from "./StoreSettingTransformer";
import { StripeTransformer } from "./StripeTransformer";

export class StoreTransformer extends BaseTransformer<Store, StorePayload> {
  public getDefault(): StorePayload {
    return {
      storeSetting: new StoreSettingTransformer().getJSON(null),
      displaySetting: new DisplaySettingTransformer().getJSON(null)
    };
  }

  public transform({
    id,
    hash,
    url,
    customerAttributeFieldId,
    subscriptionsAttributeFieldId,
    DisplaySetting,
    StoreSetting,
    Stripe,
    createdAt,
    updatedAt
  }: Store & {
    DisplaySetting: DisplaySetting;
    StoreSetting: StoreSetting;
    Stripe: Stripe;
  }): StorePayload {
    return {
      id,
      hash,
      url,
      customerAttributeFieldId,
      subscriptionsAttributeFieldId,
      createdAt,
      updatedAt,
      storeSetting: new StoreSettingTransformer().getJSON(StoreSetting),
      displaySetting: new DisplaySettingTransformer().getJSON(DisplaySetting),
      stripe: new StripeTransformer().getJSON(Stripe)
    };
  }
}
