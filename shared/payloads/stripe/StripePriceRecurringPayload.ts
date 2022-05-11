import { IsNotEmpty, IsOptional, IsString, IsNumber } from "class-validator";

/**
 * Stripe Price Recurring Payload
 * The recurring components of a price such as interval and usage_type.
 * @param interval        string  Required. Specifies billing frequency. Either day, week, month or year.
 * @param aggregate_usage string  Optional. Specifies a usage aggregation strategy for prices of usage_type=metered. Allowed values are sum for summing up all usage during a period, last_during_period for using the last usage record reported within a period, last_ever for using the last usage record ever (across period bounds) or max which uses the usage record with the maximum reported usage during a period. Defaults to sum.
 * @param interval_count  number  Optional.  The number of intervals between subscription billings. For example, interval=month and interval_count=3 bills every 3 months. Maximum of one year interval allowed (1 year, 12 months, or 52 weeks).
 * @param usage_type      string  Optional.  Configures how the quantity per period should be determined. Can be either metered or licensed. licensed automatically bills the quantity set when adding it to a subscription. metered aggregates the total usage based on usage records. Defaults to licensed.
 */
export default class StripePriceRecurringPayload implements BodyRequest {
    @IsNotEmpty()
    @IsString()
    interval: string;
    @IsOptional()
    @IsString()
    aggregate_usage?: string;
    @IsOptional()
    @IsNumber()
    interval_count: number;
    @IsOptional()
    @IsString()
    usage_type: string;
}