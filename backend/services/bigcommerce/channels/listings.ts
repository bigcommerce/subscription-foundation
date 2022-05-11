import ChannelListPayload from "@/shared/payloads/channel-list/ChannelListPayload";
import BigBaseApi from "../big-base-api";

export default class ChannelListingApi extends BigBaseApi {
  public baseUri = "/channels";

  public async get(channel_id) {
    const { data }: { data: ChannelListPayload[] } =
      await this.bigApi.client.get(`${this.baseUri}/${channel_id}/listings`);
    return data.filter(product => product.state === "active");
  }
}
