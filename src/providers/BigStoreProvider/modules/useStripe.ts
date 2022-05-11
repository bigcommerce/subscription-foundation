import { STRIPE_OAUTH_BROAD_CAST } from "@/constants/broadcast";
import { STRIPE_OAUTH_URL } from "@/constants/stripe";
import { axios } from "@/frontend/libs";
import alertManager from "@/frontend/libs/alerts";
import getErrorMessage from "@/frontend/utils/get-error-message";
import openPopupWindow from "@/frontend/utils/open-popup-window";
import { StripePayload } from "@/shared/payloads/StripePayload";
import { useCallback, useState } from "react";
import { useBigStore } from "../context";

const connectStripe = async (code: string) => {
  const { data } = await axios.post("/api/stripe/callback", {
    code
  });
  return data;
};

function useStripe() {
  const { store, setStore } = useBigStore();
  const [connecting, setConnecting] = useState<boolean>(null);
  const stripe = store?.stripe;
  const connected = !!store?.stripe?.id;

  const setStripe = useCallback(
    (payload: StripePayload) => {
      setStore({
        ...store,
        stripe: payload
      });
    },
    [setStore, store]
  );

  const [bc, setBc] = useState<BroadcastChannel>();

  const startConnecting = () => {
    openPopupWindow(STRIPE_OAUTH_URL, "Connect Stripe", 500, 700);
    if (bc) return;
    const newBc = new BroadcastChannel(STRIPE_OAUTH_BROAD_CAST);
    setBc(newBc);
    newBc.onmessage = async function ({ data }) {
      if (connecting !== null) return;
      setConnecting(true);
      try {
        const res = await connectStripe(data?.code);
        alertManager.add({
          messages: [{ text: "You've successfully connected with Stripe!" }],
          type: "success",
          autoDismiss: true
        });
        setStripe(res);
        setConnecting(false);
      } catch (error) {
        alertManager.add({
          messages: [{ text: getErrorMessage(error) }],
          type: "error",
          autoDismiss: true
        });
        setConnecting(null);
      }
    };
  };

  return { stripe, setStripe, connecting, connected, startConnecting };
}

export default useStripe;
