import React from "react";
import Image from "next/image";

//-----------------------------------------styles
import styles from './featuresBackground.module.css';
import LandingHeader from "@/components/landingHeader/landingHeader";

const FeaturesBackground: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <section className={'col-12 ' + styles.featuresBackground} id='features'>
        <Image
            className={styles.rightTop3Background + ' ' + styles.mobile}
            src="/features/right-top.svg"
            alt="background"
            width={386}
            height={183}
            loading="eager"
            priority
        />
        {/* <Image
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
        /> */}
        {/* <Image
            className={styles.rightTopBackground}
            src="/features/right-top.svg"
            alt="background"
            width={386}
            height={183}
            priority
        /> */}
        {/* <Image
            className={styles.rightTop2Background + ' ' + styles.mobile}
            src="/features/right-top-2.svg"
            alt="background"
            width={372}
            height={347}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftTopBackground + ' ' + styles.mobile}
            src="/features/left-top.svg"
            alt="background"
            width={489}
            height={293}
            loading="eager"
            priority
        /> */}
        {/* <Image
            className={styles.leftTopBackground + ' ' + styles.mobile}
            src="/features/left-top.svg"
            alt="background"
            width={489}
            height={293}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftTop2Background + ' ' + styles.mobile}
            src="/features/left-top-2.svg"
            alt="background"
            width={346}
            height={296}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftTop3Background + ' ' + styles.mobile}
            src="/features/left-top-2.svg"
            alt="background"
            width={346}
            height={296}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftCenterBackground + ' ' + styles.mobile}
            src="/features/left-center.svg"
            alt="background"
            width={378.08}
            height={449.02}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftCenter2Background + ' ' + styles.mobile}
            src="/features/left-center.svg"
            alt="background"
            width={378.08}
            height={449.02}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftBottomBackground + ' ' + styles.mobile}
            src="/features/left-bottom.svg"
            alt="background"
            width={326.61}
            height={188.38}
            loading="eager"
            priority
        /> */}
        {children}
    </section>;


const FeaturesDetailsBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logedIn, changeLogedIn] = React.useState<boolean>(false);

    React.useEffect(() => {
        const item = localStorage.getItem('user');
        if (item)
            changeLogedIn(true);
        else
            changeLogedIn(false);
    }, []);


    return <div className={'col-12 ' + styles.featuresDetailsBackground}>
        <LandingHeader logedIn={logedIn} shadow />
        <Image
            className={styles.centerBackground}
            src="/features/center.svg"
            alt="background"
            width={427.75}
            height={357}
            priority
        />
        <Image
            className={styles.center2Background}
            src="/features/center-2.svg"
            alt="background"
            width={205.58}
            height={546.45}
            priority
        />
        {children}
    </div>
}
export { FeaturesBackground, FeaturesDetailsBackground };