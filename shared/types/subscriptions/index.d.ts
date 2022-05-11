import { DisplaySettingPayload } from "@/shared/payloads/DisplaySettingPayload";
import SubscriptionOptionPayload from "@/shared/payloads/subscription/SubscriptionOptionPayload";

interface SubscriptionConfig {
  displaySettings: DisplaySettingPayload;
  options: SubscriptionOptionPayload[];
}
