import { IsArray, IsNumber } from "class-validator";

export class ChannelConfigMeta extends BodyRequest {
  @IsNumber()
  id: number;
  @IsArray()
  sections: Array<ChannelConfigMetaSections>;
}