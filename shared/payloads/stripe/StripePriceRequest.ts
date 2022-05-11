import StripePriceRecurringPayload from "./StripePriceRecurringPayload";
import StripePriceProductDataPayload from "./StripePriceProuctDataPayload";
import StripePriceTiersPayload from "./StripePriceTiersPayload";
import StripePriceTransformQuantityPayload from "./StripePriceTransformQuantityPayload";
import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  MaxLength,
  IsObject,
  IsLowercase
} from "class-validator";

/**
 * Stripe Price Request
 *
 * @param currency            string                              Required. Three-letter ISO currency code, in lowercase. Must be a supported currency.
 * @param product             string                              Required. The ID of the product that this price will belong to.
 * @param unit_amount         number                              Required. A positive integer in cents (or 0 for a free price) representing how much to charge.
 * @param active              boolean                             Optional. Whether the price can be used for new purchases. Defaults to true.
 * @param metadata            object                              Optional. Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata.
 * @param nickname            string                              Optional. A brief description of the price, hidden from customers.
 * @param recurring           StripePriceRecurringPayload         Optional. The recurring components of a price such as interval and usage_type.
 * @param product_data        StripePriceProductDataPayload       REQUIRED UNLESS PRODUCT IS PROVIDED. These fields can be used to create a new product that this price will belong to.
 * @param tiers               StripePriceTiersPayload             REQUIRED IF BILLING_SCHEME=TIERED. Each element represents a pricing tier. This parameter requires billing_scheme to be set to tiered. See also the documentation for billing_scheme.
 * @param tiers_mode          string                              REQUIRED IF BILLING_SCHEME=TIERED. Defines if the tiering price should be graduated or volume based. In volume-based tiering, the maximum quantity within a period determines the per unit price, in graduated tiering pricing can successively change as the quantity grows.
 * @param billing_scheme      string                              Optional. Describes how to compute the price per period. Either per_unit or tiered. per_unit indicates that the fixed amount (specified in unit_amount or unit_amount_decimal) will be charged per unit in quantity (for prices with usage_type=licensed), or per unit of total usage (for prices with usage_type=metered). tiered indicates that the unit pricing will be computed using a tiering strategy as defined using the tiers and tiers_mode attributes.
 * @param lookup_key          string                              Optional. A lookup key used to retrieve prices dynamically from a static string. This may be up to 200 characters.
 * @param tax_behavior        string                              Optional. Specifies whether the price is considered inclusive of taxes or exclusive of taxes. One of inclusive, exclusive, or unspecified. Once specified as either inclusive or exclusive, it cannot be changed.
 * @param transfer_lookup_key boolean                             Optional. If set to true, will atomically remove the lookup key from the existing price, and assign it to this price.
 * @param transform_quantity  StripePriceTransformQuantityPayload Optional. Apply a transformation to the reported usage or set quantity before computing the billed price. Cannot be combined with tiers.
 * @param unit_amount_decimal string                              Optional. Same as unit_amount, but accepts a decimal value in cents with at most 12 decimal places. Only one of unit_amount and unit_amount_decimal can be set.
 */
export default class StripePriceRequest implements BodyRequest {
  @IsNotEmpty()
  @MaxLength(3)
  @IsLowercase()
  @IsString()
  currency: string;
  @IsNotEmpty()
  @IsString()
  product: string;
  @IsOptional()
  @IsNumber()
  unit_amount?: number;
  @IsOptional()
  @IsBoolean()
  active?: boolean;
  @IsOptional()
  @IsObject()
  metadata?: any;
  @IsOptional()
  @IsString()
  nickname?: string;
  @IsOptional()
  recurring?: StripePriceRecurringPayload;
  @IsOptional()
  product_data?: StripePriceProductDataPayload;
  @IsOptional()
  tiers?: StripePriceTiersPayload;
  @IsOptional()
  @IsString()
  tiers_mode?: string;
  @IsOptional()
  @IsString()
  billing_scheme?: "per_unit" | "tiered";
  @IsOptional()
  @IsString()
  lookup_key?: string;
  @IsOptional()
  @IsString()
  tax_behavior?: string;
  @IsOptional()
  @IsBoolean()
  transfer_lookup_key?: boolean;
  @IsOptional()
  transform_quantity?: StripePriceTransformQuantityPayload;
  @IsOptional()
  @IsString()
  unit_amount_decimal?: string;
}
