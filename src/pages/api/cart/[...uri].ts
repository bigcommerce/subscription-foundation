import { NextApiRequest } from "@/types/next";
import { NextApiResponse } from "next";
import { RequestType } from "@/backend/controllers/api-route-controller";
import { BaseBigCommerceController } from "@/backend/controllers/base-bigcommerce-controller";
import { appContainer } from "@/shared/di-container/app";
import { injectable } from "tsyringe";
import HttpStatus from "http-status-codes";
import BigCartRequest from "@/types/big-commerce/BigCartRequest";
import BigCartItemRequest from "@/types/big-commerce/BigCartItemRequest";

@injectable()
export class CartController extends BaseBigCommerceController {
  public requiresAuth = false;
  public requiresStore = true;
  public body: any = this.body;
  public response: any;

  /**
   * Routes the request to the appropriate method.
   */
  public async run(
    _req?: NextApiRequest,
    res?: NextApiResponse
  ): Promise<NextApiResponse | void> {
    const {
      uri: [cartId, itemPath, itemId]
    } = _req.query;
    const hasCartItemPathAndId = itemPath && itemId;

    this.initBigApi();

    switch (_req.method ?? "") {
      /**
       * Send OK for CORS pre-flight request from the front-end widget js
       * front-end widget js location: /backend/services/bigcommerce/widgets/template.ts :: getTemplate
       */
      case RequestType.OPTIONS:
        res.status(HttpStatus.OK).send("ok");
        break;

      case RequestType.GET:
        await this.getCart(cartId, res);
        break;

      case RequestType.POST:
        await this.addCartItems(cartId, this.body, res);
        break;

      case RequestType.PUT:
        if (hasCartItemPathAndId) {
          await this.updateCartItem(cartId, itemId, this.body, res);
        }
        break;

      case RequestType.DELETE:
        if (hasCartItemPathAndId) {
          await this.deleteCartItem(cartId, itemId, res);
        }
        break;

      default:
        res.status(HttpStatus.METHOD_NOT_ALLOWED);
        break;
    }
  }

  protected async getCart(cart_id: string, res: NextApiResponse) {
    this.response = await this.bigApi.cart.get(cart_id);
    res.status(HttpStatus.OK).json(this.response);
  }

  protected async addCartItems(
    cart_id: string,
    cart: BigCartRequest,
    res: NextApiResponse
  ) {
    this.response = await this.bigApi.cart.add_items(cart_id, cart);
    res.status(HttpStatus.OK).json(this.response);
  }

  protected async updateCartItem(
    cart_id: string,
    item_id: string,
    cart: BigCartItemRequest,
    res: NextApiResponse
  ) {
    this.response = await this.bigApi.cart.update_item(cart_id, item_id, cart);
    res.status(HttpStatus.OK).json(this.response);
  }

  protected async deleteCartItem(
    cart_id: string,
    item_id: string,
    res: NextApiResponse
  ) {
    this.response = await this.bigApi.cart.delete_item(cart_id, item_id);
    res.status(HttpStatus.OK).json(this.response);
  }
}

export default appContainer
  .resolve(CartController)
  .addRequestType(RequestType.OPTIONS)
  .addRequestType(RequestType.GET)
  .addRequestType(RequestType.POST)
  .addRequestType(RequestType.PUT)
  .addRequestType(RequestType.DELETE)
  .getRouteHandler();
