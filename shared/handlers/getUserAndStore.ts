import { userClient, storeClient } from "@/backend/prisma";
import { NextApiRequestCookies } from "next/dist/server/api-utils";

export const getUserAndStore = async (cookies: NextApiRequestCookies) => {
  const user = cookies?.token
    ? await userClient.findFirst({
        where: {
          token: cookies?.token
        }
      })
    : null;
  const store = cookies?.store_id
    ? await storeClient.findUnique({
        where: {
          id: parseInt(cookies?.store_id)
        },
        include: {
          DisplaySetting: true,
          StoreSetting: true,
          Stripe: true
        }
      })
    : null;

  return { user, store };
};
