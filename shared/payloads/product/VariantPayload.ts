import SubscriptionConfigPayload from "../subscription/SubscriptionConfigPayload";
import { ValidateIf } from "class-validator";

interface VariantOptionPayload {
  id: number;
  label: string;
  option_id: number;
  option_display_name: string;
}
export default class VariantPayload {
  id: number;
  product_id: number;
  sku: string;
  sku_id: number;
  @ValidateIf((_object, value) => value !== null)
  price: number | null;
  calculated_price: number;
  @ValidateIf((_object, value) => value !== null)
  sale_price: number | null;
  @ValidateIf((_object, value) => value !== null)
  retail_price: number | null;
  @ValidateIf((_object, value) => value !== null)
  map_price: number | null;
  width: number;
  calculated_weight: number;
  weight: number;
  height: number;
  depth: number;
  image_url: string;
  cost_price: number;
  inventory_level: number;
  inventory_warning_level: number;
  bin_picking_number: string;
  option_values: VariantOptionPayload[];
  sub_config?: SubscriptionConfigPayload;
  @ValidateIf((_object, value) => value !== null)
  fixed_cost_shipping_price: number | null;
  purchasing_disabled: boolean;
  purchasing_disabled_message: string;
  upc: string;
  mpn: string;
  gtin: string;
}
