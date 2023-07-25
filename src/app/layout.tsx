'use client';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ApolloProvider } from "@apollo/react-hooks";
import { SessionProvider } from 'next-auth/react';
import client from '../config/applloClient';
import React, { Suspense } from 'react';
import { Session } from "next-auth";
import Head from 'next/head';
//--------------------------------------------------------components
import Loading from '@/components/loading/loading';
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


export const metadata = {
  title: 'Write Wise Ai',
  description: 'Ielts Writing Ai',
}

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
              content="  Unlock your IELTS writing potential with WriteWiseAI,  four-step process to get accurate essay ratings, personalized feedback,
              and valuable recommendations "></meta>
          </Head>
          <LocalizationProvider dateAdapter={AdapterMoment}>
            <body className={lato.className}>
              <Suspense fallback={<Loading />}>
                {children}
              </Suspense>
            </body>
          </LocalizationProvider>
        </html>
      </ApolloProvider>
    </SessionProvider>
  )
}

