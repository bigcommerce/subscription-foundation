import { BigApi } from "..";
import BigBaseApi from "../big-base-api";
import ChannelListingApi from "./listings";
import ChannelPayload from "@/types/big-commerce/ChannelPayload";
import ChannelUpdatePayload from "@/types/big-commerce/ChannelUpdatePayload";

export default class ChannelsApi extends BigBaseApi {
  public listings: ChannelListingApi;
  public baseUri = "/channels";
  constructor(bigApi: BigApi) {
    super(bigApi);
    this.listings = new ChannelListingApi(bigApi);
  }

  public async find(name): Promise<ChannelPayload> {
    const channels = await this.gets();
    const data = await channels.find(channel => channel.name == name);
    return data;
  }

  public async create(payload: ChannelPayload): Promise<ChannelPayload> {
    const { data } = await this.client.post(`${this.baseUri}`, payload);
    return data;
  }

  public async update(
    channelId: number,
    payload: ChannelUpdatePayload
  ): Promise<ChannelPayload> {
    const { data } = await this.client.put(
      `${this.baseUri}/${channelId}`,
      payload
    );
    return data;
  }

  public async upsert(payload: ChannelPayload): Promise<ChannelPayload> {
    const channel = await this.find(payload.name);

    if (channel) {
      delete payload.type;
      delete payload.platform;
      return await this.update(channel.id, payload);
    } else {
      return await this.create(payload);
    }
  }
}
