import "@/styles/globals.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";

import CartIdContextProvider from "@/components/Cart/CartIdContextProvider";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
import Layout from "@/components/Layout/Layout";

const client = new QueryClient();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartIdContextProvider>
      <QueryClientProvider client={client}>
        <Layout>
          <Header />
          <Component {...pageProps} />
          <Footer />
        </Layout>
      </QueryClientProvider>
    </CartIdContextProvider>
  );
}

export default MyApp;
