import React from "react";
import Image from "next/image";

//-----------------------------------styles
import styles from './fqaBackground.module.css';
import '../../../styles/global.css';

//---------------------------------------------components
import LandingHeader from "@/components/landingHeader/landingHeader";


const FqaBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className={'col-12 ' + styles.fqadBackground}>
    <Image
        className={styles.rightTopBackground + ' selectBack ' + styles.mobile}
        src="/fqa/right-top.svg"
        alt="background"
        width={259}
        height={256}
        loading="eager"
        priority
    />
    <Image
        className={styles.rightTopBackground + ' selectBack ' + styles.mobile}
        src="/fqa/right-top.svg"
        alt="background"
        width={259}
        height={256}
        loading="eager"
        priority
    />
    <Image
        className={styles.leftTopBackground + ' selectBack ' + styles.mobile}
        src="/fqa/left-top.svg"
        alt="background"
        width={301.14}
        height={237}
        loading="eager"
        priority
    />
    <Image
        className={styles.leftCenterBackground + ' selectBack ' + styles.mobile}
        src="/fqa/left-center.svg"
        alt="background"
        width={377}
        height={377}
        loading="eager"
        priority
    />

    {children}

</div>;

const FqaQuestionsBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [logedIn, changeLogedIn] = React.useState<boolean>(false);

    React.useEffect(() => {
        const item = localStorage.getItem('user');
        if (item)
            changeLogedIn(true);
        else
            changeLogedIn(false);
    }, []);

    return <div className={'col-12 ' + styles.fqadBackground}>

        <LandingHeader logedIn={logedIn} shadow />
        <Image
            className={'selectBack ' + styles.rightTop2Background}
            src="/fqa/right-top-2.svg"
            alt="background"
            width={427.75}
            height={357}
            priority
        />
        <Image
            className={'selectBack ' + styles.rightTop2Background}
            src="/fqa/right-top-2.svg"
            alt="background"
            width={427.75}
            height={357}
            priority
        />
        <Image
            className={'selectBack ' + styles.rightCenterBackground}
            src="/fqa/right-center.svg"
            alt="background"
            width={427.75}
            height={357}
            priority
        />
        <Image
            className={'selectBack ' + styles.leftTop2Background}
            src="/fqa/left-top-2.svg"
            alt="background"
            width={377}
            height={237}
            priority
        />
        <Image
            className={'selectBack ' + styles.leftCenter2Background}
            src="/fqa/left-center-2.svg"
            alt="background"
            width={427.75}
            height={357}
            priority
        />

        {children}

    </div>
};

export { FqaBackground, FqaQuestionsBackground };