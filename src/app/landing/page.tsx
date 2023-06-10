import React from "react";

//-------------------------------------------styles
import styles from './landing.module.css';

//-------------------------------------------components
import LandingBackground from "@/components/landingBackground/landingBackground";
import Section1 from "./section1";

const Landing: React.FC = () => {
    return (
        <LandingBackground>
            <Section1 />
        </LandingBackground>
    );
};

export default Landing;