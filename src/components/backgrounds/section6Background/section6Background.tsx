import React from "react";
import Image from "next/image";

//-------------------------------------styles
import styles from './section6Background.module.css';

const Section6Background: React.FC<{ children: React.ReactNode }> = ({ children }) => <section className={'col-12 ' + styles.section6Background}>
    <Image
        className={styles.leftTopBackground}
        src="/section6/left-top.svg"
        alt="background"
        width={208}
        height={168}
        loading="eager" 
        priority
    />
    <Image
        className={styles.leftCenterBackground}
        src="/section6/left-center.svg"
        alt="background"
        width={224}
        height={241}
        loading="eager" 
        priority
    />
    <Image
        className={styles.leftCenterBackground}
        src="/section6/left-center.svg"
        alt="background"
        width={224}
        height={241}
        loading="eager" 
        priority
    />
    <Image
        className={styles.rightBottomBackground}
        src="/section6/right-bottom.svg"
        alt="background"
        width={427.75}
        height={357}
        loading="eager" 
        priority
    />
    <Image
        className={styles.rightBottomBackground}
        src="/section6/right-bottom.svg"
        alt="background"
        width={427.75}
        height={357}
        loading="eager" 
        priority
    />
    {children}
</section>;

export default Section6Background;