import { ThemeProvider } from "@/components/ui/theme-provier";
import "@/styles/globals.css";
import localFont from "next/font/local";
import type { AppProps } from "next/app";

const myFont = localFont({ src: "./geist-mono.woff2" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </main>
  );
}
