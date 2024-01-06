'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { StartLoader, StopLoader } from "@/components/Untitled";

//-------------------------------------------styles
import styles from '../styles/landing.module.css';

//-------------------------------------------components
const Section1 = dynamic(() => import('./landing/section1'), { ssr: false });
const Section2 = dynamic(() => import("./landing/section2"), { ssr: false });
const Section3 = dynamic(() => import("./landing/section3"), { ssr: false });
const Section4 = dynamic(() => import("./landing/section4"), { ssr: false });
// const Section5 = dynamic(() => import("./landing/section5"));
const Section6 = dynamic(() => import("./landing/section6"), { ssr: false });
const Section7 = dynamic(() => import("./landing/section7"), { ssr: false });
const Section8 = dynamic(() => import("./landing/section8"), { ssr: false });
const Footer = dynamic(() => import("@/components/footer/footer"), { ssr: false });
const Loading = dynamic(() => import("@/components/loading/loading"), { ssr: false });

const Home: React.FC = () => {

  const { data: session, status } = useSession({
    required: true, onUnauthenticated() {
      return
    }
  });

  //------------------------------------------------------------------check user loged in
  React.useEffect(() => {
    StopLoader();
    if (!localStorage.getItem('user')) {
      if (status != "loading") {
        if (status === 'authenticated') {
          localStorage.setItem('user', session.user.token);
        }
      }
    }
  });

  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return isLoading ?
    <Loading />
    :
    <Suspense fallback={<Loading />}>
      <div className={'col-12 ' + styles.landingContainer}>

        <Suspense fallback={<Loading />}><Section1 /></Suspense>
        <Suspense fallback={<Loading />}><Section2 /></Suspense>
        <Suspense fallback={<Loading />}><Section3 /></Suspense>
        <Suspense fallback={<Loading />}><Section6 /></Suspense>
        <Suspense fallback={<Loading />}><Section7 /></Suspense>
        <Suspense fallback={<Loading />}><Section4 /></Suspense>
        <Suspense fallback={<Loading />}><Section8 /></Suspense>
        <Suspense fallback={<Loading />}><Footer /></Suspense>
        {/* <Section5 /> */}
        <button
          onClick={() => {
            StartLoader();
            router.push('/signIn');
          }}
          className={styles.startButton}>
          Start Now
        </button>
      </div>
    </Suspense>
};

export default Home;
