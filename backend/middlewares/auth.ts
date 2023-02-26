import { getUserAndStore } from "@/shared/handlers/getUserAndStore";
import { NextApiRequest } from "@/types/next";
import HttpError from "../exceptions/http-error";
import { usersOnStoresClient } from "../prisma";

export const verifyUserAndStore = async (req: NextApiRequest) => {
  if (!req.cookies?.token) throw new HttpError("Invalid User", 401);
  const { user, store } = await getUserAndStore(req.cookies);
  if (!user) throw new HttpError("Can't find user", 401);
  if (!req.cookies?.store_id) throw new HttpError("Invalid Store", 401);
  if (!store) throw new HttpError("Invalid Store", 401);
  await usersOnStoresClient.upsert({
    where: {
      userId_storeId: {
        userId: user.id,
        storeId: store.id
      }
    },
    create: {
      userId: user.id,
      storeId: store.id
    },
    update: {}
  });

  return { user, store };
};
