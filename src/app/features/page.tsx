/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { lazy } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Image from "next/image";

//------------------------------------------------components
const LandingHeader = React.lazy(() => import("@/components/landingHeader/landingHeader"));
const Footer = lazy(() => import("@/components/footer/footer"));
import { StopLoader } from "@/components/Untitled";

//------------------------------------------------data
import featuresItems from '../../../public/data/Features.json';

const Features: React.FC = () => {
    const [logedIn, changeLogedIn] = React.useState<boolean>(false);
    const [selectedItem, changeSelectedItem] = React.useState<number>(-1);
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    React.useEffect(() => {
        const item = localStorage.getItem('user');
        if (item)
            changeLogedIn(true);
        else
            changeLogedIn(false);
        StopLoader();

        setTimeout(() => {
            changeSelectedItem(0);
        }, 1500);

    }, []);

    return <div className='col-12 min-h-[100vh] flex flex-col' >
        <LandingHeader logedIn={logedIn} shadow />
        <div className='col-12 flex flex-1 flex-row items-center pt-[194px] pb-[74px] justify-between sm:pt-[80px] sm:pr-[25px] sm:pb-[100px] sm:pl-[31px] '>
            <AnimatePresence>
                <div className='flex flex-col pl-[148px] w-[60%] sm:max-w-full sm:p-0 '>
                    {
                        featuresItems.map((item, index) =>
                            <div key={index}>
                                <motion.div onClick={() => changeSelectedItem(index)}
                                    animate={selectedItem === index ?
                                        { color: '#2E4057', opacity: 1, marginLeft: isMobile ? 0 : 71, fontSize: isMobile ? 16 : 48, fontWeight: 800 }
                                        : { color: '#252525', opacity: 0.5, marginLeft: 0, fontSize: isMobile ? 16 : 32, fontWeight: 600 }}
                                    transition={{ type: "spring", duration: 1 }}
                                    className={' flex flex-col items-center mb-[56px] cursor-pointer leading-[133%] w-fit pb-[8px] hover:opacity-100 sm:mt-[8px] ' + (selectedItem === index ? ' text-[48px] sm:text-[16px] sm:font-semibold sm:leading-[133%] ' : 'text-[32px] sm:text-[16px] ')}>
                                    <div className="flex flex-row w-full items-center ">
                                        <Image
                                            className={'mr-[16px] ' + (selectedItem === index ? 'h-[70px] w-[70px] sm:h-[27px] sm:w-[27px] ' : 'h-[38px] w-[38px] sm:h-[27px] sm:w-[27px] ')}
                                            src={"/features/" + item.icon}
                                            alt="Logo"
                                            width="0"
                                            height="0"
                                            sizes="100vw"
                                            loading="eager"
                                            priority
                                        />
                                        {item.title}
                                    </div>
                                    {selectedItem === index &&
                                        <div className="w-[70%] mr-auto h-[1px] border-b-[1px] mt-[8px] border-b-seccondaryColor " />
                                    }
                                </motion.div>

                                {
                                    isMobile &&
                                    <motion.div
                                        animate={{ height: selectedItem === index ? 'fit-content' : 0, opacity: selectedItem === index ? 1 : 0 }}
                                        transition={{ type: "spring", duration: 1 }}
                                        className='lg:hidden h-0 overflow-hidden mt-[25px] sm:flex '>
                                        <h6>{item.description}</h6>
                                    </motion.div>
                                }
                            </div>
                        )
                    }

                </div>
                {
                    !isMobile &&
                    <h6 key={selectedItem} className='text-blackText leading-[36px] pr-[196px] w-[40%] sm:hidden '>
                        {selectedItem !== -1 && featuresItems[selectedItem].description}
                        <button className="bg-red text-whiteText text-[24px] font-bold w-[165px] h-[70px] mt-[63px]  ">
                            Sign Up
                        </button>
                    </h6>
                }
            </AnimatePresence>
        </div>
        <Footer />
    </div>
};

export default Features;
