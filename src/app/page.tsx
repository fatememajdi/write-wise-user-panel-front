import React from "react";

//-------------------------------------------styles
import styles from '../styles/landing.module.css';

//-------------------------------------------components
import LandingBackground from "@/components/landingBackground/landingBackground";
import Section1 from "./landing/section1";
import Footer from "@/components/footer/footer";
import Section3 from "./landing/section3";
import Section4 from "./landing/section4";
import Section5 from "./landing/section5";
import Section6 from "./landing/section6";
import Section2 from "./landing/section2";

const Home: React.FC = () => {
  return (
    <LandingBackground>
      <Section1 />
      <Section2 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <Footer />
    </LandingBackground>
  );
};

export default Home;