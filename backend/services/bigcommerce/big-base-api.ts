import { BigClient } from "@/types/big-client";
import { BigApi } from ".";

export default class BigBaseApi {
  public bigApi: BigApi;
  public client: BigClient;
  public baseUri: string;

  public getParmasUrl = params =>
    Object.keys(params)
      .map(function (k) {
        return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
      })
      .join("&");
      
  constructor(bigApi: BigApi) {
    this.bigApi = bigApi;
    this.client = bigApi.client;
  }

  public async get(...params) {
    const { data } = await this.client.get(`${this.baseUri}/${params[0]}`);
    return data;
  }

  public async gets() {
    const { data } = await this.client.get(this.baseUri);
    return data;
  }

  public toData(data) {
    return data.data;
  }
  public toModel(data) {
    return data;
  }
}
