import React from "react";
import Image from "next/image";

//-------------------------------------styles
import '../../../styles/global.css';
import styles from './section5Background.module.css';

const Section5Background: React.FC<{ children: React.ReactNode }> = ({ children }) => <section className={'col-12 ' + styles.section5Background} id='wiseSense'>
    <Image
        className={'selectBack ' + styles.hands}
        src="/landing/hands.svg"
        alt="ai hands"
        width={660}
        height={371}
        loading="eager"
        priority
    />

    <Image
        className={'selectBack ' + styles.topBackground}
        src="/landing/section5-top.svg"
        alt="ai hands"
        width={881}
        height={515}
        loading="eager"
        priority
    />


    {children}
</section>;

export default Section5Background;