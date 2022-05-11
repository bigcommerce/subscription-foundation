import SubscriptionConfigPayload from "../subscription/SubscriptionConfigPayload";

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
  price: number;
  calculated_price: number;
  image_url: string;
  cost_price: number;
  inventory_level: number;
  inventory_warning_level: number;
  bin_picking_number: string;
  option_values: VariantOptionPayload[];
  sub_config?: SubscriptionConfigPayload;
  height: number;
  depth: number;
  weight: number;
  width: number;
}
