import * as fs from "fs";
import { DisplaySetting, Store, StoreSetting } from "@prisma/client";
import {
  SUBSCRIPTION_METAFIELD_KEY,
  SUBSCRIPTION_METAFIELD_NAMESPACE
} from "@/shared/constants/bigcommerce";
import { APP_URL } from "@/constants/common";
import BigBaseApi from "../big-base-api";

const SubscriptWidgetScriptName = "Subscription Widget Script";

export default class ScriptsApi extends BigBaseApi {
  public baseUri = "/content/scripts";

  public getTemplate(
    store: Store & {
      DisplaySetting: DisplaySetting;
      StoreSetting: StoreSetting;
    }
  ) {
    let content = fs.readFileSync(
      `${process.cwd()}/src/templates/subscribe-and-save-widget.hbs`,
      "utf8"
    );

    const templateData = {
      ...store.DisplaySetting,
      appUrl: APP_URL,
      apiToken: store.storefrontToken,
      subscriptionMetafieldNamespace: SUBSCRIPTION_METAFIELD_NAMESPACE,
      subscriptionMetafieldKey: SUBSCRIPTION_METAFIELD_KEY
    };

    // Replace Handlebar variables in template, since we want to be able to reuse between Widgets and Scripts
    // (Widgets store custom config variables which are replaced as they are rendered, while Scripts support Stencil objects only)
    for (const key in templateData) {
      const re = new RegExp(`{{${key}}}`, "g");
      content = content.replace(re, templateData[key]);
    }

    return content;
  }

  public async create(
    store: Store & {
      DisplaySetting: DisplaySetting;
      StoreSetting: StoreSetting;
    }
  ) {
    const html = this.getTemplate(store);

    return await this.client.post(this.baseUri, {
      name: SubscriptWidgetScriptName,
      description: "stripe subscription widget javascript",
      html,
      auto_uninstall: true,
      load_method: "default",
      location: "footer",
      visibility: "storefront",
      kind: "script_tag",
      consent_category: "essential"
    });
  }

  public async update(
    uuid: string,
    store: Store & {
      DisplaySetting: DisplaySetting;
      StoreSetting: StoreSetting;
    }
  ) {
    const html = this.getTemplate(store);
    return await this.client.put(`${this.baseUri}/${uuid}`, {
      name: SubscriptWidgetScriptName,
      html
    });
  }

  public async getSubscriptionScript(uuid: string = null) {
    if (uuid) {
      try {
        await this.get(uuid);
        return uuid;
      } catch (error) {}
    }
    const scripts = await this.gets();
    const subScript = scripts.find(
      item => item.name == SubscriptWidgetScriptName
    );
    return subScript?.uuid;
  }

  public async upsert(
    store: Store & {
      DisplaySetting: DisplaySetting;
      StoreSetting: StoreSetting;
    }
  ) {
    const scriptId = await this.getSubscriptionScript(store.scriptId);
    if (scriptId) {
      try {
        return await this.update(scriptId, store);
      } catch (error) {}
    }
    return await this.create(store);
  }
}
