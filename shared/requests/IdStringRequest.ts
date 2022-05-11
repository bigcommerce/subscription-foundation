import { Type } from "class-transformer";
import { IsString, IsNotEmpty } from "class-validator";

export class IdStringRequest implements ParamsRequest {
  @Type(() => String)
  @IsString()
  @IsNotEmpty()
  id!: string;
}