import { StorePayload } from "./StorePayload";

export class StoreSettingPayload implements BodyRequest {
  id?: number;
  location?: string;
  store?: StorePayload;
  importData?: boolean;
  includeDesc?: boolean;
  includeImg?: boolean;
  keepLevels?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  storeId?: number;
}
