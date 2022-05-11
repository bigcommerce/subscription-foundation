import "reflect-metadata";
import { container } from "tsyringe";
import {
  BC_APP_CLIENT_ID,
  BC_APP_SECRET,
  BC_APP_CALLBACK_URL
} from "@/shared/constants/bigcommerce";
import BigCommerce from "node-bigcommerce";

/** Defines the DI container modules or services. */
export enum Modules {
  BIG_COMMERCE_CLIENT = "big-commerce-client"
}

// Register the BigCommerce client isntance in the app container
container.registerInstance<BigCommerce>(Modules.BIG_COMMERCE_CLIENT, {
  useFactory: (_: any) => {
    return new BigCommerce({
      logLevel: "info",
      accessToken: null,
      storeHash: null,
      clientId: BC_APP_CLIENT_ID,
      secret: BC_APP_SECRET,
      callback: BC_APP_CALLBACK_URL,
      responseType: "json",
      apiVersion: "v3"
    });
  }
});

// Re-export the DI container
export { container as appContainer };
