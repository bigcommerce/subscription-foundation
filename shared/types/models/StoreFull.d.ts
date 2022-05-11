import { DisplaySetting, Store, StoreSetting } from "@prisma/client";

type StoreFull = Store & {
  DisplaySetting: DisplaySetting;
  StoreSetting: StoreSetting;
};
