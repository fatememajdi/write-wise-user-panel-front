/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';

//-------------------------------------------styles
import '../../styles/global.css';

//-------------------------------------------components
import { StartLoader } from "@/components/Untitled";

//-------------------------------------------icons
import { Stars, Rise, User, UserMobile, StarsMobile, RiseMobile } from "../../../public/icons";
import { IoIosArrowForward } from 'react-icons/io';

export default function Section3() {
    const router = useRouter();
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    return (
        <section className='col-12 overflow-hidden relative pt-[196px] pb-[330px] pr-[205px] pl-[205px] bg-background sm:px-[48px] sm:pt-[48px] sm:pb-[66px]' id='features'>
            <div className='col-12 flex lg:flex-row items-center justify-center h-full sm:flex-col ' >

                <div className='col-lg-7 col-md-6 col-12 flex flex-col h-fit pr-[62px] sm:p-0' >
                    <h2 className='text-seccondaryColor leading-[60px] sm:leading-[23px] sm:text-[16px] sm:font-extrabold'>
                        Unlock IELTS Writing Mastery with <span className=" font-black">WriteWiseAI's</span> Pioneering Features
                    </h2>
                    <h6 className='text-blackText leading-[36px] sm:leading-[20px] mt-[49px] sm:mt-[8px]'>
                        Experience a seamless fusion of advanced technology and intuitive design, tailored to elevate every aspect of your IELTS preparation journey, and ensure top-tier IELTS writing results.
                    </h6>

                    <button
                        aria-label="read more button"
                        onClick={() => {
                            router.push('/features');
                            StartLoader();
                        }}
                        className='flex text-red font-black leading-[36px] text-[24px] p-0 mt-[62px] w-fit sm:hidden hover:shadow-none '>
                        Read More  <IoIosArrowForward style={{ marginTop: 5 }} />
                    </button>

                </div>

                <div className='col-lg-5 col-md-6 col-12 flex flex-col h-fit justify-center pl-[20px] hover:shadow-none sm:p-0 sm:mt-[24px] sm:pl-0 ' >
                    <FeaturesItemCard icon={isMobile ? <StarsMobile /> : <Stars />} title="AI-Powered Essay Rating" />
                    <FeaturesItemCard icon={isMobile ? <UserMobile /> : <User />} title="Personalized Feedback and Recommendations" />
                    <FeaturesItemCard icon={isMobile ? <RiseMobile /> : <Rise />} title="In-Depth Progress Tracking" />
                </div>

                <button
                    aria-label="read more button"
                    onClick={() => {
                        router.push('/features');
                        StartLoader();
                    }}
                    className='hidden text-red font-black leading-[16px] text-[13px] items-center p-0 mt-[34px] hover:shadow-none sm:flex'>
                    Read More  <IoIosArrowForward style={{ marginTop: 5 }} />
                </button>
            </div>
        </section>
    )
};

const FeaturesItemCard: React.FC<{ title: string, icon: any }> = ({ title, icon }) =>
    <div className='w-[677px] flex flex-row mb-[65px] items-center sm:w-full sm:mb-[29px]'>
        <div className='min-w-[107px] w-fit flex flex-row justify-end pr-[20px] sm:min-w-[60px]'>
            {icon}
        </div>
        <div className='lg:leading-[36px] flex-1 lg:min-h-[80px] flex items-center sm:leading-[19.2px] text-[32px] font-semibold text-seccondaryColor py-[14px] pr-[20px] pl-[22px] rounded-[8px] border-solid border-1 border-whiteText bg-features-card sm:text-[14.8px] sm:font-semibold sm:pr-10px sm:rounded-[3px]'>
            {title}
        </div>
    </div>;