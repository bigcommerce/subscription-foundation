export interface VariantProductListUIContext {
  currentPage?: number;
  limit?: number;
  searchText?: string;
  productType?: VariantProductTypeEnum;
}
export enum VariantProductTypeEnum {
  "All Variants Products" = "all",
  "Enabled Subscriptions" = "enabled",
  "Disabled Subscriptions" = "disabled",
  "None Subscription Config" = "none"
}
