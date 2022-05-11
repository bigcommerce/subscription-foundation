import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";
import ProductSubConfigPayload from "../product/ProductSubConfigPayload";
import VariantPayload from "../product/VariantPayload";

export default class SubConfigRequest implements BodyRequest {
  @Type(() => ProductSubConfigPayload)
  @ValidateNested()
  subConfig?: ProductSubConfigPayload;
  @Type(() => VariantPayload)
  @ValidateNested()
  variant?: VariantPayload;
}
