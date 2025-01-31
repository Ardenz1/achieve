import Header from "../../components/header";
import Footer from "../../components/footer";


export default function Info({ children }) {
    return (
      <div>
          <Header />
        <main>{children}</main>
        <Footer />
      </div>
    );
  }