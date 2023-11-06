import React from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";
import RootLayout from "./app/layout";

export default function App({ Component, pageProps }: { Component: React.ComponentType; pageProps: any }) {
  return (
    <Provider store={store}>
      <RootLayout>
        <Component {...pageProps} />
      </RootLayout>
    </Provider>
  );
}
