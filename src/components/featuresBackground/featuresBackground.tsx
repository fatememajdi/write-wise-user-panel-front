import React from "react";
import Image from "next/image";

//-----------------------------------------styles
import styles from './featuresBackground.module.css';

const FeaturesBackground: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <div className={styles.featuresBackground}>
        <Image
            className={styles.rightTop3Background}
            src="/features/right-top.svg"
            alt="background"
            width={386}
            height={183}
            priority
        />
        <Image
            className={styles.rightTop3Background}
            src="/features/right-top.svg"
            alt="background"
            width={386}
            height={183}
            priority
        />
        <Image
            className={styles.rightTopBackground}
            src="/features/right-top.svg"
            alt="background"
            width={386}
            height={183}
            priority
        />
        {/* <Image
            className={styles.rightTopBackground}
            src="/features/right-top.svg"
            alt="background"
            width={386}
            height={183}
            priority
        /> */}
        <Image
            className={styles.rightTop2Background}
            src="/features/right-top-2.svg"
            alt="background"
            width={372}
            height={347}
            priority
        />
        <Image
            className={styles.leftTopBackground}
            src="/features/left-top.svg"
            alt="background"
            width={489}
            height={293}
            priority
        />
        <Image
            className={styles.leftTopBackground}
            src="/features/left-top.svg"
            alt="background"
            width={489}
            height={293}
            priority
        />
        <Image
            className={styles.leftTop2Background}
            src="/features/left-top-2.svg"
            alt="background"
            width={346}
            height={296}
            priority
        />
        <Image
            className={styles.leftTop3Background}
            src="/features/left-top-2.svg"
            alt="background"
            width={346}
            height={296}
            priority
        />
        <Image
            className={styles.leftCenterBackground}
            src="/features/left-center.svg"
            alt="background"
            width={378.08}
            height={449.02}
            priority
        />
        <Image
            className={styles.leftCenter2Background}
            src="/features/left-center.svg"
            alt="background"
            width={378.08}
            height={449.02}
            priority
        />
        <Image
            className={styles.leftBottomBackground}
            src="/features/left-bottom.svg"
            alt="background"
            width={326.61}
            height={188.38}
            priority
        />
        {children}
    </div>;

export default FeaturesBackground;