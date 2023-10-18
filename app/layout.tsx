import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AuthProvider } from "./AuthProvider";
import NavbarWithDropdown from "./NavbarWithDropdown";
import AppContextProvider from "./_context/AppContextProvider";
import "./globals.css";
import styles from "./page.module.css";

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
  return process.env.NEXT_PUBLIC_ENVIRONMENT === "local" ? (
    <html lang="en">
      <body className={inter.className}>
        <AppContextProvider>
          <NavbarWithDropdown />
          <main className={styles.main}>{children}</main>
        </AppContextProvider>
      </body>
    </html>
  ) : (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <AppContextProvider>
            <NavbarWithDropdown />
            <main className={styles.main}>{children}</main>
          </AppContextProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
