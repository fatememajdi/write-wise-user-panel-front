import React from 'react';
import { Session } from "next-auth";
import "@/styles/tailwind.css";
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
import ErrorBoundary from '@/components/error/ErrorBoundary';

export const metadata: Metadata = {
  title: 'Write Wise Ai',
  description: 'Ielts Writing Ai',
  viewport: 'viewport-fit=cover,width=device-width, initial-scale=1, maximum-scale=1',
  icons: {
    icon: '/logoIcon3.svg'
  }
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
      <ErrorBoundary fallback='There was an error!'>
        {children}
      </ErrorBoundary>
    </ClientComponent>
  )
}

