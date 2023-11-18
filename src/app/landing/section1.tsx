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

            <div className={'col-lg-7 col-md-7 col-12 ' + styles.rightContainer}>
                <div className={styles.rightContainerTitle} >
                    <div> Achieve IELTS Writing Excellence with</div>
                    <span> AI-Driven </span>
                    Rating
                </div>


                <div className={styles.rightContainerDescription}>
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

                </div>

            </div>

            <div className={'col-lg-5 col-md-5 col-12 ' + styles.leftContainer}>
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
            </div>

        </section>
    </LandingBackground>
};

export default Section1;