import { M_PLUS_Rounded_1c } from "next/font/google";

import "./globals.css";
import Header from "../components/header";
import Footer from "../components/footer";


const mplusrounded = M_PLUS_Rounded_1c({
  variable: "--font-m-plus-rounded",
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "800", "900"],
});

export const metadata = {
  title: "Achieve",
  description: "Achieveing your goals",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={mplusrounded.className}>
      <head>
      <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"  rel="stylesheet"></link>
      </head>
      <body
        className={`${mplusrounded.variable} antialiased`}   >
      {/* <Header /> */}
        <main>{children}</main>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
