import React from "react";
import Image from "next/image";

//-------------------------------------------styles
import styles from '../../styles/landingBackground.module.css';
import LandingHeader from "../landingHeader/landingHeader";

const LandingBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className={'col-12 ' + styles.landingBackground}>
    <LandingHeader />
    {children}
</div>;

export default LandingBackground;