'use client'
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ApolloProvider } from "@apollo/react-hooks";
import { SessionProvider } from 'next-auth/react';
import client from '../config/applloClient';
import React from 'react';
import { Session } from "next-auth";
import Head from 'next/head';
import Script from 'next/script';
import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { Inter, Lato } from "next/font/google";
import CookieConsent from '@/components/cookies/cookies';

const lato = Lato({
    subsets: ["latin"],
    variable: "--font-lato",
    weight: '100'
});

export default function ClientComponent({
    children,
    pageProps

}: {
    pageProps: { session: Session },
    children: React.ReactNode,
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
                    suppressHydrationWarning
                    className={lato.className}
                >
                    <head>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />
                    </head>
                    <title>Write Wise Ai</title>

                    <Head>
                        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
                        <meta
                            name="description"
                            content="Unlock your IELTS writing potential with WriteWiseAI,  four-step process to get accurate essay ratings, personalized feedback,
                and valuable recommendations"></meta>
                        <meta name="viewport" content="width=device-width, initial-scale=1" />

                    </Head>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <body
                            className="antialiased text-gray-800 dark:bg-black dark:text-gray-400 mainContainer"
                        >
                            {children}
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
                    <CookieConsent />
                </html>
            </ApolloProvider>
        </SessionProvider>
    )
}