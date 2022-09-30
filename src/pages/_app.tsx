import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContextProvider from "../components/CartContextProvider";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

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
