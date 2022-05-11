import BigBaseApi from "../big-base-api";

export default class OrdersApi extends BigBaseApi {
  public baseUri = "/orders";
  
  /**
   * Get Order
   * @param order_id  string  Required.
   * @returns 
   */
  public async get_order(order_id:string) {
    return await this.client.get(`${this.baseUri}/${order_id}`);
  }


  /**
   * Get Ordered Products
   * @param order_id  string  Required.
   * @returns 
   */
   public async get_order_products(order_id:string) {
    return await this.client.get(`${this.baseUri}/${order_id}/products`);
  }

}
