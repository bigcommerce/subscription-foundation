import { StripePayload } from "@/shared/payloads/StripePayload";
import { Stripe } from "@prisma/client";
import { BaseTransformer } from "./BaseTransformer";

export class StripeTransformer extends BaseTransformer<Stripe, StripePayload> {
  public transform({
    id,
    stripeUserId,
    email,
    dashboardDisplayName,
    createdAt,
    updatedAt
  }: Stripe): StripePayload {
    return {
      id,
      stripeUserId,
      email,
      dashboardDisplayName,
      createdAt,
      updatedAt
    };
  }
}
