/* eslint-disable react-hooks/exhaustive-deps */
import { DiscountUnitType } from "@/shared/enums/DiscountUnitType";
import { FrequencyType } from "@/shared/enums/FrequencyType";
import { useCallback, useEffect } from "react";
import { useProductContext } from "../context";
import { v4 as uuidv4 } from "uuid";
import SubscriptionConfigPayload from "@/shared/payloads/subscription/SubscriptionConfigPayload";
import SubscriptionOptionPayload from "@/shared/payloads/subscription/SubscriptionOptionPayload";
function useSubConfig() {
  const { setVariant, variant } = useProductContext();

  const setSubConfig = (sub_config: SubscriptionConfigPayload) => {
    setVariant({
      ...variant,
      sub_config
    });
  };
  const subConfig = variant?.sub_config ?? {};
  const isEnabled = subConfig?.is_enabled ?? true;
  const setEnabled = useCallback(is_enabled => {
    setSubConfig({
      ...subConfig,
      is_enabled
    });
  }, []);

  const oneTimePurchase = subConfig?.onetime_purchase ?? true;
  const setOneTimePurchase = (val: boolean) => {
    setSubConfig({
      ...subConfig,
      onetime_purchase: val
    });
  };

  const subOptions = subConfig?.options ?? [];
  const setSubOptions = (options: SubscriptionOptionPayload[]) => {
    setSubConfig({
      is_enabled: true,
      ...subConfig,
      options
    });

  };
  const setArchiveStripePriceId = stripe_price_id => {
    if(stripe_price_id) {
      const archiveStripePriceIds = subConfig?.archive_stripe_price_ids ?? [];
      archiveStripePriceIds.push(stripe_price_id);

      setSubConfig({
          ...subConfig,
          archive_stripe_price_ids: archiveStripePriceIds
      });

    }
  }
  const deleteSubOption = (id, stripe_price_id) => {
    if(stripe_price_id) {
      setArchiveStripePriceId(stripe_price_id);
    }

    setSubOptions(subOptions.filter(option => option.id != id));
   
  };
  const setOption = (updatedOption: SubscriptionOptionPayload) => {
    const index = subOptions.findIndex(option => option.id == updatedOption.id);
    subOptions[index] = updatedOption;
    setSubOptions(subOptions);
  };
  const addSubOption = () => {
    subOptions.push({
      id: uuidv4(),
      stripe_price_id: null,
      frequency: 1,
      type: FrequencyType.Months,
      discount: 0,
      unit: DiscountUnitType.Percent,
      calculated_price_decimal: null
    });
    setSubOptions(subOptions);
  };
  const defaultOption = subConfig?.default_option_id ?? subOptions?.[0]?.id ?? null;
  const setDefaultOption = (id: string) => {
    setSubConfig({
      ...subConfig,
      default_option_id: id
    });
  };
  useEffect(() => {
    if (!subOptions.length) {
      addSubOption();
      if (subOptions.length === 1) setDefaultOption(subOptions?.[0]?.id);
    }
  }, []);

  return {
    variant,
    subConfig,
    setSubConfig,
    oneTimePurchase,
    setOneTimePurchase,
    subOptions,
    setSubOptions,
    deleteSubOption,
    setOption,
    addSubOption,
    defaultOption,
    setDefaultOption,
    isEnabled,
    setEnabled
  };
}

export default useSubConfig;
