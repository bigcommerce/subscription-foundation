import { UserPayload } from "@/shared/payloads/UserPayload";
import { User, UsersOnStores } from "@prisma/client";
import { BaseTransformer } from "./BaseTransformer";

export class UserTransformer extends BaseTransformer<User, UserPayload> {
  public transform({
    id,
    token,
    email,
    username,
    createdAt,
    updatedAt
  }: User & {
    Stores: UsersOnStores[];
  }): UserPayload {
    return {
      id,
      token,
      email,
      username,
      createdAt,
      updatedAt
    };
  }
}
