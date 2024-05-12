import "@/styles/globals.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import CartContextProvider from "@/components/CartContextProvider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={client}>
      <CartContextProvider>
        <Layout>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </CartContextProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
