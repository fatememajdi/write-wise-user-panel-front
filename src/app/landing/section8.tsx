/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";

//-------------------------------------------styles
import styles from './landingSection8.module.css';
import '../../styles/global.css';

const Section8: React.FC = () => {

    return <section className={styles.section8Container} id="">
        <div className={styles.section8Card}>

            <h2 className={styles.cardTitle}>
                Join <span>W</span>rite<span>W</span>ise<span>AI</span> now!
            </h2>

            <h6 className={styles.cardDescription}>
                Don't let IELTS writing hold you back from achieving your dreams. Join WriteWiseAI now and
                unlock a world of opportunity with our innovative, AI-powered platform. Elevate your writing skills,
                gain personalized insights, and conquer your IELTS test with confidence. Start your journey to IELTS
                success today and take a step closer to a brighter future.
            </h6>
        </div>
    </section>
}

export default Section8;