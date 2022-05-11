import { IsHexColor, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class DisplaySettingPayload implements BodyRequest {
  @IsOptional()
  id?: number;

  @IsNotEmpty()
  @IsString()
  widgetLabel: string;
  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  widgetBgColor: string;
  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  widgetTextColor: string;
  @IsNotEmpty()
  @IsString()
  buttonLabel: string;
  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  buttonBgColor: string;
  @IsNotEmpty()
  @IsString()
  @IsHexColor()
  buttonTextColor: string;
}
