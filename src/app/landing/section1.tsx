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

const Section1: React.FC = () => {
    const router = useRouter();

    return <LandingBackground>
        <section className={'col-12 flex flex-row not-italic px-0 pt-[299px] pb-[259px] sm:flex-col-reverse justify-center items-center ' + styles.section1Container} id="hero-section">

            <div className={'col-lg-9 col-md-9 col-12 flex flex-column items-start justify-center pl-[175px] mr-auto my-0 h-full sm:h-fit ' + styles.content}>
                <h1 className='flex flex-wrap text-[#172E4A] '>
                    <p> Achieve IELTS Writing Excellence with</p>
                    <span className="whitespace-nowrap "> AI-Driven &nbsp;</span>
                    <div className={'text-[#172E4A] '+styles.animationText}>
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

                <h6 className={'mt-[48px] text-[#252525] capitalize leading-[31.2px] '+styles.description}>
                    <span>
                        Unlock the full potential of your IELTS writing Skills with our state-of-the-art AI technology. Experience a comprehensive journey to success.
                    </span>
                    <button
                        onClick={() => {
                            StartLoader();
                            router.push('/signIn');
                        }}
                        className={'text-[#FFF] not-italic bg-[#AB141D] py-[16px] px-[28px] mt-[80px] text-[24px] font-semibold leading-[40px] rounded-[8px] border border-[#AB141D] border-solid shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] sm:font-bold '+styles.startButton}
                    >
                        Start Now
                    </button>

                </h6>

            </div>
        </section>
    </LandingBackground>
};

export default Section1;