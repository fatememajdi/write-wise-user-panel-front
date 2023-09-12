'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

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

            <div className={'col-lg-6 col-md-6 col-12 ' + styles.leftContainer}>
                {/* <LeftImage /> */}
                {/* <div className={styles.leftContainerCircle}></div> */}
                <Image
                    // className={styles.rightTop3Background + ' ' + styles.mobile}
                    src="/landing/ai illustartion 1.svg"
                    alt="ai illustartion"
                    width={632}
                    height={486}
                    loading="eager"
                    priority
                />
            </div>

            <div className={'col-lg-6 col-md-6 col-12 ' + styles.rightContainer}>
                <div className={styles.rightContainerTitle}>
                    Boost Your IELTS Writing <br />with AI-Powered Precision
                </div>
                <div className={styles.rightContainerDescription}>
                    Discover WriteWiseAI's GPT-4 Technology: Delivering instant <br />
                    IELTS scoring with results mirroring the 0.5 band human <br />
                    inter-rater difference

                    <div
                        style={{ marginTop: 14 }}
                        className={styles.rightContainerDescriptionItem}>
                        <VscCircleFilled className={styles.rightContainerDescriptionItemIcon} />
                        Claim your FREE AI-powered IELTS writing analysis.
                    </div>
                    <div className={styles.rightContainerDescriptionItem}>
                        <div> <VscCircleFilled className={styles.rightContainerDescriptionItemIcon} /></div>
                        Benefit from personalized IELTS feedback tailored to elevate your skills.
                    </div>

                </div>

                <button
                    aria-label="write like a pro button"
                    onClick={() => {
                        router.push('/signIn');
                        StartLoader();
                    }}
                    className={styles.rightContainerButton}>
                    Unlock AI-Powered Excellence Now
                </button>

            </div>

        </section>
    </LandingBackground>
};

export default Section1;