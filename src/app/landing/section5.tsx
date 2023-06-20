'use client';
import React from "react";
import { useRouter } from 'next/navigation';

//------------------------------------------styles
import styles from './landingSection5.module.css';

//------------------------------------------components
import { FqaBackground } from "@/components/backgrounds/fqaBackground/fqaBackground";

const Section5: React.FC = () => {
    const router = useRouter();

    return (<FqaBackground>
        <div className={'col-12 ' + styles.fqaContainer}>
            <div className={styles.fqaItemText + ' ' + styles.fqaFirstItem}>
                How does the WriteWiseAI platform work?
            </div>
            <div className={styles.fqaItemText}>
                How does WriteWiseAI score and analyze essays?
            </div>
            <div className={styles.fqaItemText + ' ' + styles.fqaLastItem}>
                How long does it take to get feedback on my essay?
            </div>
            <button onClick={() => router.push('/fqa')} className={styles.fqaButton}>
                FQA page
            </button>
        </div>
    </FqaBackground>)
};

export default Section5;