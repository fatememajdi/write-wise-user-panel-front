/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

//------------------------------------------------styles
import styles from './landingSection1.module.css';
import '../../styles/global.css';

//------------------------------------------------icons
import { VscCircleFilled } from 'react-icons/vsc';

//------------------------------------------------componnets
import LandingBackground from "@/components/backgrounds/landingBackground/landingBackground";
import { StartLoader } from "@/components/Untitled";

const Section1: React.FC = () => {
    const router = useRouter();

    return <LandingBackground>
        <section className={'col-12 ' + styles.section1Container} id="home">

            <div className={'col-lg-6 col-md-6 col-12 ' + styles.rightContainer}>
                <div className={styles.rightContainerTitle}>
                    Boost Your IELTS Writing <br />with AI-Powered Precision
                </div>
                <div className={styles.rightContainerDescription}>
                    <span>Discover <span className={styles.boldLetter}>W</span>rite<span className={styles.boldLetter}>W</span>ise<span className={styles.boldLetter}>AI</span>'s Technology:
                    </span> Delivering instant IELTS <br />scoring with results mirroring an inter-rater difference of <br />0.5 with Humans

                    <div
                        style={{ marginTop: 14 }}
                        className={styles.rightContainerDescriptionItem}>
                        <VscCircleFilled className={styles.rightContainerDescriptionItemIcon} />
                        Claim your AI-powered IELTS writing analysis
                    </div>
                    <div className={styles.rightContainerDescriptionItem}>
                        <div> <VscCircleFilled className={styles.rightContainerDescriptionItemIcon} /></div>
                        Benefit from personalised IELTS feedback tailored to elevate your skills.
                    </div>

                </div>

            </div>

            <div className={'col-lg-6 col-md-6 col-12 ' + styles.leftContainer}>
                <Image
                    className={'selectBack ' + styles.leftContainerBackground}
                    src="/landing/section1-background.svg"
                    alt="section background"
                    width="0"
                    height="0"
                    sizes="100vw"
                    loading="eager"
                    priority
                />
                <div className={styles.leftImageCard}>
                    <Image
                        className={'selectBack ' + styles.robot}
                        src="/landing/robot.svg"
                        alt="robot"
                        width="0"
                        height="0"
                        sizes="100vw"
                        loading="eager"
                        priority
                    />
                    <Image
                        className={'selectBack ' + styles.human}
                        src="/landing/human.svg"
                        alt="human"
                        width="0"
                        height="0"
                        sizes="100vw"
                        loading="eager"
                        priority
                    />
                    <div className={styles.leftLogo}>WriteWiseAI</div>
                </div>
            </div>

        </section>
    </LandingBackground>
};

export default Section1;