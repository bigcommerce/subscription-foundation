import { Store } from "@prisma/client";
import BigBaseApi from "../big-base-api";

export default class WidgetPlacementApi extends BigBaseApi {

  public baseUri = "/content/placements";
  
  /**
   * Get placement
   * @param uuid string  placement ID
   * @returns response
   */
  public async get(uuid: string) {
    const response = await this.client.get(`${this.baseUri}/${uuid}`);

    return response;
  }

  /**
   * Create placement
   * @param uuid string  widget ID
   * @returns response
   */
  public async create(uuid: string) {
    const response = await this.client.post(this.baseUri, {
        widget_uuid: uuid,
        entity_id: "",
        template_file: "pages/product",
        status: "active",
        sort_order: 1,
        region: "product_below_content"
    });

    return response;
  }

  /**
   * Update widget placement
   * @param placement_uuid string  placement ID
   * @param uuid string  widget ID
   * @returns response
   */
  public async update(placement_uuid: string, uuid: string ) {
    const response = await this.client.put(`${this.baseUri}/${placement_uuid}`, {
        widget_uuid: uuid,
        sort_order: 1,
        region: "product_below_content",
        template_file: "pages/product",
        status: "active"
    });

    return response;
  }

  /**
   * Update/Insert placement
   * @param uuid string  widget ID
   * @param store object  store configuration and ids
   * @returns 
   */
  public async upsert( uuid: string, store: Store ) {
    if (store.widgetPlacementId) {
      try {
        return await this.update(store.widgetPlacementId, uuid);
      } catch (error) {
        console.log('placement upsert :: error :: ', error);
      }
    }
    return await this.create(uuid);
  }

}