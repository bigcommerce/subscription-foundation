import { IsString } from "class-validator";

class ChannelConfigMetaSections implements BodyRequest {
  @IsString()
  title: string;
  @IsString()
  query_path: string;
}