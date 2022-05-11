import React from "react";
import { AppProps } from "next/app";
import { AlertsManager } from "@bigcommerce/big-design";
import { ThemeProvider } from "styled-components";
import { theme } from "@bigcommerce/big-design-theme";
import alertManager from "../libs/alerts";
import Head from "next/head";
import BigStoreProvider from "@/frontend/providers/BigStoreProvider";
import "@/frontend/css/styles.css";
import { NextIntlProvider } from "next-intl";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Head>
        <style type="text/css">
          {`      
          body {
            background-color: ${theme.colors.secondary10};
          }
          `}
        </style>
      </Head>
      <AlertsManager manager={alertManager} />
      <BigStoreProvider>
        <NextIntlProvider messages={pageProps.messages}>
          <Component {...pageProps} />
        </NextIntlProvider>
      </BigStoreProvider>
    </ThemeProvider>
  );
}

export default MyApp;
