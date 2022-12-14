import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Layout from "../components/Layout";
import Header from "../components/Header";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </Layout>
  );
}

export default MyApp;
