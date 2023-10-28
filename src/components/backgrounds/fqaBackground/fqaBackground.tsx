import React from "react";
import Image from "next/image";

//-----------------------------------styles
import styles from './fqaBackground.module.css';
import '../../../styles/global.css';

//---------------------------------------------components
import LandingHeader from "@/components/landingHeader/landingHeader";

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

export { FqaQuestionsBackground };