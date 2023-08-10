import React from "react";
import Image from "next/image";

//-----------------------------------styles
import styles from './fqaBackground.module.css';

const FqaBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className={'col-12 ' + styles.fqadBackground}>
    <Image
        className={styles.rightTopBackground + ' ' + styles.mobile}
        src="/fqa/right-top.svg"
        alt="background"
        width={259}
        height={256}
        loading="eager"
        priority
    />
    <Image
        className={styles.rightTopBackground + ' ' + styles.mobile}
        src="/fqa/right-top.svg"
        alt="background"
        width={259}
        height={256}
        loading="eager"
        priority
    />
    <Image
        className={styles.leftTopBackground + ' ' + styles.mobile}
        src="/fqa/left-top.svg"
        alt="background"
        width={301.14}
        height={237}
        loading="eager"
        priority
    />
    <Image
        className={styles.leftCenterBackground + ' ' + styles.mobile}
        src="/fqa/left-center.svg"
        alt="background"
        width={377}
        height={377}
        loading="eager"
        priority
    />

    {children}

</div>;

const FqaQuestionsBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => <div className={'col-12 ' + styles.fqadBackground}>

    <Image
        className={styles.rightTop2Background}
        src="/fqa/right-top-2.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />
    <Image
        className={styles.rightTop2Background}
        src="/fqa/right-top-2.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />
    <Image
        className={styles.rightCenterBackground}
        src="/fqa/right-center.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />
    <Image
        className={styles.leftTop2Background}
        src="/fqa/left-top-2.svg"
        alt="background"
        width={377}
        height={237}
        priority
    />
    <Image
        className={styles.leftCenter2Background}
        src="/fqa/left-center-2.svg"
        alt="background"
        width={427.75}
        height={357}
        priority
    />

    {children}

</div>;

export { FqaBackground, FqaQuestionsBackground };