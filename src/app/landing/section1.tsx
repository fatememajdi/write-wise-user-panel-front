'use client';
import React from "react";
import { useRouter } from 'next/navigation';

//------------------------------------------------styles
import styles from './landingSection1.module.css';

//------------------------------------------------icons
import { VscCircleFilled } from 'react-icons/vsc';

//------------------------------------------------componnets
import LandingBackground from "@/components/backgrounds/landingBackground/landingBackground";
import { StartLoader } from "@/components/Untitled";

const Section1: React.FC = () => {
    const router = useRouter();

    return <LandingBackground>
        <section className={'col-12 ' + styles.section1Container} id="section-1">

            <div className={'col-lg-5 col-md-5 col-12 ' + styles.leftContainer}>
                <div className={styles.leftContainerCircle}></div>
            </div>

            <div className={'col-lg-7 col-md-7 col-12 ' + styles.rightContainer}>
                <div className={styles.rightContainerTitle}>
                    Boost Your IELTS Writing<br /> Score with AI
                </div>
                <div className={styles.rightContainerDescription}>
                    Unlock the power of WriteWiseAI<br />
                    Your Personal IELTS Writing Tuto

                    <div
                        style={{ marginTop: 14 }}
                        className={styles.rightContainerDescriptionItem}>
                        <VscCircleFilled className={styles.rightContainerDescriptionItemIcon} />
                        {'Get your essays rated for'}<span>&nbsp;Free!</span>
                    </div>
                    <div className={styles.rightContainerDescriptionItem}>
                        <div> <VscCircleFilled className={styles.rightContainerDescriptionItemIcon} /></div>
                        {'Recieve personalized analysis and feedback for just $1 per essay'}
                    </div>

                </div>

                <button
                    aria-label="write like a pro button"
                    onClick={() => {
                        router.push('/signIn');
                        StartLoader();
                    }}
                    className={styles.rightContainerButton}>
                    I Want to Write Like a Pro!
                </button>

            </div>

        </section>
    </LandingBackground>
};

export default Section1;