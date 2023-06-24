import React from "react";
import Image from "next/image";

//-------------------------------------styles
import styles from './section2Background.module.css';

const Section2Background: React.FC<{ children: React.ReactNode }> = ({ children }) => <section className={'col-12 ' + styles.section2Background}>
    {/* <Image
        className={styles.headerBackground}
        src="/landing/section2-header-background.svg"
        alt="background"
        width={1719}
        height={220}
        priority
    />

    <Image
        className={styles.headerShadow}
        src="/landing/section2-header-shadow.svg"
        alt="background"
        width={1719}
        height={252}
        priority
    /> */}

    <Image
        className={styles.rightBottomBackground}
        src="/section2/right-bottom.svg"
        alt="background"
        width={377}
        height={353}
        priority
    />
    <Image
        className={styles.leftTopBackground}
        src="/section2/left-top.svg"
        alt="background"
        width={377}
        height={459}
        priority
    />

    {children}
</section>;

export default Section2Background;