import { Montserrat } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Head from "next/head"; // Import the Head component

const montserrat = Montserrat({ subsets: ["latin"] });

// export const metadata = {
//   title: "DMA",
//   description: "Experts are here to solve your business problems.",
// };

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Pragma" content="no-cache" />
        <meta
          httpEquiv="cache-control"
          content="no-cache, no-store, must-revalidate"
        />
      </head>
      <body className={`Montserrat-font-div bg-white`}>
        <div
          className="w-screen overflow-y-auto overflow-x-hidden"
          id="hidescroll"
        >
          {children}
        </div>
      </body>
      <GoogleAnalytics gaId="G-3XED4VV67R" />
    </html>
  );
}
