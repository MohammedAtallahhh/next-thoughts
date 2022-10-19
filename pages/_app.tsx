import { useEffect, useState } from "react";
import type { AppProps } from "next/app";

import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

import "../styles/globals.css";

const MyApp = ({ Component, pageProps }: AppProps) => {
  const [isSSR, setIsSSR] = useState(true);

  useEffect(() => {
    setIsSSR(false);
  }, []);

  return isSSR ? null : (
    <>
      <div className="app">
        {/*===== Navbar ==========*/}
        <Navbar />

        <div className="flex gap-6 md:gap-20">
          {/* =========== Sidebar ========= */}
          <Sidebar />

          {/*============= Main Content ============*/}
          <main className="content mt-4 flex flex-col gap-10 overflow-auto h-[88vh] flex-1">
            <Component {...pageProps} />
          </main>
        </div>
      </div>
    </>
  );
};

export default MyApp;
