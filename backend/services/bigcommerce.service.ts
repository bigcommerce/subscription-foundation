import {
  BC_APP_CLIENT_ID,
  BC_APP_SECRET,
  BC_APP_CALLBACK_URL
} from "@/shared/constants/bigcommerce";
import dotenv from "dotenv";
import BigCommerce from "node-bigcommerce";

dotenv.config();

const BigCommerceClient = new BigCommerce({
  logLevel: "info",
  accessToken: null,
  storeHash: null,
  clientId: BC_APP_CLIENT_ID,
  secret: BC_APP_SECRET,
  callback: BC_APP_CALLBACK_URL,
  responseType: "json",
  apiVersion: "v3"
});

export default BigCommerceClient;
