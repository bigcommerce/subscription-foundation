import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional } from "class-validator";

export default class ProductSubConfigPayload implements BodyRequest {
  constructor(str = null) {
    const data = str ? JSON.parse(str) : {};
    this.stripe_product_id = data?.stripe_product_id ?? null;
    this.is_enabled = data?.is_enabled ?? true;
    this.configsCount = data?.configsCount ?? 0;
    this.optionsCount = data?.optionsCount ?? 0;
  }
  @IsOptional()
  stripe_product_id?: string;
  @Type(() => Boolean)
  @IsBoolean()
  @IsOptional()
  is_enabled?: boolean;
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  configsCount?: number;
  @Type(() => Number)
  @IsNumber()
  @IsOptional()
  optionsCount?: number;
}
