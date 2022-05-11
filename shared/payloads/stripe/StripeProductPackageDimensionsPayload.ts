import { IsNotEmpty, IsNumber } from "class-validator";

/**
 * Stripe Product Pacakage Dimensions Payload Request
 * 
 * @param height number  Required. Height, in inches. Maximum precision is 2 decimal places.
 * @param length number  Required. Length, in inches. Maximum precision is 2 decimal places.
 * @param weight number  Required. Weight, in ounces. Maximum precision is 2 decimal places.
 * @param width number  Required. Width, in inches. Maximum precision is 2 decimal places.
 */
export default class StripeProductPackageDimensionsPayload implements BodyRequest {
    @IsNotEmpty()
    @IsNumber()
    height: number;
    @IsNotEmpty()
    @IsNumber()
    length: number;
    @IsNotEmpty()
    @IsNumber()
    weight: number;
    @IsNotEmpty()
    @IsNumber()
    width: number;
}