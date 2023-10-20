/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { Divider } from 'antd';
import { useRouter } from 'next/navigation';

//---------------------------------------------------styles
import styles from './landingSection6.module.css';

//---------------------------------------------------icons
import { VscCircleFilled } from 'react-icons/vsc';

//---------------------------------------------------components
import { StartLoader } from "@/components/Untitled";

const Section6: React.FC = () => {
    const router = useRouter();

    return <section className={styles.section6} id="pricing">
        <div className={styles.title}>No Monthly Commitments, Pure Flexibility</div>
        <div className={styles.description}>
            At WriteWiseAI, we have streamlined our pricing to ensure you get the<br />
            best value for your IELTS writing needs.
        </div>
    </section>
};

export default Section6;
