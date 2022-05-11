import { BigClient } from "@/types/big-client";
import CartApi from "./cart";
import CatalogApi from "./catalog";
import ChannelsApi from "./channels";
import CustomersApi from "./customers";
import OrdersApi from "./orders";
import WidgetsApi from "./widgets";
import WebhooksApi from "./webhooks";
import StoreInfoApi from "./store";
import ScriptsApi from "./scripts";
import GraphQlApi from "./graphql";

export class BigApi {
  public client: BigClient;
  public cart: CartApi;
  public catalog: CatalogApi;
  public channels: ChannelsApi;
  public customers: CustomersApi;
  public orders: OrdersApi;
  public widgets: WidgetsApi;
  public webhooks: WebhooksApi;
  public store: StoreInfoApi;
  public scripts: ScriptsApi;
  public graphql: GraphQlApi;

  constructor(client: BigClient) {
    this.client = client;
    this.cart = new CartApi(this);
    this.catalog = new CatalogApi(this);
    this.channels = new ChannelsApi(this);
    this.customers = new CustomersApi(this);
    this.orders = new OrdersApi(this);
    this.widgets = new WidgetsApi(this);
    this.webhooks = new WebhooksApi(this);
    this.store = new StoreInfoApi(this);
    this.scripts = new ScriptsApi(this);
    this.graphql = new GraphQlApi(this);
  }
}
