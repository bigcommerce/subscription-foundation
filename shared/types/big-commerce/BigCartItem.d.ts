import { IsEnum, IsNumber } from "class-validator";
import BigCartOptionSelections from "./BigCartOptionSelections";

export default class BigCartItem implements BodyRequest {
    @IsNumber()
    quanitity: number;
    @IsNumber()
    product_id: number;
    @IsNumber()
    list_price: number;
    @IsEnum()
    option_selections?: BigCartOptionSelections;
}