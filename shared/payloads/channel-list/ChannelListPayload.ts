export default class ChannelListPayload implements BodyRequest {
  channel_id: number;
  listing_id: number;
  product_id: number;
  state: "active" | "disabled";
  date_created: string;
  date_modified: string;
  variants: [];
}
