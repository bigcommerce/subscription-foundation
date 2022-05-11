import { StorePayload } from "@/shared/payloads/StorePayload";
import { UserPayload } from "@/shared/payloads/UserPayload";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface BigStoreContextProps {
  store: StorePayload;
  user: UserPayload;
  setStore?: Dispatch<SetStateAction<StorePayload>>;
  setUser?: Dispatch<SetStateAction<UserPayload>>;
}

export const BigStoreContext = createContext<BigStoreContextProps | undefined>(
  undefined
);
BigStoreContext.displayName = "BigStoreContext";

export function useBigStore() {
  const context = useContext(BigStoreContext);
  return context;
}
