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

const Section3: React.FC = () => {
    const router = useRouter();
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    return (
        <section className='col-12 overflow-hidden relative py-[250px] pr-[156px] pl-[229px] bg-background sm:px-[48px] sm:pt-[48px] sm:pb-[66px]' id='features'>
            <div className='col-12 flex flex-row items-center justify-center h-full sm:flex-col' >

                <div className='col-lg-7 col-md-6 col-12 flex flex-col h-fit pr-[60px] sm:p-0' >
                    <h2 className='text-seccondaryColor leading-[68.4px] sm:leading-[19px] sm:text-[16px] sm:font-extrabold'>
                        Unlock IELTS Writing Mastery with <span className=" font-black">WriteWiseAI's</span> Pioneering Features
                    </h2>
                    <h6 className='text-blackText leading-[36px] mt-[40px] sm:mt-[8px]'>
                        Experience a seamless fusion of advanced technology and intuitive design, tailored to elevate every aspect of your IELTS preparation journey, and ensure top-tier IELTS writing results.
                    </h6>

                    <button
                        aria-label="read more button"
                        onClick={() => {
                            router.push('/features');
                            StartLoader();
                        }}
                        className='flex text-red font-black leading-[40px] text-[24px] p-0 mt-[54px] w-fit sm:hidden'>
                        Read More  <IoIosArrowForward style={{ marginTop: 5 }} />
                    </button>

                </div>

                <div className='col-lg-5 col-md-6 col-12 flex flex-col h-fit justify-center pl-[100px] hover:shadow-none sm:p-0 sm:mt-[24px] sm:pl-0 ' >
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

export default Section3;

const FeaturesItemCard: React.FC<{ title: string, icon: any}> = ({ title, icon }) =>
    <div className='w-[550px] flex flex-row mb-[65px] items-center sm:w-full sm:mb-[29px]'>
        <div className='min-w-[133px] w-fit flex flex-row justify-end pr-[20px] sm:min-w-[60px]'>
            {icon}
        </div>
        <h5 className='leading-[31.2px] text-seccondaryColor py-[15px] pr-[20px] pl-[13px] rounded-[8px] border-solid border-1 border-whiteText bg-features-card sm:text-[14.8px] sm:font-semibold sm:pr-10px sm:rounded-[3px]'>
            {title}
        </h5>
    </div>;