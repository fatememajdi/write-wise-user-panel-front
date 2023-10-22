import React from "react";
import Image from "next/image";

//-------------------------------------------styles
import styles from './landingBackground.module.css';
import LandingHeader from "../../landingHeader/landingHeader";
import '../../../styles/global.css';

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
            className={"w-full h-auto selectBack " + styles.headerBackground}
            src='/landing/landing-header-background.svg'
            alt="Background"
            width="0"
            height="0"
            sizes="100vw"
            priority
            loading="eager"
        />

        <Image
            className={'col-12 selectBack ' + styles.headerShadow}
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
            className={'selectBack ' + styles.topLeftBackground}
            src="/landing/top-left.svg"
            alt="Background"
            width={509}
            height={477}
            loading="eager"
            priority
        />
        <Image
            className={'selectBack ' + styles.topLeft2Background}
            src="/landing/top-left-2.svg"
            alt="Background"
            width={509}
            height={457}
            loading="eager"
            priority
        />
        <Image
            className={'selectBack ' + styles.topLeft3Background}
            src="/landing/top-left-3.svg"
            alt="Background"
            width={360}
            height={326}
            loading="eager"
            priority
        />
        <Image
            className={'selectBack ' + styles.topBackground}
            src="/landing/top.svg"
            alt="Background"
            width={1719}
            height={267}
            loading="eager"
            priority
        />
        <Image
            className={'selectBack ' + styles.topRightBackground}
            src="/landing/top-right.svg"
            alt="Background"
            width={427}
            height={357}
            loading="eager"
            priority
        />
        <Image
            className={'selectBack ' + styles.leftCenterBackground}
            src="/landing/left-center.svg"
            alt="Background"
            width={328}
            height={377}
            loading="eager"
            priority
        />
        <Image
            className={'selectBack ' + styles.leftCenter2Background}
            src="/landing/left-center-2.svg"
            alt="Background"
            width={377}
            height={377}
            loading="eager"
            priority
        />
        <Image
            className={'selectBack ' + styles.leftBottomBackground}
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