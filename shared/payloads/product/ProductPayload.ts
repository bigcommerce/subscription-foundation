import ProductImagePayload from "./ProductImagePayload";
import ProductSubConfigPayload from "./ProductSubConfigPayload";
import VariantPayload from "./VariantPayload";

interface CustomUrlPayload {
  url: string, 
  is_customized: boolean
}

export default class ProductPayload implements BodyRequest {
  id: number;
  name: string;
  type: string;
  sku: string;
  price: number;
  description: string;
  custom_url: CustomUrlPayload;
  primary_image?: ProductImagePayload;
  sub_config?: ProductSubConfigPayload;
  variants?: VariantPayload[];
}
