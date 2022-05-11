import { StoreTransformer } from "@/backend/transformers/StoreTransformer";
import { UserTransformer } from "@/backend/transformers/UserTransformer";
import { axios } from "@/frontend/libs";
import { useAsync } from "@/frontend/libs/async";
import { GetMeResponse } from "@/shared/payloads/GetMeResponse";
import { StorePayload } from "@/shared/payloads/StorePayload";
import { UserPayload } from "@/shared/payloads/UserPayload";
import React, { useEffect, useState } from "react";
import { BigStoreContext } from "./context";

const BigStoreProvider = (props: { children: React.ReactElement }) => {
  const [store, setStore] = useState<StorePayload>(
    new StoreTransformer().getJSON()
  );
  const [user, setUser] = useState<UserPayload>(
    new UserTransformer().getJSON()
  );
  const { data, loading, error } = useAsync<GetMeResponse>(getUserAndStore);

  useEffect(() => {
    if (!loading && !error) {
      setStore(data?.store);
      setUser(data?.user);
    }
  }, [data, loading, error]);
  return (
    <BigStoreContext.Provider
      value={{
        store,
        setStore,
        user,
        setUser
      }}
    >
      {!loading ? props.children : React.Fragment}
    </BigStoreContext.Provider>
  );
};
export default BigStoreProvider;

const getUserAndStore = async (): Promise<GetMeResponse> => {
  const { data } = await axios.get("/api/me");
  return data;
};
