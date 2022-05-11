import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { STRIPE_OAUTH_BROAD_CAST } from "@/constants/broadcast";

const StripeCallback = (): JSX.Element => {
  const router = useRouter();

  const runStripeCallback = async (code: string) => {
    const bc = new BroadcastChannel(STRIPE_OAUTH_BROAD_CAST);
    bc.postMessage({
      code
    });

    return window.close();
  };
  useEffect(() => {
    if (!router.isReady) return;
    if (!router?.query?.code) {
      return window.close();
    }
    runStripeCallback(router?.query?.code as string);
  }, [router.isReady, router.query]);

  return <div />;
};

export default StripeCallback;
