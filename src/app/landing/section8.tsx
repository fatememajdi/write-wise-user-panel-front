/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useRouter } from 'next/navigation';

//-------------------------------------------styles
import styles from './landingSection8.module.css';

//-------------------------------------------components
import { StartLoader } from "@/components/Untitled";

const Section8: React.FC = () => {
    const router = useRouter();

    return <div className={styles.section8Container}>
        <div className={styles.section6Card}>

            <div className={styles.cardTitle}>
                Join <span>W</span>rite<span>W</span>ise<span>AI</span> now!
            </div>

            <div className={styles.cardDescription}>
                Don't let IELTS writing hold you back from achieving your dreams. Join WriteWiseAI now and <br />
                unlock a world of opportunity with our innovative, AI-powered platform. Elevate your writing skills,<br />
                gain personalized insights, and conquer your IELTS test with confidence. Start your journey to IELTS <br />
                success today and take a step closer to a brighter future.
            </div>
            <button
                aria-label="sign up button"
                onClick={() => {
                    router.push('/signIn');
                    StartLoader();
                }}
                className={styles.section6Button}>Signup now!</button>

        </div>
    </div>
}

export default Section8;