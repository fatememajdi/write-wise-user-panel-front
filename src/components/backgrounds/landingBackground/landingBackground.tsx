import React from "react";
import Image from "next/image";

//-------------------------------------------styles
import styles from './landingBackground.module.css';
import LandingHeader from "../../landingHeader/landingHeader";

const LandingBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logedIn, changeLogedIn] = React.useState<boolean>(false);

    React.useEffect(() => {
        const item = localStorage.getItem('user');
        if (item)
            changeLogedIn(true);
        else
            changeLogedIn(false);
    }, [])

    return <div className={'col-12 ' + styles.landingBackground}>
      
        <Image
            className={"w-full h-auto " + styles.headerBackground}
            src='/landing/landing-header-background.svg'
            alt="Background"
            width="0"
            height="0"
            sizes="100vw"
            priority
            loading="eager"
        />

        <Image
            className={'col-12 ' + styles.headerShadow}
            src='/landing/landing-header-shadow.svg'
            alt="Background"
            width="0"
            height="0"
            sizes="100vw"
            priority
            loading="eager"
        />


        <LandingHeader logedIn={logedIn} />
        <Image
            className={styles.topLeftBackground}
            src="/landing/top-left.svg"
            alt="Background"
            width={509}
            height={477}
            loading="eager"
            priority
        />
        <Image
            className={styles.topLeft2Background}
            src="/landing/top-left-2.svg"
            alt="Background"
            width={509}
            height={457}
            loading="eager"
            priority
        />
        <Image
            className={styles.topLeft3Background}
            src="/landing/top-left-3.svg"
            alt="Background"
            width={360}
            height={326}
            loading="eager"
            priority
        />
        <Image
            className={styles.topBackground}
            src="/landing/top.svg"
            alt="Background"
            width={1719}
            height={267}
            loading="eager"
            priority
        />
        {/* <Image
            className={styles.topCenterBackground}
            src="/landing/top-center.svg"
            alt="Background"
            width={576}
            height={491}
            loading="eager"
            priority
        /> */}
        {/* <Image
            className={styles.topCenter2Background}
            src="/landing/top-center.svg"
            alt="Background"
            width={576}
            height={491}
            loading="eager"
            priority
        /> */}
        <Image
            className={styles.topRightBackground}
            src="/landing/top-right.svg"
            alt="Background"
            width={427}
            height={357}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftCenterBackground}
            src="/landing/left-center.svg"
            alt="Background"
            width={328}
            height={377}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftCenter2Background}
            src="/landing/left-center-2.svg"
            alt="Background"
            width={377}
            height={377}
            loading="eager"
            priority
        />
        <Image
            className={styles.leftBottomBackground}
            src="/landing/left-bottom.svg"
            alt="Background"
            width={377}
            height={350}
            loading="eager"
            priority
        />
        {children}
    </div>
};

export default LandingBackground;