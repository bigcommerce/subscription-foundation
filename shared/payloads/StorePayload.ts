import { IsOptional } from "class-validator";
import { DisplaySettingPayload } from "./DisplaySettingPayload";
import { StoreSettingPayload } from "./StoreSettingPayload";
import { StripePayload } from "./StripePayload";
import { UserPayload } from "./UserPayload";

export class StorePayload implements BodyRequest {
  @IsOptional()
  id?: number;
  hash?: string;
  url?: string;
  customerAttributeFieldId?: number;
  subscriptionsAttributeFieldId?: number;
  stripe?: StripePayload;
  storeSetting: StoreSettingPayload;
  users?: UserPayload[];
  createdAt?: Date;
  updatedAt?: Date;
  displaySetting: DisplaySettingPayload;
}
