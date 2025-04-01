import Head from 'next/head';
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Info({ children }) {
  return (
    <div>
      <Head>
        <meta name="description" content="Find important health and nutrition information to help you stay on track." />
        <title>Health & Nutrition Info</title>
      </Head>

      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
