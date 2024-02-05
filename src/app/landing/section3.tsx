/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";

//-------------------------------------------styles
import '../../styles/global.css';

//-------------------------------------------components
import { StartLoader } from "@/components/Untitled";

//-------------------------------------------icons
import { IoIosArrowForward } from 'react-icons/io';

export default function Section3() {
    const router = useRouter();

    return (
        <section className=' bg-Features-pattern bg-cover bg-no-repeat col-12 overflow-hidden relative pt-[200px] mac:pt-[113px] pb-[330px] mac:pb-[210px] pr-[205px] pl-[205px] mac:px-[116px] bg-background sm:px-[48px] sm:pt-[48px] sm:pb-[66px]' id='features'>
            <div className='col-12 flex lg:flex-row items-center justify-center h-full sm:flex-col ' >

                <div className='w-[55%] flex flex-col h-fit pr-[112px] mac:pr-[64px] sm:p-0' >
                    <h2 className='text-seccondaryColor leading-[60px] mac:leading-[47px] sm:leading-[23px] sm:text-[16px] sm:font-extrabold'>
                        Unlock IELTS Writing Mastery with WriteWiseAI's Pioneering Features
                    </h2>
                    <h6 className='text-blackText leading-[36px] mac:leading-[28.5px] mr-[100px] mac:mr-[90px] sm:leading-[20px] mt-[49px] mac:mt-[28px] sm:mt-[8px]'>
                        Experience a seamless fusion of advanced technology and intuitive design, tailored to elevate every aspect of your IELTS preparation journey, and ensure top-tier IELTS writing results.
                    </h6>

                    <button
                        aria-label="read more button"
                        onClick={() => {
                            if (typeof document != 'undefined')
                                if (window.location.hash)
                                    window.location.hash = '';

                            router.replace('/features');
                            StartLoader();
                        }
                        }
                        className='flex text-red font-black leading-[36px] mac:leading-[22px] text-[24px] mac:text-[19px] p-0 mt-[62px] mac:mt-[38px] w-fit sm:hidden hover:shadow-none '>
                        Read More  <IoIosArrowForward style={{ marginTop: 5 }} />
                    </button>

                </div>

                <div className='w-[45%] flex flex-col h-fit justify-center hover:shadow-none sm:p-0 sm:mt-[24px] sm:pl-0 ' >
                    <FeaturesItemCard icon='grammar.svg' title="AI-Powered Grammar Analysis" />
                    <FeaturesItemCard icon='book.svg' title="AI-Powered Vocabulary Analysis " />
                    <FeaturesItemCard icon='star.svg' title="AI-Powered Essay Rating" />
                    <FeaturesItemCard icon='user.svg' title="Personalized Feedback and Recommendations" />
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
    <div className='w-[677px] mac:w-[534px] flex flex-row mb-[65px] mac:mb-[40px] items-center sm:w-full sm:mb-[29px]'>
        <div className='w-fit flex flex-row justify-end pr-[36px] mac:pr-[26px]'>
            <Image
                className=" h-[53px] w-[53px] mac:h-[40px] mac:w-[40px] "
                src={'/landing/' + icon}
                alt={icon}
                width="0"
                height="0"
                sizes="100vw"
                loading="eager"
                priority
            />
        </div>
        <div className='lg:leading-[36px] mac:leading-[28px] flex-1 lg:min-h-[80px] mac:min-h-[63px] flex items-center sm:leading-[19.2px] text-[32px] mac:text-[25px] font-semibold text-seccondaryColor py-[14px] pr-[20px] pl-[22px] mac:pl-[17px] rounded-[8px] border-solid border-1 border-whiteText bg-features-card sm:text-[14.8px] sm:font-semibold sm:pr-10px sm:rounded-[3px]'>
            {title}
        </div>
    </div>;