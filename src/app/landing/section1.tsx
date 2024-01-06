/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import ReactLoading from 'react-loading';
import Typewriter from 'typewriter-effect';

//------------------------------------------------styles
import styles from './landingSection1.module.css';
import '../../styles/global.css';

//------------------------------------------------componnets
import { StartLoader } from "@/components/Untitled";
const Loading = dynamic(() => import("@/components/loading/loading"), { ssr: false });
const LandingHeader = dynamic(() => import("@/components/landingHeader/landingHeader"), { ssr: false, loading: () => <div className="text-center min-h-[80px] items-center justify-center flex "><ReactLoading type='bubbles' color={'#929391'} height={50} width={50} /></div> });

export default function Section1() {
    const router = useRouter();

    const [logedIn, changeLogedIn] = React.useState<boolean>(false);

    React.useEffect(() => {
        const item = localStorage.getItem('user');
        if (item)
            changeLogedIn(true);
        else
            changeLogedIn(false);
    }, []);

    return <div className='col-12 bg-hero-pattern bg-cover bg-no-repeat relative z-[501] overflow-hidden min-h-fit sm:bg-mobile-hero-pattern '>
        <header><LandingHeader logedIn={logedIn} landing /></header>
        <section className={'col-12 flex flex-row not-italic px-0 pt-[299px] pb-[259px] sm:flex-col-reverse justify-center items-center sm:pt-[100px] sm:pb-[50px] sm:min-h-fit ' + styles.section1Container} id="hero-section">

            <div className={'col-lg-9 col-md-9 col-12 flex flex-column items-start justify-center pl-[175px] mr-auto h-full sm:h-fit sm:pr-[20px] sm:pl-[30px] sm:mt-[350px] ' + styles.content}>
                <h1 className='flex flex-wrap text-primaryColor '>
                    <p> Achieve IELTS Writing Excellence with</p>
                    <span className="whitespace-nowrap "> AI-Driven &nbsp;</span>
                    <div className={'text-primaryColor ' + styles.animationText}>
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

                <h6 className={'mt-[48px] text-blackText capitalize leading-[31.2px] sm:mt-[16px] ' + styles.description}>
                    <span>
                        Unlock the full potential of your IELTS writing Skills with our state-of-the-art AI technology. Experience a comprehensive journey to success.
                    </span>
                    <button
                        onClick={() => {
                            StartLoader();
                            router.push('/signIn');
                        }}
                        className={'text-whiteText not-italic bg-red py-[16px] px-[28px] mt-[80px] text-[24px] font-semibold leading-[40px] rounded-[8px] border border-red border-solid shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] sm:font-bold sm:text-[13px] sm:leading-4 sm:mt-[32px] sm:p-0 sm:w-[92px] sm:h-[43px] ' + styles.startButton}
                    >
                        Start Now
                    </button>

                </h6>

            </div>
        </section>
    </div>
};