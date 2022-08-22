import * as fs from "fs";
import { DisplaySetting, Store, StoreSetting } from "@prisma/client";
import {
  SUBSCRIPTION_METAFIELD_KEY,
  SUBSCRIPTION_METAFIELD_NAMESPACE
} from "@/shared/constants/bigcommerce";
import BigBaseApi from "../big-base-api";

export default class WidgetTemplateApi extends BigBaseApi {
  public baseUri = "/content/widget-templates";

  public getTemplate() {
    const content = fs.readFileSync(
      `${process.cwd()}/src/templates/subscribe-and-save-widget.hbs`,
      "utf8"
    );

    return content;
  }

  /**
   * Create template
   * @returns response
   */
  public async create() {
    const template_data = this.getTemplate();
    const response = await this.client.post(this.baseUri, {
      name: "Subscription Widget Template",
      storefront_api_query: `query Product($productId: Int) { site { product(entityId: $productId) { variants { edges { node { metafields( namespace: "${SUBSCRIPTION_METAFIELD_NAMESPACE}", keys: ["${SUBSCRIPTION_METAFIELD_KEY}"] ) { edges { node { key value } } } } } } } } }`,
      schema: [
        {
          type: "hidden",
          settings: [
            {
              type: "graphQl",
              id: "graphQueries",
              typeMeta: {
                mappings: {
                  productId: {
                    reads: "productId",
                    type: "Int!"
                  }
                }
              }
            }
          ]
        },
        {
          type: "tab",
          label: "Content",
          sections: [
            {
              label: "Product",
              settings: [
                {
                  type: "productId",
                  label: "Product",
                  id: "productId",
                  default: "",
                  typeMeta: {
                    placeholder: "Search by name or SKU"
                  }
                }
              ]
            }
          ]
        }
      ],
      template: template_data
    });

    console.log("template create :: response :: ", response);

    return response;
  }

  /**
   * Update template
   * @param uuid string widget template ID
   * @returns response
   */
  public async update(uuid: string) {
    const template_data = this.getTemplate();

    const response = await this.client.put(`${this.baseUri}/${uuid}`, {
      name: "Subscription Widget",
      template: template_data,
      create_new_version: false
    });

    return response;
  }

  /**
   * Update/Insert template
   * @returns response
   */
  public async upsert(
    store: Store & {
      DisplaySetting: DisplaySetting;
      StoreSetting: StoreSetting;
    }
  ) {
    if (store.widgetTemplateId) {
      try {
        return this.update(store.widgetTemplateId);
      } catch (error) {
        console.error("template upsert :: error :: ", error);
      }
    }

    return await this.create();
  }
}
