import { axios } from "@/frontend/libs";
import useProducts from "@/frontend/providers/ProductProvider/modules/useProducts";
import ProductPayload from "@/shared/payloads/product/ProductPayload";
import { Checkbox, ProgressCircle } from "@bigcommerce/big-design";
import { useState } from "react";
import { useTranslations } from "next-intl";

const EnabledSubscriptionCheck = ({
  product
}: {
  product: ProductPayload;
}): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);
  const { updateProduct } = useProducts();
  const t = useTranslations("EnabledSubscriptionCheck");
  const onChange = async v => {
    setSubmitting(true);
    try {
      await axios.put(`/api/product/subscription/${product.id}`, {
        ...product.sub_config,
        is_enabled: v
      });
      product.sub_config.is_enabled = v;
      updateProduct(product);
    } catch (error) {}
    setSubmitting(false);
  };

  return submitting ? (
    <ProgressCircle size="xSmall" />
  ) : product?.sub_config?.configsCount > 0 ? (
    <Checkbox
      label={t("checkboxTrueLabel")}
      checked={product?.sub_config?.is_enabled ?? true}
      onChange={e => onChange(e.target.checked)}
    />
  ) : (
    <Checkbox label={t("checkboxFalseLabel")} disabled={true} />
  );
};

export default EnabledSubscriptionCheck;

export async function getStaticProps({ locale }) {
  const messages = await import(`../../../locales/${locale}.json`);
  return {
    props: {
      messages: messages.default
    }
  };
}
