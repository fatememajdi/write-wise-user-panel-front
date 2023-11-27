import React from "react";
import Image from "next/image";

//-----------------------------------------styles
import styles from './featuresBackground.module.css';
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

export { FeaturesBackground };