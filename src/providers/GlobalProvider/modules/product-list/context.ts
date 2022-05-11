export interface ProductListUIContext {
  currentPage?: number;
  limit?: number;
  searchText?: string;
  productType?: ProductTypeEnum;
}
export enum ProductTypeEnum {
  "All Products" = "all",
  "Enabled Subscriptions" = "enabled",
  "Disabled Subscriptions" = "disabled",
  "None Subscription Config" = "none"
}
