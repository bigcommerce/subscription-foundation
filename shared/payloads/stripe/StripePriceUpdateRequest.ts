import { IsOptional, IsString, IsBoolean, IsObject } from "class-validator";

/**
 * Stripe Price Update Request
 * 
 * @param active boolean  Optional. Whether the price can be used for new purchases. Defaults to true.
 * @param metadata object  Optional. Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata.
 * @param nickname string  Optional. A brief description of the price, hidden from customers.
 * @param lookup_key string  Optional. A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.
 * @param tax_behavior string  Optional. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of inclusive, exclusive, or unspecified. Once specified as either inclusive or exclusive, it cannot be changed.
 * @param transfer_lookup_key boolean  Optional. If set to true, will atomically remove the lookup key from the existing price, and assign it to this price. 
*/ 
export default class StripePriceUpdateRequest implements BodyRequest {
  @IsOptional()
  @IsBoolean()
  active: boolean;
  @IsOptional()
  @IsObject()
  metadata: {};
  @IsOptional()
  @IsString()
  nickname: string;
  @IsOptional()
  @IsString()
  lookup_key: string;
  @IsOptional()
  @IsString()
  tax_behavior: string;
  @IsOptional()
  @IsBoolean()
  transfer_lookup_key: boolean;
}