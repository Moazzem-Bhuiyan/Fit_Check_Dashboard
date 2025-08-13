import localFont from "next/font/local";
import { DM_Sans, Montserrat } from "next/font/google";
import "./globals.css";
import Providers from "../lib/Providers";
import ReduxProviders from "@/redux/lib/ReduxProvider";
import { Toaster } from "react-hot-toast";

const generalSans = localFont({
  src: "../assets/fonts/GeneralSans-Variable.woff2",
  variable: "--font-general-sans",
  weight: "100 900",
  display: "swap",
  subsets: ["latin"],
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});
const MontserratDm = Montserrat({
  variable: "--font-montserrat",
  display: "swap",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "900"],
});

export const metadata = {
  title: {
    default: "Fit Check Dashboard",
    template: "%s | Fit-Check-Dashboard",
  },
  description:
    "Fit Check Dashboard is a comprehensive platform designed to streamline the management of fitness-related data, providing insights into user statistics and earnings.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>

      <body
        className={`${generalSans.className} ${dmSans.variable} ${MontserratDm.variable} box-border antialiased`}
      >
        <ReduxProviders>
          <Toaster richColors position="top-center" />
          <Providers>{children}</Providers>
        </ReduxProviders>
      </body>
    </html>
  );
}
