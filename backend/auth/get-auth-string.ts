import { Store, User } from "@prisma/client";

const getAuthString = (user: User, store: Store) => {
  return `token=${user.token}&store_id=${store.id}`;
};

export default getAuthString;
