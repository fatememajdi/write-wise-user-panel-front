/* eslint-disable react/no-unescaped-entities */
import React from "react";

//-------------------------------------------styles
import styles from './landingSection6.module.css';

//-------------------------------------------components
import Section6Background from "@/components/section6Background/section6Background";

const Section6: React.FC = () => <Section6Background>
    <div className={styles.section6Card}>
        Don't let IELTS writing hold you back from achieving your dreams. Join WriteWiseAI now and <br />unlock a world of opportunity with our innovative,
        AI-powered platform. Elevate your writing<br /> skills,
        gain personalized insights, and conquer your IELTS test with confidence. Start your journey<br /> to IELTS success today and take a step closer to a brighter future.

        <button className={styles.section6Button}>Join WriteWiseAI now!</button>

    </div>
</Section6Background>;

export default Section6;