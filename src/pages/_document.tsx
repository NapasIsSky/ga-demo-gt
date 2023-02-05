import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="viewport" content="viewport-fit=cover" />
      </Head>
      <body>
        {/* Global site tag (gtag.js) - Google Analytics  */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-GEXWJ3LQMY"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-GEXWJ3LQMY');
        `}
        </Script>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
