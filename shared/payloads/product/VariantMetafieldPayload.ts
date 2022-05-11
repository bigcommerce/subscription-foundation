export default class VariantMetafieldPayload {
  id?: number;
  key: string;
  value: string;
  namespace: string;
  permission_set:
    | "app_only"
    | "read"
    | "write"
    | "read_and_sf_access"
    | "write_and_sf_access";
  resource_type?: "category" | "brand" | "product" | "variant";
  resource_id?: 198;
}
