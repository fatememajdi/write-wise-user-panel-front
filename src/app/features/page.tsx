/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { lazy } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Image from "next/image";
import dynamic from "next/dynamic";
import ReactLoading from "react-loading";

//------------------------------------------------components
const LandingHeader = dynamic(() => import("@/components/landingHeader/landingHeader"), { ssr: false, loading: () => <div className="text-center min-h-[80px] items-center justify-center flex "><ReactLoading type='bubbles' color={'#929391'} height={50} width={50} /></div> });
const Footer = lazy(() => import("@/components/footer/footer"));
import { StopLoader } from "@/components/Untitled";

//------------------------------------------------data
import featuresItems from '../../../public/data/Features.json';


const Features: React.FC = () => {
    const [logedIn, changeLogedIn] = React.useState<boolean>(false);
    const [selectedItem, changeSelectedItem] = React.useState<number>(-1);
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isMac = useMediaQuery({ query: "(max-width: 1680px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1281px)" });

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

    return <div className='bg-featuresPage-pattern bg-cover bg-no-repeat col-12 min-h-[100vh] flex flex-col' >
        <LandingHeader logedIn={logedIn} shadow />
        <div className='col-12 flex flex-1 flex-row items-center pt-[194px] mac:pt-[155px] tablet:pt-[159px] pb-[74px] tablet:pb-[40px] justify-between sm:pt-[80px] sm:pr-[25px] sm:pb-[100px] sm:pl-[31px] '>
            <AnimatePresence>
                <div className='flex flex-col pl-[148px] tablet:pl-[68px] w-[60%] sm:max-w-full sm:p-0 '>
                    {
                        featuresItems.map((item, index) =>
                            <div key={index}>
                                <motion.div onClick={() => changeSelectedItem(index)}
                                    animate={selectedItem === index ?
                                        { color: '#2E4057', opacity: 1, marginLeft: isMobile ? 0 : isTablet ? 44 : isMac ? 43 : 71, fontSize: isMobile ? 16 : isTablet ? 20 : isMac ? 37 : 48, fontWeight: isMac || isTablet ? 600 : 800 }
                                        : { color: '#252525', opacity: 0.5, marginLeft: 0, fontSize: isMobile ? 16 : isMac ? 25 : 32, fontWeight: 600 }}
                                    transition={{ type: "spring", duration: 1 }}
                                    className={' flex flex-col items-center mb-[56px] tablet:mb-[39px] mac:mb-[42px] pr-[10px] cursor-pointer leading-[133%] w-fit pb-[8px] hover:opacity-100 sm:mt-[8px] ' + (selectedItem === index ? ' tablet:text-[20px] text-[48px] mac:text-[37px] mac:font-semibold font-extrabold sm:text-[16px] sm:font-semibold tablet:font-semibold sm:leading-[133%] ' : ' tablet:text-[20px] text-[32px] font-semibold mac:text-[25px] sm:text-[16px] ')}>
                                    <div className="flex flex-row w-full items-center ">
                                        <Image
                                            className={'mr-[16px] mac:mr-[6px] tablet:mr-[11px] ' + (selectedItem === index ? 'h-[70px] w-[70px] mac:h-[55px] mac:w-[55px] tablet:h-[40px] tablet:w-[40px] sm:h-[27px] sm:w-[27px] ' : 'h-[38px] w-[38px] tablet:h-[30px] tablet:w-[30px]  mac:h-[35px] mac:w-[35px] sm:h-[27px] sm:w-[27px] ')}
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
                                        <h6 className="leading-[36px] ">{item.description}</h6>
                                    </motion.div>
                                }
                            </div>
                        )
                    }

                </div>
                {
                    !isMobile &&
                    <h6 key={selectedItem} className='text-blackText leading-[36px] tablet:leading-[22px]  mac:leading-[28px] pr-[196px] tablet:pr-[66px] mac:pr-[148px] w-[40%] sm:hidden '>
                        {selectedItem !== -1 && featuresItems[selectedItem].description}
                        <button className="bg-red text-whiteText text-[24px] tablet:text-[15px] tablet:leading-[31px] mac:text-[19px] font-bold w-[165px] tablet:w-[96px] h-[70px] tablet:h-[45px] mac:w-[124px] mac:h-[58px] mt-[63px] tablet:mt-[45px] mac:mt-[52px]  ">
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
