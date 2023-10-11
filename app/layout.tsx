import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import AppContextProvider from "./_context/AppContextProvider";
import NavbarWithDropdown from "./NavbarWithDropdown";
import { AuthProvider } from "./AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Simple DB",
  description: "Simple hierarchical DB",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppContextProvider>
            <NavbarWithDropdown />
            {children}
          </AppContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
