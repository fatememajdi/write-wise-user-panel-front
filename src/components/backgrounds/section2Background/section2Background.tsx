import React from "react";
import Image from "next/image";

//-------------------------------------styles
import styles from './section2Background.module.css';
import '../../../styles/global.css';

const Section2Background: React.FC<{ children: React.ReactNode }> = ({ children }) => <section className={'col-12 ' + styles.section2Background}>
    <Image
        className={'selectBack ' + styles.rightBottomBackground}
        src="/section2/right-bottom.svg"
        alt="background"
        width={377}
        height={353}
        loading="eager"
        priority
    />
    <Image
        className={'selectBack ' + styles.leftTopBackground}
        src="/section2/left-top.svg"
        alt="background"
        width={377}
        height={459}
        loading="eager"
        priority
    />

    {children}
</section>;

export default Section2Background;