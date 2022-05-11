import { axios } from "@/frontend/libs";
import useProducts from "@/frontend/providers/ProductProvider/modules/useProducts";
import useVariant from "@/frontend/providers/ProductProvider/modules/useVariant";
import VariantPayload from "@/shared/payloads/product/VariantPayload";
import { Checkbox, ProgressCircle } from "@bigcommerce/big-design";
import { useState } from "react";

const SubscriptionToggle = ({
  variant
}: {
  variant: VariantPayload;
}): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);
  const { getProduct } = useVariant();
  const { updateProduct } = useProducts();
  const onChange = async v => {
    setSubmitting(true);
    try {
      variant.sub_config.is_enabled = v;
      const updatedProduct = getProduct(variant);
      await axios.put(`/api/product/variant/subscription/${variant.id}`, {
        subConfig: updatedProduct.sub_config,
        variant
      });
      updateProduct(updatedProduct);
    } catch (error) {}
    setSubmitting(false);
  };

  return submitting ? (
    <ProgressCircle size="xSmall" />
  ) : variant?.sub_config?.options?.length > 0 ? (
    <Checkbox
      label=""
      checked={variant?.sub_config?.is_enabled ?? true}
      onChange={e => onChange(e.target.checked)}
    />
  ) : (
    <Checkbox label="" disabled={true} />
  );
};

export default SubscriptionToggle;
