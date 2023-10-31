'use client';
import React, { Suspense, lazy } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { StartLoader } from "@/components/Untitled";

//-------------------------------------------styles
import styles from '../styles/landing.module.css';

//-------------------------------------------components
const Section1 = lazy(() => import('./landing/section1'));
const Section2 = lazy(() => import("./landing/section2"));
const Section3 = lazy(() => import("./landing/section3"));
const Section4 = lazy(() => import("./landing/section4"));
const Section5 = lazy(() => import("./landing/section5"));
const Section6 = lazy(() => import("./landing/section6"));
const Section7 = lazy(() => import("./landing/section7"));
const Section8 = lazy(() => import("./landing/section8"));
const Footer = lazy(() => import("@/components/footer/footer"));
const Loading = dynamic(() => import("@/components/loading/loading"));

const Home: React.FC = () => {

  const { data: session, status } = useSession({
    required: true, onUnauthenticated() {
      return
    }
  });

  //------------------------------------------------------------------check user loged in
  React.useEffect(() => {
    if (!localStorage.getItem('user')) {
      if (status != "loading") {
        if (status === 'authenticated') {
          localStorage.setItem('user', session.user.token);
        }
      }
    }
  });

  const router = useRouter();

  return (
    <Suspense fallback={<Loading />}>
      <div className={'col-12 ' + styles.landingContainer}>
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Section5 />
        <Section6 />
        <Section7 />
        <Section8 />
        <Footer />
        <button
          onClick={() => {
            StartLoader();
            router.push('/signIn');
          }}
          className={styles.startButton}>
          start now
        </button>
      </div>
    </Suspense>
  );
};

export default Home;