import Head from 'next/head';
import Header from "../../components/header";
import Footer from "../../components/footer";

export default function Recipes({ children }) {
  return (
    <div>
      <Head>
        {/* Default meta description for all pages */}
        <meta name="description" content="Explore our collection of healthy and delicious recipes!" />
        <title>Recipes - Your Source for Healthy Meals</title>
      </Head>
      
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
