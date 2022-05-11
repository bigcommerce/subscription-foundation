import React from "react";
import { Box } from "@bigcommerce/big-design";
import { GetServerSideProps } from "next";
import { sAxios } from "../libs";
import ProductProvider from "../providers/ProductProvider";
import ProductsListPane from "../components/Products/Panes/ListPane";
import { CSSTransition, SwitchTransition } from "react-transition-group";
import {
  ProductPageView,
  useProductContext
} from "../providers/ProductProvider/context";
import SubscriptionEditPane from "../components/Products/Panes/SubscriptionEditPane";
import GlobalProvider from "../providers/GlobalProvider";
import ProductPayload from "@/shared/payloads/product/ProductPayload";
import VariantProductListPane from "../components/Products/Panes/VariantProductListPane";
import LoadingScreen from "../components/Base/LoadingScreen";
import useLoading from "../providers/ProductProvider/modules/useLoading";

export const getServerSideProps: GetServerSideProps = async ({
  req,
  locale
}) => {
  const messages = await import(`/src/locales/${locale}.json`);

  try {
    const { data } = await sAxios(req).get("/api/product");
    return {
      props: {
        products: data,
        messages: messages.default
      }
    };
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    };
  }
};

const viewMap = {
  [ProductPageView.LIST]: ProductsListPane,
  [ProductPageView.VARIANT_PRODUCTS]: VariantProductListPane,
  [ProductPageView.SUBSCRIPTION_EDIT]: SubscriptionEditPane
};

const ProductsView = (): JSX.Element => {
  const { view } = useProductContext();
  const { loading } = useLoading();
  return (
    <>
      <SwitchTransition>
        <CSSTransition key={view} timeout={500} classNames={"fade-in"}>
          <Box className="trans-item">
            {loading && <LoadingScreen />}
            {Object.keys(viewMap).map(key => {
              const View = viewMap[key];
              return (
                <div key={key} style={key !== view ? { display: "none" } : {}}>
                  <View />
                </div>
              );
            })}
          </Box>
        </CSSTransition>
      </SwitchTransition>
    </>
  );
};

const ProductsPage = ({
  products
}: {
  products: ProductPayload[];
}): JSX.Element => {
  return (
    <GlobalProvider>
      <ProductProvider products={products}>
        <ProductsView></ProductsView>
      </ProductProvider>
    </GlobalProvider>
  );
};

export default ProductsPage;
