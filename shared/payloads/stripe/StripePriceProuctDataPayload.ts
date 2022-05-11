import { IsNotEmpty, IsOptional, IsString, IsBoolean } from "class-validator";

/**
 * Stripe Price Recurring Payload
 * 
 * @param name                 string  Required. The product’s name, meant to be displayable to the customer. Whenever this product is sold via a subscription, name will show up on associated invoice line item descriptions.
 * @param active               boolean Optional. Whether the product is currently available for purchase. Defaults to true.
 * @param meta_data            object  Optional. Set of key-value pairs that you can attach to an object. This can be useful for storing additional information about the object in a structured format. Individual keys can be unset by posting an empty value to them. All keys can be unset by posting an empty value to metadata.
 * @param statement_descriptor string  Optional. An arbitrary string to be displayed on your customer’s credit card or bank statement. While most banks display this information consistently, some may display it incorrectly or not at all. This may be up to 22 characters. The statement description may not include <, >, \, ", ’ characters, and will appear on your customer’s statement in capital letters. Non-ASCII characters are automatically stripped.
 * @param tax_code             string  Optional. A tax code ID. https://stripe.com/docs/tax/tax-codes
 * @param unit_label           string  Optional. A label that represents units of this product in Stripe and on customers’ receipts and invoices. When set, this will be included in associated invoice line item descriptions.
 */
export default class StripePriceProductDataPayload implements BodyRequest {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsOptional()
    @IsBoolean()
    active?: boolean;
    @IsOptional()
    metadata?: any;
    @IsOptional()
    @IsString()
    statement_descriptor?: string;
    @IsOptional()
    @IsString()
    tax_code?: string;
    @IsOptional()
    @IsString()
    unit_label?: string;
}