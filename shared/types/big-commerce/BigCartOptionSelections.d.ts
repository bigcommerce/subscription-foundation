import { IsNumber, IsString } from "class-validator";

export default class BigCartOptionSelections implements BodyRequest {
    @IsNumber()
    option_id: number;
    @IsString()
    option_value: string;
}