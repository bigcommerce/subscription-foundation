import BigBaseApi from "../big-base-api";
import { APP_URL } from "@/constants/common";

export default class WebhooksApi extends BigBaseApi {
  public baseUri = "/hooks";
  private callbackUri = "/api/webhooks";

  /**
   * Get a specific webhook or all webhooks
   * @param {number} [hook_id] - ID of the BigCommerce webhook to fetch. If not passed, all webhooks will be fetched instead.
   * @returns {Promise}
   */
  public async get(hook_id?: number) {
    let request_url: string = this.baseUri;
    if (hook_id) {
      request_url += "/" + hook_id;
    }

    return await this.client.get(request_url);
  }

  /**
   * Register a new webhook with a specific scope. The destination is this app's callback URI.
   * @param {string} scope - The name of the BigCommerce event that should be sent to the app. Event reference: https://developer.bigcommerce.com/docs/ZG9jOjIyMDczNA-webhook-events
   * @returns {Promise}
   */
  public async create(scope: string) {
    const body = {
      scope: scope,
      destination: APP_URL + this.callbackUri,
      is_active: true
    };

    return await this.client.post(this.baseUri, body);
  }

  /**
   * Set is_active value of specific webhook to true
   * @param {number} hook_id - ID of the BigCommerce webhook to enable
   * @returns {Promise}
   */
  public async enable(hook_id: number) {
    const body = {
      is_active: true
    };

    return await this.client.put(this.baseUri + "/" + hook_id, body);
  }

  /**
   * Creates / updates BigCommerce webhooks necessary for the app to function end-to-end
   */
  public async initAppWebhooks() {
    const webhooks = await this.get();
    const orderCreatedScope = "store/order/created";
    const existingWebhookScopes = webhooks.data.map(webhook => webhook.scope);
    const existingOrderWebhook = webhooks.data.filter(
      webhook => webhook.scope === orderCreatedScope
    )[0];

    if (existingWebhookScopes.indexOf(orderCreatedScope) === -1) {
      // If the webhook doesn't exist, create it
      await this.create(orderCreatedScope);
    } else {
      // If the webhook does exist, make sure it's enabled
      if (existingOrderWebhook.is_active === false) {
        await this.enable(existingOrderWebhook.id);
      }
    }
  }
}
