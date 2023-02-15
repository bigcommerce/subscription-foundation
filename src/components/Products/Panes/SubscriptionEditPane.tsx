import React from "react";
import { axios } from "@/frontend/libs";
// import alertManager from "@/frontend/libs/alerts";
import { errorHandler } from "@/shared/handlers/errorHandler";
import useVariant from "@/frontend/providers/ProductProvider/modules/useVariant";
import SubConfigRequest from "@/shared/payloads/subscription/SubConfigRequest";
// import SubscriptionOptionPayload from "@/shared/payloads/subscription/SubscriptionOptionPayload";
import { Button } from "@bigcommerce/big-design";
import AsyncButton from "../../Base/AsyncButton";
import ActionBar from "../../Base/ActionBar";
import PageLayout from "../../Base/PageLayout";
import SubscriptionEditPanel from "../../Subscription/Option/EditPanel";
import { useTranslations } from "next-intl";
// import sanitizeHtml from "sanitize-html";
// import Stripe from "stripe";
// import { isNullOrUndefined } from "@/shared/utils/isNullOrUndefined";
import { FrequencyType } from "@/shared/enums/FrequencyType";
import { DiscountUnitType } from "@/shared/enums/DiscountUnitType";

export default function SubscriptionEditPane(): JSX.Element {
  const t = useTranslations("SubscriptionEditPane");
  const { variant, hideSubConfigView } = useVariant();

  if (!variant) return <> </>;

  /**
   * Update/Insert Stripe product
   * @param   stripe_product_id string
   * @returns response          string  Stripe product id
   */
  // const upsertStripeProduct = async (
  //   stripe_product_id?: string
  // ): Promise<string> => {
  //   const product_description = sanitizeHtml(product.description, {
  //     allowedTags: [],
  //     allowedAttributes: {}
  //   });
  //   const product_request: any = {
  //     name: product.name,
  //     shippable: product.type == "physical" ? true : false
  //   };

  //   // Update Stripe request with additional BigCommerce product fields if they are set and not empty
  //   // Product description
  //   if ("" != product_description && null != product_description) {
  //     product_request.description = product_description;
  //   }
  //   // Product image
  //   if ("" != variant.image_url && null != variant.image_url) {
  //     product_request["images"] = [];
  //     product_request["images"].push(variant.image_url);
  //   }
  //   // Package dimensions
  //   if (variant.height && variant.depth && variant.weight && variant.width) {
  //     product_request["package_dimensions"] = {
  //       height: variant.height,
  //       length: variant.depth,
  //       weight: variant.weight,
  //       width: variant.width
  //     };
  //   }

  //   if (isNullOrUndefined(stripe_product_id)) {
  //     return await createStripeProduct(product_request);
  //   } else {
  //     return await updateStripeProduct(stripe_product_id, product_request);
  //   }
  // };

  /**
   * Create Stripe product
   * @param   product_request Stripe.ProductUpdateParams Required.
   * @returns response        string                     stripe product id
   */
  // const createStripeProduct = async (
  //   product_request: Stripe.ProductCreateParams
  // ): Promise<any> => {
  //   try {
  //     const response = await axios.post<Stripe.ProductCreateParams, any>(
  //       `/api/stripe/product/create`,
  //       product_request
  //     );
  //     return response.data.id;
  //   } catch (error) {
  //     errorHandler(error);
  //   }
  // };

  /**
   * Update/Insert Stripe product
   * @param   stripe_product_id string                      Required.
   * @param   product_request   Stripe.ProductUpdateParams  Required.
   * @returns response          string                      stripe product id
   */
  // const updateStripeProduct = async (
  //   stripe_product_id: string,
  //   product_request: Stripe.ProductUpdateParams
  // ): Promise<string> => {
  //   try {
  //     const response = await axios.post<Stripe.ProductUpdateParams, any>(
  //       `/api/stripe/product/${stripe_product_id}/`,
  //       product_request
  //     );
  //     return response.data.id;
  //   } catch (error) {
  //     errorHandler(error);
  //   }
  // };

  /**
   * Update/Insert Stripe Price into product
   * @param stripe_product_id string  Required.
   * @param metadata          object  Required. key value pairs of product data such as bc_id, bc_sku, and variation attributes
   * @returns
   */
  // const upsertStripePrice = async (
  //   stripe_product_id: string,
  //   metadata: any
  // ): Promise<SubscriptionOptionPayload[]> => {
  //   const options = variant.sub_config.options;
  //   const price_request: Stripe.PriceCreateParams = {
  //     currency: "usd",
  //     product: stripe_product_id,
  //     recurring: {
  //       interval: "month",
  //       interval_count: 0,
  //       usage_type: "licensed"
  //     },
  //     metadata: metadata,
  //     billing_scheme: "per_unit",
  //     tax_behavior: "unspecified",
  //     unit_amount_decimal: "0.00"
  //   };

  //   // Loop through and submit prices
  //   for (const i in options) {
  //     const option = options[i];
  //     let stripe_price_id = option.stripe_price_id;

  //     price_request.recurring.interval =
  //       option.type.toLowerCase() as Stripe.PriceCreateParams.Recurring.Interval;
  //     price_request.recurring.interval_count = option.frequency;

  //     // Calculating price
  //     if ("%" == options[i].unit) {
  //       // Percentage
  //       const discount_percentage_decimal = option.discount / 100;
  //       const discount_amount = variant.price * discount_percentage_decimal;
  //       const option_price = variant.price - discount_amount;
  //       // Convert to cents
  //       price_request.unit_amount_decimal = (
  //         option_price *
  //         option.frequency *
  //         100
  //       ).toFixed();
  //     } else {
  //       // Flat rate
  //       price_request.unit_amount_decimal = (
  //         variant.price * option.frequency * 100 -
  //         option.discount * 100
  //       ).toFixed();
  //     }

  //     // Save calculated price
  //     options[i].calculated_price_decimal = price_request.unit_amount_decimal;

  //     // If stripe price id exists, and if prices are different, update the price
  //     // * Note: Stripe price update does not update the price, only metadata, taxes, nickname, and status
  //     // If a price or related fields update, you must make the current price inactive, then create a new price for the product
  //     if (stripe_price_id) {
  //       stripe_price_id = await maybeUpdatePrice(
  //         stripe_price_id,
  //         price_request
  //       );
  //     } else {
  //       stripe_price_id = await createStripePrice(price_request);
  //     }
  //     // Set stripe id in option to save to database
  //     options[i].stripe_price_id = stripe_price_id;
  //   }

  //   return options;
  // };

  /**
   * Archive Stripe price
   * @param stripe_price_id
   * returns stripe price id
   */
  // const archiveStripePrice = async (stripe_price_id: string): Promise<any> => {
  //   try {
  //     const response = await axios.post<Stripe.PriceUpdateParams, any>(
  //       `/api/stripe/price/${stripe_price_id}`,
  //       { active: false }
  //     );
  //     return response.data.id;
  //   } catch (error) {
  //     errorHandler(error);
  //   }
  // };

  /**
   * Create Stripe Price
   * @param   price_request     Required. Stripe.PriceCreateParams
   * @returns stripe price id
   */
  // const createStripePrice = async (
  //   price_request: Stripe.PriceCreateParams
  // ): Promise<any> => {
  //   try {
  //     const response = await axios.post<Stripe.PriceCreateParams, any>(
  //       `/api/stripe/price/create`,
  //       price_request
  //     );
  //     return response.data.id;
  //   } catch (error) {
  //     console.log("createStripePrice :: error :: ", error);
  //     errorHandler(error);
  //   }
  // };

  /**
   * Get Stripe Price
   * @param   stripe_price_id string        Required.
   * @returns response        Stripe.Price
   */
  // const getStripePrice = async (stripe_price_id: string): Promise<any> => {
  //   try {
  //     console.log("stripe_price_id", stripe_price_id);
  //     const response = await axios.get<void, any>(
  //       `/api/stripe/price/${stripe_price_id}`
  //     );
  //     console.log("price from stripe----->", response);
  //     return response.data;
  //   } catch (error) {
  //     console.log("error while getting price", error);
  //     errorHandler(error);
  //   }
  // };

  /**
   * Maybe update Stripe price
   * Checks to see if anything in the price has changed. If so, it will archive the current price and create a new one.
   * @param   stripe_price_id string                    Required.
   * @param   price_request   Stripe.PriceCreateParams  Required.
   * @returns stripe_price_id string
   */
  // const maybeUpdatePrice = async (
  //   stripe_price_id: string,
  //   price_request: Stripe.PriceCreateParams
  // ): Promise<any> => {
  //   let price_change = false;
  //   try {
  //     const current_price = await getStripePrice(stripe_price_id);

  //     // Check if any fields related to the price have been updated
  //     if (
  //       price_request.unit_amount_decimal !=
  //         current_price.unit_amount_decimal ||
  //       price_request.unit_amount_decimal !=
  //         current_price.unit_amount_decimal ||
  //       price_request.recurring.interval != current_price.recurring.interval ||
  //       price_request.recurring.interval_count !=
  //         current_price.recurring.interval_count ||
  //       price_request.metadata.product_type !=
  //         current_price.metadata.product_type ||
  //       price_request.metadata.bc_sku != current_price.metadata.bc_sku
  //     ) {
  //       price_change = true;
  //     }

  //     if ("variation" == price_request.metadata.product_type) {
  //       for (const key in price_request.metadata) {
  //         if (key.indexOf("attribute_") != -1) {
  //           const label: string | number = price_request.metadata[key];

  //           if (key in current_price.metadata) {
  //             if (label != current_price.metadata[key]) {
  //               price_change = true;
  //             }
  //           } else {
  //             price_change = true;
  //           }
  //         }
  //       }
  //     }

  //     if (price_change) {
  //       // Archive stripe price
  //       const archived_price = await archiveStripePrice(stripe_price_id);

  //       console.log("archived_price :: ", archived_price);

  //       return await createStripePrice(price_request);
  //     }

  //     return stripe_price_id;
  //   } catch (err) {
  //     console.log("error while updating price ------>", err);
  //   }
  // };

  /**
   * Update BigCommerce subscription product options
   */
  // const updateSubOptions = async () => {
  //   try {
  //     console.log("aou calling from 1");
  //     await axios.put<SubConfigRequest, any>(
  //       `/api/product/variant/subscription/${variant.id}`,
  //       {
  //         subConfig: product.sub_config,
  //         variant
  //       }
  //     );
  //   } catch (error) {
  //     console.log("error while updating subscriptions------>", error);
  //     errorHandler(error);
  //   }
  // };

  const saveOptionsNew = async () => {
    try {
      console.log("api calling from new method");
      const request: SubConfigRequest = {
        subConfig: {
          is_enabled: true,
          stripe_product_id: "prod_NM04wl3ls1KgSm",
          configsCount: 1,
          optionsCount: 2
        },
        variant: {
          id: 105,
          product_id: 140,
          sku: "TP-2",
          sku_id: null,
          price: 59,
          calculated_price: 59,
          // sale_price: 0,
          // retail_price: 0,
          // map_price: 0,
          weight: 10,
          width: 0,
          height: 0,
          depth: 0,
          // is_free_shipping: false,
          // fixed_cost_shipping_price: 0,
          // calculated_weight: 10,
          // purchasing_disabled: false,
          // purchasing_disabled_message: "",
          image_url: "",
          cost_price: 0,
          // upc: "",
          // mpn: "",
          // gtin: "",
          inventory_level: 0,
          inventory_warning_level: 0,
          bin_picking_number: "",
          option_values: [],
          sub_config: {
            is_enabled: true,
            onetime_purchase: true,
            options: [
              {
                id: "2108a0ef-c8cd-4c85-813c-f673885ebe08",
                stripe_price_id: "price_1MbI4hEr4p5zg8WU6QjxBYPO",
                frequency: 6,
                type: FrequencyType.Months,
                discount: 0,
                unit: DiscountUnitType.Percent,
                calculated_price_decimal: "9900"
              },
              {
                id: "a78444f4-acf9-11ed-afa1-0242ac120002",
                stripe_price_id: "price_1MbNgtEr4p5zg8WU8EbX2P21",
                frequency: 1,
                type: FrequencyType.Months,
                discount: 0,
                unit: DiscountUnitType.Percent,
                calculated_price_decimal: "5900"
              }
            ],
            archive_stripe_price_ids: [],
            default_option_id: "2108a0ef-c8cd-4c85-813c-f673885ebe08"
          }
        }
      };
      await axios.put<SubConfigRequest, any>(
        `/api/product/variant/subscription/${variant.id}`,
        request
      );
    } catch (error) {
      console.log("error while updating subscriptions------>", error);
      errorHandler(error);
    }
  };

  /**
   * Save Subscription Options
   * Syncs subscription prices to BigCommerce and Stripe
   */
  // const saveOptions = async () => {
  //   const initial_stripe_product_id = product.sub_config.stripe_product_id;

  //   const metadata = {
  //     bc_product_id: product.id,
  //     bc_sku: variant.sku,
  //     product_type: "simple"
  //   };

  //   if (product.variants.length > 1) {
  //     for (const i in variant.option_values) {
  //       const attribute = variant.option_values[i];
  //       const option_display_name = attribute.option_display_name.toLowerCase();
  //       const label = attribute.label.toLowerCase();
  //       const index = parseInt(i) + 1;
  //       metadata["attribute_" + index + "_" + option_display_name] = label;
  //     }

  //     metadata["product_type"] = "variation";
  //   }

  //   // If options exist, check if any stripe price updated, if so, archive and create new prices
  //   if (variant.sub_config.options.length) {
  //     // Add/update stripe product
  //     const stripe_product_id = await upsertStripeProduct(
  //       initial_stripe_product_id
  //     );

  //     // Add in stripe product id to subscription product meta before save
  //     product.sub_config.stripe_product_id = stripe_product_id;

  //     // Add/update pricing to stripe product
  //     const subscription_options = await upsertStripePrice(
  //       stripe_product_id,
  //       metadata
  //     );
  //     console.log("saving subscription------>", variant.sub_config.options);
  //     variant.sub_config.options = subscription_options;
  //   }

  //   console.log("saving subscription 123------>", variant.sub_config.options);

  //   // Archive prices
  //   if (variant.sub_config.archive_stripe_price_ids.length) {
  //     for (const stripe_price_id of variant.sub_config
  //       .archive_stripe_price_ids) {
  //       await archiveStripePrice(stripe_price_id);
  //     }

  //     // After archive, reset before save
  //     variant.sub_config.archive_stripe_price_ids = [];
  //   }

  //   // Update bigcommerce product variant
  //   updateVariant(variant);

  //   // Update product and variant subscription configuration options
  //   await updateSubOptions();

  //   // Hide subscription confg view
  //   hideSubConfigView();

  //   // Trigger success notifcation
  //   alertManager.add({
  //     messages: [
  //       {
  //         text: t("saveSuccessText", { sku: variant.sku })
  //       }
  //     ],
  //     type: "success",
  //     autoDismiss: true
  //   });
  // };

  return (
    <PageLayout title={t("title")}>
      <SubscriptionEditPanel />

      <ActionBar
        buttons={[
          <Button
            key="sub_cancel_button"
            variant="subtle"
            onClick={() => hideSubConfigView()}
          >
            {t("cancelButtonText")}
          </Button>,
          <AsyncButton
            key="save_sub_options_button"
            variant="primary"
            onClick={saveOptionsNew}
          >
            {t("saveButtonText")}
          </AsyncButton>
        ]}
      />
    </PageLayout>
  );
}
