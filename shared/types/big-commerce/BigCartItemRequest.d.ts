import { ValidateNested } from 'class-validator';
import BigCartItem from './BigCartItem';

export default class BigCartItemRequest implements BodyRequest {
  @ValidateNested()
  line_item: BigCartItem[];
}