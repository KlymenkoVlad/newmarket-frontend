import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";

import Footer from "@/components/Layout/Footer";
import { StateContext } from "@/context/StateContext";
import Header from "@/components/Layout/Header";
import BurgerMenu from "@/components/Layout/BurgerMenu";
import Cart from "@/components/Layout/_components/Cart/Cart";
import WishList from "@/components/Layout/_components/WishList/WishList";
import NavMenu from "@/components/Layout/NavMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Marketplace",
  description: "Marketplace by Vlad",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StateContext>
          <Header />
          <NavMenu />

          <Toaster />
          {children}
          <BurgerMenu />
          <Cart />
          <WishList />

          <Footer />
        </StateContext>
      </body>
    </html>
  );
}
