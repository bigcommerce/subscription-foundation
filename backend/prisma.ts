import { PrismaClient } from "@prisma/client";

// Docs about instantiating `PrismaClient` with Next.js:
// https://pris.ly/d/help/next-js-best-practices

export const prismaClient = new PrismaClient();
export const {
  user: userClient,
  store: storeClient,
  usersOnStores: usersOnStoresClient,
  storeSetting: storeSettingClient,
  stripe: stripeClient,
  displaySetting: displaySettingClient
} = prismaClient;
