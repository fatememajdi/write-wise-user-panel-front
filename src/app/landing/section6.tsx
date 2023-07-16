/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useRouter } from 'next/navigation';

//-------------------------------------------styles
import styles from './landingSection6.module.css';

//-------------------------------------------components
import Section6Background from "@/components/backgrounds/section6Background/section6Background";

const Section6: React.FC = () => {
    const router = useRouter();

    return <Section6Background>
        <div className={styles.section6Card}>

            <div className={styles.cardTitle}>
                Join WriteWiseAI now!
            </div>

            <div className={styles.cardDescription}>
                Don't let IELTS writing hold you back from achieving your dreams. Join WriteWiseAI now and <br />
                unlock a world of opportunity with our innovative, AI-powered platform. Elevate your writing skills,<br />
                gain personalized insights, and conquer your IELTS test with confidence. Start your journey to IELTS <br />
                success today and take a step closer to a brighter future.
            </div>
            <button
                aria-label="sign up button"
                onClick={() => router.push('/signIn')}
                className={styles.section6Button}>Signup now!</button>

        </div>
    </Section6Background>
};

export default Section6;