import React from "react";
import Image from "next/image";

//-----------------------------------------styles
import styles from './featuresBackground.module.css';
import LandingHeader from "@/components/landingHeader/landingHeader";
import '../../../styles/global.css';

const FeaturesBackground: React.FC<{ children: React.ReactNode }> = ({ children }) =>
    <section className={'col-12 ' + styles.featuresBackground} id='features'>
        <Image
            className={styles.rightTop3Background + ' selectBack ' + styles.mobile}
            src="/features/right-top.svg"
            alt="background"
            width={386}
            height={183}
            loading="eager"
            priority
        />
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
            className={'selectBack ' + styles.centerBackground}
            src="/features/center.svg"
            alt="background"
            width={427.75}
            height={357}
            priority
        />
        <Image
            className={'selectBack ' + styles.center2Background}
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