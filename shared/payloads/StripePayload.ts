import { IsOptional } from "class-validator";

export class StripePayload implements BodyRequest {
  @IsOptional()
  id?: number;
  stripeUserId?: string;
  email?: string;
  dashboardDisplayName?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
