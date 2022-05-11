import BigBaseApi from "../big-base-api";

export default class StoreInfoApi extends BigBaseApi {
  public baseUri = "/store";

  /**
   * Get store information
   * @returns {Promise}
   */
  public async get() {
    return await this.client.get(this.baseUri);
  }

}
