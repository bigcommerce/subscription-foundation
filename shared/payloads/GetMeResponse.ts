import { StorePayload } from "./StorePayload";
import { UserPayload } from "./UserPayload";

export class GetMeResponse {
  user: UserPayload;
  store: StorePayload;
}
