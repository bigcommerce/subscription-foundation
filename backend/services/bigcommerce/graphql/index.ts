import BigBaseApi from "../big-base-api";

/**
 * GraphQL 
 */
export default class GraphQlAPI extends BigBaseApi {

  /**
   * Create GraphQL Token
   * @param channelId
   * @param origin
   * @returns {any}
   */
  public async createToken(channelId: number, origin: string) {
    const numYearsInFutureToExpire = 10; 

    let expiresAtTimestamp = new Date();
    expiresAtTimestamp.setFullYear(expiresAtTimestamp.getFullYear() + numYearsInFutureToExpire);

    return await this.client.post(`/storefront/api-token`, {
        "channel_id": channelId,
        "expires_at": Math.round(expiresAtTimestamp.getTime() / 1000),
        "allowed_cors_origins": [ origin ]
    });
  }

}
