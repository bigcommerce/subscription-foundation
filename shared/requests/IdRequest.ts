import { Type } from "class-transformer";
import { IsInt, IsPositive } from "class-validator";

export class IdNumberRequest implements ParamsRequest {
  @Type(() => Number)
  @IsInt()
  @IsPositive()
  id!: number;
}
