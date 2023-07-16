'use client';
import React from "react";
import { useSession } from "next-auth/react";

//-------------------------------------------styles
import styles from '../styles/landing.module.css';

//-------------------------------------------components
import Section1 from "./landing/section1";
import Footer from "@/components/footer/footer";
import Section3 from "./landing/section3";
import Section4 from "./landing/section4";
import Section5 from "./landing/section5";
import Section6 from "./landing/section6";
import Section2 from "./landing/section2";

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

  return (
    <>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Footer />
    </>
  );
};

export default Home;