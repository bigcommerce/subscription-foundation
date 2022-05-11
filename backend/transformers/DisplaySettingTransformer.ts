import { DisplaySettingPayload } from "@/shared/payloads/DisplaySettingPayload";
import { DisplaySetting } from "@prisma/client";
import { BaseTransformer } from "./BaseTransformer";

export class DisplaySettingTransformer extends BaseTransformer<
  DisplaySetting,
  DisplaySettingPayload
> {
  public getDefault(): DisplaySettingPayload {
    return {
      widgetLabel: "Subscribe and Save!",
      widgetBgColor: "#FFFFFF",
      widgetTextColor: "#343434",
      buttonLabel: "Subscribe!",
      buttonBgColor: "#3C64F4",
      buttonTextColor: "#FFFFFF"
    };
  }

  public transform({
    id,
    widgetLabel,
    widgetBgColor,
    widgetTextColor,
    buttonLabel,
    buttonBgColor,
    buttonTextColor
  }: DisplaySetting): DisplaySettingPayload {
    return {
      id,
      widgetLabel,
      widgetBgColor,
      widgetTextColor,
      buttonLabel,
      buttonBgColor,
      buttonTextColor
    };
  }
}
