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

    return <div className='col-12 tablet-pro:bg-hero-tabletPro-pattern bg-hero-pattern mini-tablet:bg-hero-miniTablet-pattern mac:bg-hero-mac-pattern tablet:bg-hero-tablet-pattern bg-cover bg-no-repeat relative z-[501] overflow-hidden lg:min-h-[1080px] min-h-fit sm:bg-mobile-hero-pattern '>
        <header><LandingHeader logedIn={logedIn} landing /></header>
        <section className={'col-12 flex flex-row not-italic px-0 pt-[319px] tablet:pt-[215px] mini-tablet:pt-[623px] mac:pt-[282px] pb-[240px] mini-tablet:pb-[70px] tablet:pb-[193px] mac:pb-[220px] sm:flex-col-reverse justify-center items-center sm:pt-[100px] sm:pb-[50px] sm:min-h-fit ' + styles.section1Container} id="hero-section">

            <div className={'col-lg-9 col-12 flex flex-column items-start justify-center pl-[163px] mini-tablet:pl-[81px] mac:pl-[112px] tablet:pl-[85px] mr-auto h-full sm:h-fit sm:pr-[20px] sm:pl-[30px] sm:mt-[350px] ' + styles.content}>
                <h1 className='flex flex-col text-primaryColor'>
                    Achieve IELTS Writing <br /> Excellence with <br />
                    <div className="flex flex-wrap ">
                        <span className="whitespace-nowrap "> AI-Driven&nbsp;</span>
                        <span className={'text-primaryColor ' + styles.animationText}>
                            <Typewriter
                                options={{
                                    strings: ['Rating', 'Analysis', 'Progress Tracking'],
                                    autoStart: true,
                                    loop: true,
                                    cursorClassName: styles.cursorStyle
                                }}

                            />
                        </span>
                    </div>
                </h1>

                <h6 className='mt-[31px] mini-tablet:mt-[10px] mac:mt-[37px] tablet:mt-[29px] text-blackText capitalize leading-[36px] mini-tablet:leading-[22px] tablet:leading-[22px] mac:leading-[28.5px] sm:leading-[20px] sm:mt-[16px] max-w-[72%] mac:max-w-[65%] tablet:max-w-[65%] ' >
                    <span className="mac:text-[19px]">
                        Unlock the full potential of your IELTS writing Skills with our state-of-the-art AI technology. Experience a comprehensive journey to success.
                    </span>
                    <button
                        onClick={() => {
                            StartLoader();
                            router.push('/signIn');
                        }}
                        className={'text-whiteText not-italic bg-red py-[15px] mini-tablet:py-[12px] mini-tablet:px-[14px] px-[28px] tablet:py-[5px] tablet:px-[10px] mac:py-[9px] mac:px-[19px] tablet:mt-[24px] mt-[48px] mini-tablet:mt-[27px] mac:mt-[25px] text-[24px] mini-tablet:text-[15px] tablet:text-[15px] mac:text-[19px] font-bold leading-[40px] mini-tablet:leading-[31px] rounded-[8px] border border-red border-solid shadow-[0px 1px 2px 0px rgba(16, 24, 40, 0.05)] sm:font-bold sm:text-[13px] sm:leading-4 sm:mt-[32px] sm:p-0 sm:w-[92px] sm:h-[43px] ' + styles.startButton}
                    >
                        Start Now
                    </button>

                </h6>

            </div>
        </section>
    </div>
};