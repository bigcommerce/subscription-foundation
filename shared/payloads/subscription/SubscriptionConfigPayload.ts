import { Type } from "class-transformer";
import { ValidateNested, ArrayMinSize, IsOptional } from "class-validator";
import SubscriptionOptionPayload from "./SubscriptionOptionPayload";

export default class SubscriptionConfigPayload implements BodyRequest {
  constructor(str = null) {
    const data = str ? JSON.parse(str) : {};
    this.is_enabled = data?.is_enabled ?? true;
    this.onetime_purchase = data?.onetime_purchase ?? true;
    this.default_option_id = data?.default_option_id ?? undefined;
    this.options = data?.options ?? [];
    this.archive_stripe_price_ids = data?.archive_stripe_price_ids ?? [];
  }

  @Type(() => Boolean)
  @IsOptional()
  is_enabled?: boolean;
  @Type(() => Boolean)
  @IsOptional()
  onetime_purchase?: boolean;
  @Type(() => String)
  @IsOptional()
  default_option_id?: string;
  @Type(() => SubscriptionOptionPayload)
  @ValidateNested()
  @ArrayMinSize(1)
  @IsOptional()
  options?: SubscriptionOptionPayload[];
  @Type(() => Array)
  @IsOptional()
  archive_stripe_price_ids?: string[];
}
