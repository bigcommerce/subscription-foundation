import BigBaseApi from "../big-base-api";
import BigCartRequest from "@/types/big-commerce/BigCartRequest";
import BigCartItemRequest from "@/types/big-commerce/BigCartItemRequest";

export default class CartApi extends BigBaseApi {

  public baseUri = "/carts";

  /**
   * Get cart
   * @param   cart_id  string  Required. The cart id
   * @returns api response
   */
  public async get(cart_id: string): Promise<any> {
    return await this.client.get(`${this.baseUri}/${cart_id}`);
  }

  /**
   * Add a single/multiple cart item(s)
   * @param   cart_id  string  Required. The cart id
   * @param   cart     BigCartRequest  Required. The request including the cart line items 
   * @returns api reponse
   */
  public async add_items(cart_id: string, cart: BigCartRequest): Promise<any> {
    return await this.client.post(`${this.baseUri}/${cart_id}/items`, cart);
  }

  /**
   * Update cart item
   * @param   cart_id  string          Required. The cart id
   * @param   item_id  string          Required. The item id
   * @param   cart     BigCartRequest  Required. The cart item values such as name and price
   * @returns api response
   */
  public async update_item(cart_id: string, item_id: string, cart: BigCartItemRequest): Promise<any> {
    return await this.client.put(`${this.baseUri}/${cart_id}/items/${item_id}`, cart);
  }
 
  /**
   * Delete cart item
   * @param  cart_id  string  Required. The cart id
   * @param  item_id  string  Required. The item id 
   * @returns api response
   */
  public async delete_item(cart_id: string, item_id: string): Promise<any> {
    return await this.client.delete(`${this.baseUri}/${cart_id}/items/${item_id}`);
  }


}
