import { IsOptional } from "class-validator";
import { StorePayload } from "./StorePayload";

export class UserPayload implements BodyRequest {
  @IsOptional()
  id?: number;
  token?: string;
  email?: string;
  username?: string;
  createdAt?: Date;
  updatedAt?: Date;
  stores?: StorePayload[];
}
