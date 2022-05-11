import { DiscountUnitType } from "@/shared/enums/DiscountUnitType";
import { FrequencyType } from "@/shared/enums/FrequencyType";
import { Type } from "class-transformer";
import { IsInt, IsEnum, IsString } from "class-validator";

export default class SubscriptionOptionPayload {
  @Type(() => String)
  id: string;
  @Type(() => String)
  @IsString()
  stripe_price_id?: string;
  @Type(() => Number)
  @IsInt()
  frequency: number;
  @IsEnum(FrequencyType)
  type: FrequencyType;
  @Type(() => Number)
  @IsInt()
  discount: number;
  @IsEnum(DiscountUnitType)
  unit: DiscountUnitType;
  @Type(() => String)
  @IsString()
  calculated_price_decimal?: string;
}
