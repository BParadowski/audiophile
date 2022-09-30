import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CartContextProvider from "../components/CartContextProvider";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartContextProvider>
      <Layout>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </Layout>
    </CartContextProvider>
  );
}

export default MyApp;
