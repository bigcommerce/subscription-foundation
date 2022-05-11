import { StoreSettingPayload } from "@/shared/payloads/StoreSettingPayload";
import { StoreSetting } from "@prisma/client";
import { BaseTransformer } from "./BaseTransformer";

export class StoreSettingTransformer extends BaseTransformer<
  StoreSetting,
  StoreSettingPayload
> {
  public transform({
    id,
    location,
    importData,
    includeDesc,
    includeImg,
    keepLevels,
    createdAt,
    updatedAt,
    storeId
  }: StoreSetting): StoreSettingPayload {
    return {
      id,
      location,
      importData,
      includeDesc,
      includeImg,
      keepLevels,
      createdAt,
      updatedAt,
      storeId
    };
  }
}
