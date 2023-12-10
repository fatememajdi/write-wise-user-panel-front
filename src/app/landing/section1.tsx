/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import Typewriter from 'typewriter-effect';

//------------------------------------------------styles
import styles from './landingSection1.module.css';
import '../../styles/global.css';

//------------------------------------------------componnets
const LandingBackground = dynamic(() => import("@/components/backgrounds/landingBackground/landingBackground"));
import { StartLoader } from "@/components/Untitled";
import Script from "next/script";

const Section1: React.FC = () => {
    const router = useRouter();

    return <LandingBackground>
        <section className={'col-12 ' + styles.section1Container} id="hero-section">

            <div className={'col-lg-9 col-md-9 col-12 ' + styles.rightContainer}>
                <h1 className={styles.rightContainerTitle} >
                    <h1> Achieve IELTS Writing Excellence with</h1>
                    <span> AI-Driven &nbsp;</span>
                    <div className={styles.animationText}>
                        <Typewriter
                            options={{
                                strings: ['Rating', 'Analysis', 'Progress Tracking'],
                                autoStart: true,
                                loop: true,
                                cursorClassName: styles.cursorStyle
                            }}

                        />
                    </div>

                </h1>

                <h6 className={styles.rightContainerDescription}>
                    <span>
                        Unlock the full potential of your IELTS writing Skills with our state-of-the-art AI technology. Experience a comprehensive journey to success.
                    </span>
                    <button
                        onClick={() => {
                            StartLoader();
                            router.push('/signIn');
                        }}
                        className={styles.startButton}
                    >
                        Start Now
                    </button>

                </h6>

            </div>

            {/* <div className={'col-lg-5 col-md-5 col-12 ' + styles.leftContainer}>
                <Image
                    className={'selectBack ' + styles.leftContainerBackground}
                    src="/landing/section1-mobile-background.svg"
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
            </div> */}

        </section>
    </LandingBackground>
};

export default Section1;