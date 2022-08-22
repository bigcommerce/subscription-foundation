import { APP_URL } from "@/constants/common";

// BigCommerce App Details
export const BC_APP_ID = parseInt(process.env.NEXT_PUBLIC_BC_APP_ID);
export const BC_APP_CLIENT_ID = process.env.BC_APP_CLIENT_ID;
export const BC_APP_SECRET = process.env.BC_APP_SECRET;
export const BC_APP_CALLBACK_URL = `${APP_URL}/api/auth`;

// BigCommerce Channel Name
export const SUBSCRIPTION_CHANNEL_NAME = "Stripe Subscriptions";

// BigCommerce Customer Attribute Field & Metafield Names
export const SUBSCRIPTION_CUSTOMER_ATTRIBUTE_NAME = "stripe_customer_id";
export const SUBSCRIPTION_IDS_ATTRIBUTE_NAME = "stripe_subscription_ids";
export const SUBSCRIPTION_METAFIELD_KEY = "subscription_config";
export const SUBSCRIPTION_METAFIELD_NAMESPACE = "Stripe Billing";

// BigCommerce Content Mode
// 'script' or 'widget'
export const STOREFRONT_CONTENT_MODE = "script";
