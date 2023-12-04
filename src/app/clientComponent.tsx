/* eslint-disable @next/next/inline-script-id */
/* eslint-disable react/no-unescaped-entities */
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
import { Lato, Roboto, Inter } from "next/font/google";
import CookieConsent from '@/components/cookies/cookies';
import { IS_FROM_IRAN } from '@/config/graphql';
import { Toaster } from 'react-hot-toast';

const lato = Lato({
    subsets: ["latin"],
    variable: "--font-lato",
    weight: '100'
});

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    weight: '100'
});

const roboto = Roboto({
    subsets: ["latin"],
    variable: "--font-roboto",
    weight: '100'
});

export default function ClientComponent({
    children,
    pageProps

}: {
    pageProps: { session: Session },
    children: React.ReactNode,
}) {

    const [fromIran, setFromIran] = React.useState<boolean>(false);

    async function CheckCountry() {
        await client.query({
            query: IS_FROM_IRAN,
            fetchPolicy: "no-cache"
        }).then(async (res) => {
            setFromIran(res.data.isFromIran);
        }).catch((err) => {
            console.log("get county error : ", err);
        });
    };

    const jsonLd = {
        // '@context': 'https://schema.org',
        // '@type': 'Blog',
        name: 'Write Wise Ai',
        image: '/logoIcon.svg',
        description: 'Ielts Writing Ai'
    };

    React.useEffect(() => {
        CheckCountry();
    }, []);

    return (
        <SessionProvider session={pageProps?.session}>
            <ApolloProvider client={client}>
                <html lang="en"
                    suppressHydrationWarning
                    className={lato.className + ' ' + inter.className + ' ' + roboto.className}
                >
                    <title>Write Wise Ai</title>

                    <Head>
                        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
                        <meta
                            name="description"
                            content="Unlock your IELTS writing potential with WriteWiseAI,  four-step process to get accurate essay ratings, personalized feedback,
                and valuable recommendations"></meta>
                        {/* <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0,user-scalable=0" /> */}
                        <link rel="icon" href="/logoIcon.svg" />
                    </Head>

                    <LocalizationProvider dateAdapter={AdapterMoment}>

                        <body
                        // className="antialiased text-gray-800 dark:bg-black dark:text-gray-400 mainContainer"
                        >
                            
                            {children}
                            <Toaster position='top-center' />

                            <Script id="tawk" strategy="lazyOnload">
                                {`
               var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
               (function(){
               var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
               s1.async=true;
               s1.src='https://embed.tawk.to/651990a910c0b257248765ee/1hbmfd0ck';
               s1.charset='UTF-8';
               s1.setAttribute('crossorigin','*');
               s0.parentNode.insertBefore(s1,s0);
               })();
              `}
                            </Script>
                            {
                                fromIran ?
                                    <Script type="text/javascript">
                                        {
                                            `["keydown","touchmove","touchstart","mouseover"].forEach(function(v){window.addEventListener(v, function () { if (!window.isGoftinoAdded) { window.isGoftinoAdded = 1;
                                             var i = "7aFKEK", d = document, g = d.createElement("script"), s = "https://www.goftino.com/widget/" + i, l = localStorage.getItem("goftino_" + i);
                                              g.type = "text/javascript", g.async = !0, g.src = l ? s + "?o=" + l : s;
                                               d.getElementsByTagName("head")[0].appendChild(g); } })});`}
                                    </Script>
                                    :
                                    <div id='tawk' />
                            }
                        </body>

                    </LocalizationProvider>
                    <CookieConsent />
                </html>
            </ApolloProvider>
        </SessionProvider>
    )
}