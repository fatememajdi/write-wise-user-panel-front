import React from "react";

//-------------------------------styles
import styles from './landingSection2.module.css';

//--------------------------------components
import Section2Background from "@/components/section2Background/section2Background";

const Section2: React.FC = () => <Section2Background>
    <div className={styles.title}>
        How it works
    </div>

    <div className={styles.secondTitle}>
        Achieve IELTS Writing Success in 4 Simple Steps!
    </div>

    <div className={styles.description}>
        Unlock your IELTS writing potential with WriteWiseAI,
        a user-friendly platform designed to enhance your<br /> essay writing skills. Follow our simple,
        four-step process to get accurate essay ratings, personalized <br />feedback,
        and valuable recommendations that will elevate your IELTS performance.
    </div>
</Section2Background>;

export default Section2;