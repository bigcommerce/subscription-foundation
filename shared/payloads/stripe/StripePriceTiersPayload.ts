import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

/**
 * Stripe Price Tiers Payload
 * REQUIRED IF BILLING_SCHEME=TIERED
 * 
 * @param up_to string  Required. Specifies the upper bound of this tier. The lower bound of a tier is the upper bound of the previous tier adding one. Use inf to define a fallback tier.
 * @param flat_amount number  Optional. The flat billing amount for an entire tier, regardless of the number of units in the tier.
 * @param flat_amount_decimal number  Same as flat_amount, but accepts a decimal value representing an integer in the minor units of the currency. Only one of flat_amount and flat_amount_decimal can be set.
 * @param unit_amount number  Optional. The per unit billing amount for each individual unit for which this tier applies.
 * @param unit_amount_decimal number  Optional. Same as unit_amount, but accepts a decimal value in cents with at most 12 decimal places. Only one of unit_amount and unit_amount_decimal can be set.
 */
export default class StripePriceTiersPayload implements BodyRequest {
    @IsNotEmpty()
    @IsString()
    up_to: string;
    @IsOptional()
    @IsNumber()
    flat_amount: number;
    @IsOptional()
    @IsNumber()
    flat_amount_decimal: number;
    @IsOptional()
    @IsNumber()
    unit_amount: number;
    @IsOptional()
    @IsNumber()
    unit_amount_decimal: number;
}