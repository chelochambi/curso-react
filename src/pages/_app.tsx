import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { CarritoProvider } from "@/context/CarritoContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CarritoProvider>
      <Component {...pageProps} />
    </CarritoProvider>
  );
}
