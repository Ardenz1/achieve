import Header from "../../../components/header";
import Footer from "../../../components/footer";

export default function profile({ children }) {
    return (
      <div>
        
          <Header />
        <main>{children}</main>
        <Footer />
      </div>
    );
  }