'use client';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { StartLoader, StopLoader } from "@/components/Untitled";

//-------------------------------------------styles
import styles from '../styles/landing.module.css';
import Script from 'next/script';

//-------------------------------------------components
const Section1 = dynamic(() => import('./landing/section1'));
const Section2 = dynamic(() => import("./landing/section2"));
const Section3 = dynamic(() => import("./landing/section3"));
const Section4 = dynamic(() => import("./landing/section4"));
const Section5 = dynamic(() => import("./landing/section5"));
const Section6 = dynamic(() => import("./landing/section6"));
const Section7 = dynamic(() => import("./landing/section7"));
const Section8 = dynamic(() => import("./landing/section8"));
const Footer = dynamic(() => import("@/components/footer/footer"));
const Loading = dynamic(() => import("@/components/loading/loading"));

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
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }, []);

  return isLoading ?
    <Loading />
    :
    <Suspense fallback={<Loading />}>
      <div className={'col-12 ' + styles.landingContainer}>
       
        <Section1 />
        <Section2 />
        <Section3 />
        <Section6 />
        {/* <Section5 /> */}
        <Section7 />
        <Section4 />
        <Section8 />
        <Footer />
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
