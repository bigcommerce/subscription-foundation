import { BigApi } from "..";
import WidgetTemplateApi from "./template";
import WidgetApi from "./widget";
import WidgetPlacementApi from "./placement";

export default class WidgetsApi {
  public template: WidgetTemplateApi;
  public widget: WidgetApi;
  public placement: WidgetPlacementApi;

  constructor(bigApi: BigApi) {
    this.template = new WidgetTemplateApi(bigApi);
    this.widget = new WidgetApi(bigApi);
    this.placement = new WidgetPlacementApi(bigApi);
  }
}
