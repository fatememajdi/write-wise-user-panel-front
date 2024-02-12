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
        <section className=' bg-Features-pattern bg-cover bg-no-repeat col-12 overflow-hidden relative pt-[200px] mini-tablet:pt-[96px] tablet:pt-[104px] mac:pt-[113px] pb-[330px] tablet:pb-[176px] mini-tablet:pb-[199px] mac:pb-[210px] px-[205px] mini-tablet:pl-[72px] mini-tablet:pr-0 tablet:px-[91px] mac:px-[116px] bg-background sm:px-[48px] sm:pt-[48px] sm:pb-[66px]' id='features'>
            <div className='col-12 flex lg:flex-row mini-tablet:flex-col items-center justify-center h-full sm:flex-col ' >

                <div className='w-[55%] mini-tablet:w-full flex flex-col h-fit pr-[112px] mini-tablet:pr-0 tablet:pr-[50px] mac:pr-[64px] sm:p-0' >
                    <h2 className='text-seccondaryColor leading-[60px] mac:leading-[47px] mini-tablet:leading-[36px] tablet:leading-[36px] sm:leading-[23px] sm:text-[16px] sm:font-extrabold'>
                        Unlock IELTS Writing Mastery with WriteWiseAI's Pioneering Features
                    </h2>
                    <h6 className='text-blackText leading-[36px] mini-tablet:mr-[160px] mac:leading-[28.5px] mini-tablet:leading-[22px] tablet:leading-[22px] mr-[100px] tablet:mr-0 mac:mr-[90px] sm:leading-[20px] mt-[49px] mini-tablet:mt-[19px] tablet:mt-[23px] mac:mt-[28px] sm:mt-[8px]'>
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
                        className='flex text-red font-black leading-[36px] mini-tablet:mt-[24px] mini-tablet:text-[15px] mini-tablet:font-bold mini-tablet:leading-[22px] mac:leading-[22px] tablet:leading-[22px] text-[24px] tablet:text-[15px] mac:text-[19px] p-0 mt-[62px] tablet:mt-[30px] mac:mt-[38px] w-fit sm:hidden hover:shadow-none '>
                        Read More  <IoIosArrowForward style={{ marginTop: 5 }} />
                    </button>

                </div>

                <div className='w-[45%] mini-tablet:mt-[101px] mini-tablet:w-full flex flex-col h-fit justify-center hover:shadow-none sm:p-0 sm:mt-[24px] sm:pl-0 ' >
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
    <div className='w-[677px] mini-tablet:w-[512px] mini-tablet:mx-auto tablet:w-[417px] mac:w-[534px] flex flex-row mb-[65px] mini-tablet:mb-[32px] tablet:mb-[31px] mac:mb-[40px] items-center sm:w-full sm:mb-[29px]'>
        <div className='w-fit flex flex-row justify-end mini-tablet:pr-[22px] tablet:pr-[24px] pr-[36px] mac:pr-[26px]'>
            <Image
                className=" h-[53px] w-[53px] mac:h-[40px] mac:w-[40px] mini-tablet:w-[35px] mini-tablet:h-[35px] tablet:h-[32px] tablet:w-[32px] "
                src={'/landing/' + icon}
                alt={icon}
                width="0"
                height="0"
                sizes="100vw"
                loading="eager"
                priority
            />
        </div>
        <div className='lg:leading-[36px] tablet:leading-[22px] mac:leading-[28px] flex-1 lg:min-h-[80px] mac:min-h-[63px] flex items-center sm:leading-[19.2px] text-[32px] mini-tablet:text-[20px] mini-tablet:leading-[22px] tablet:text-[20px] mac:text-[25px] font-semibold text-seccondaryColor py-[14px] tablet:py-[11px] pr-[20px] pl-[22px] mini-tablet:pl-[13px] tablet:pl-[13px] mac:pl-[17px] rounded-[8px] border-solid border-1 border-whiteText bg-features-card sm:text-[14.8px] sm:font-semibold sm:pr-10px sm:rounded-[3px]'>
            {title}
        </div>
    </div>;