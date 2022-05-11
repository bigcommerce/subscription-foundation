import { IsNotEmpty, IsString, IsNumber } from "class-validator";

/**
 * Stripe Price Transform Quantity Payload
 * Apply a transformation to the reported usage or set quantity before computing the amount billed. Cannot be combined with tiers.
 * @param divide_by string  Required. Divide usage by this number.
 * @param round     string  Required. After division, either round the result up or down.
 */
export default class StripePriceTransformQuantityPayload implements BodyRequest {
    @IsNotEmpty()
    @IsNumber()
    divide_by: number;
    @IsNotEmpty()
    @IsString()
    round: string; 
}