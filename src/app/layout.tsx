import React from 'react';
import { Session } from "next-auth";
import "@/styles/tailwind.css";
import { Providers } from "./providers";
import { Inter, Lato } from "next/font/google";
import type { Metadata } from 'next'

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
import ClientComponent from './clientComponent';

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter"
});

const lora = Lato({
  subsets: ["latin"],
  variable: "--font-loto",
  weight: '100'
});

export const metadata: Metadata = {
  title: 'Write Wise Ai',
  description: 'Ielts Writing Ai',
  viewport: 'width=device-width,  initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
}

export default function RootLayout({
  children,
  pageProps
}: {
  children: React.ReactNode,
  pageProps: { session: Session },
}) {

  return (
    <ClientComponent pageProps={pageProps} >
      <Providers>{children}</Providers>
    </ClientComponent>
  )
}

