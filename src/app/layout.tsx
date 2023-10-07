'use client';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ApolloProvider } from "@apollo/react-hooks";
import { SessionProvider } from 'next-auth/react';
import client from '../config/applloClient';
import React from 'react';
import { Session } from "next-auth";
import Head from 'next/head';
import Script from 'next/script';

//--------------------------------------------------------components
// import Loading from '@/components/loading/loading';
import { lato } from '../../fonts';

//--------------------------------------------------------css
import "react-responsive-carousel/lib/styles/carousel.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/customBootstrapStyles.css';
import '../styles/customCarouselStyles.css';
import '../styles/customAntdStyles.css';
import '../styles/customMuiStyles.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../styles/global.css';
import 'antd/dist/reset.css';
import '../styles/nprogress.css'


// export const metadata = {
//   title: 'Write Wise Ai',
//   description: 'Ielts Writing Ai',
// }

export default function RootLayout({
  children,
  pageProps
}: {
  children: React.ReactNode,
  pageProps: { session: Session },
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'Write Wise Ai',
    // image: product.image,
    description: 'Ielts Writing Ai'
  };

  return (
    <SessionProvider session={pageProps?.session}>
      <ApolloProvider client={client}>
        <html lang="en"
        // className={`${lato.variable} font-sans`}
        >
          <title>Write Wise Ai</title>
          <Head>
            <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
            <meta
              name="description"
              content="Unlock your IELTS writing potential with WriteWiseAI,  four-step process to get accurate essay ratings, personalized feedback,
              and valuable recommendations"></meta>
          </Head>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <body className={lato.className}>
              {/* <Suspense fallback={<Loading />}> */}
              {children}
              {/* </Suspense> */}
              <Script id="tawk" strategy="lazyOnload">
                {`
               var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
               (function(){
               var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
               s1.async=true;
               s1.src='https://embed.tawk.to/6517b2cbe6bed319d0046a9c/1hbi94raq';
               s1.charset='UTF-8';
               s1.setAttribute('crossorigin','*');
               s0.parentNode.insertBefore(s1,s0);
               })();
              `}
              </Script>
              <div id='tawk' />
            </body>
          </LocalizationProvider>
        </html>
      </ApolloProvider>
    </SessionProvider>
  )
}

