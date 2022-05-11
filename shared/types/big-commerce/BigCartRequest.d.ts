import { ValidateNested } from 'class-validator';
import BigCartItem from './BigCartItem';

export default class BigCartRequest implements BodyRequest {
  @ValidateNested()
  line_items: BigCartItem[];
}