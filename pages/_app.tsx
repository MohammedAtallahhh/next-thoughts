import { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);
  const { asPath } = useRouter();

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return isSSR ? null : (
    <GoogleOAuthProvider
      clientId={`${process.env.NEXT_PUBLIC_GOOGLE_API_TOKEN}`}
    >
      <div className="app">
        {/*===== Navbar ==========*/}
        <Navbar />

        <div className="flex gap-6 md:gap-20">
          {/* =========== Sidebar ========= */}
          {asPath !== "/upload" && <Sidebar />}

          {/*============= Main Content ============*/}
          <main className="content mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
};

export default MyApp;
