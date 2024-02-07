/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import Image from "next/image";

//------------------------------------------------styles
import '../../styles/global.css';

//------------------------------------------------icons
import { MdKeyboardArrowRight, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Steps } from "../../../public";

const steps = [
    { title: 'Dynamic Visuals', description: 'Dive deep into your IELTS learning journey with interactive charts showing your evolving scores over time. Whether you are just starting out or refining advanced skills, these visuals offer a clear picture of your progress.' },
    { title: 'Unlimited Revisions', description: 'As part of your comprehensive IELTS preparation, refine and resubmit your essays. Each revision brings fresh scores and insights, allowing you to witness your growth and continuously improve English writing skills.' },
    { title: 'Diverse Feedback', description: 'Beyond scores, gain insights across varied IELTS tasks and topics. This holistic feedback is crucial for a well-rounded preparation for the IELTS writing exam' },
    { title: 'Motivation Booster', description: 'Visual feedback is a catalyst for motivation. With our progress recording service, celebrate each leap in your IELTS learning journey, setting and achieving higher milestones.' },
];

export default function Section4() {

    const [selectedItem, changeSelectedItem] = React.useState<number>(0);
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isMac = useMediaQuery({ query: "(max-width: 1680px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1281px)" });

    function selectStep(id: number) {
        if (id === selectedItem)
            changeSelectedItem(0);
        else
            changeSelectedItem(id);
    };

    function DesktopSelectStep(id: number) {
        if (id !== selectedItem) {
            changeSelectedItem(id);
        };
    };

    return <section
        onWheel={() => {
            if (selectedItem === 0 && !isMobile)
                changeSelectedItem(1);
        }}
        className='bg-section4-gradiant overflow-hidden flex pt-[80px] mac:pt-[84px] tablet:pt-[98px] flex-col h-fit sm:pt-[55px] pb-[30px] mac:pb-0 sm:min-h-fit sm:pl-[50px]'>
        <h2 className='text-whiteText leading-[60px] mac:leading-[22px] tablet:leading-[22px] ml-[162px] tablet:ml-[92px] mac:ml-[138px] sm:ml-0 sm:leading-[26px]'><span className="mac:text-[25px]">Progressive IELTS Learning with WriteWiseAI</span></h2>
        <Image
            className=" mt-[32px] mac:mt-[25px] ml-[162px] mac:ml-[138px] tablet:ml-[91px] tablet:mt-[19px] sm:hidden "
            src="/landing/line.svg"
            alt="line"
            width={isTablet ? 693 : 1040}
            height={0.5}
            priority
            loading="eager"
        />
        <h6 className='text-whiteText leading-[36px] mac:leading-[28px] tablet:leading-[22px] tablet:ml-[92px] tablet:mt-[19px] ml-[162px] mac:ml-[138px] sm:ml-0 sm:mt-0 mt-[32px] mac:mt-[25px] mb-[90px] max-w-[550px] tablet:max-w-[470px] mac:max-w-[463px] sm:text-[13px] sm:leading-[19.5px] sm:mb-0 sm:max-w-full sm:mr-[50px] '>
            <span className="tablet:text-[17px] "> Empower your IELTS preparation by tracking and visualizing your writing improvements.</span>
        </h6>

        {/* <button className={styles.button}>
            Boost My IELTS Preparation Now!
        </button> */}

        {/* //-----------------------------------------------------------------------------mobile mode steps */}
        <AnimatePresence>
            <div className='col-12 hidden sm:flex flex-col mt-[16px]' >
                {
                    steps.map((item, index) => <div key={index} className='flex flex-col w-full items-start h-fit max-w-[242px]'>
                        <motion.div
                            animate={{ opacity: selectedItem !== (index + 1) && selectedItem !== 0 ? 0.5 : 1 }}
                            transition={{ type: "spring", duration: 2 }}
                            onClick={() => selectStep(index + 1)}
                            className='flex flex-row text-whiteText text-[16px] font-normal leading-[38.5px] items-center'>
                            {
                                selectedItem === (index + 1) ?
                                    <MdOutlineKeyboardArrowDown fontSize={20} />
                                    :
                                    <MdKeyboardArrowRight fontSize={20} />
                            }
                            {' 0' + (index + 1) + ' ' + item.title}
                        </motion.div>
                        <motion.div
                            animate={{ height: selectedItem === (index + 1) ? 'fit-content' : 0 }}
                            transition={{ type: "spring", duration: 2 }}
                            className='text-whiteText text-[13px] font-normal leading-[16.9px] overflow-hidden'
                        >
                            {selectedItem === (index + 1) &&
                                item.description
                            }
                        </motion.div>
                    </div>)
                }
            </div>
        </AnimatePresence>

        <motion.div
            animate={{ opacity: selectedItem !== 0 ? 0.5 : 1 }}
            transition={{ type: "spring", duration: 2 }}
            className='relative h-fit w-fit mt-[100px] right-[-55px] hidden sm:block'>
            <Image
                className='absolute top-[-70px] right-[15px] '
                src="/icons/flag.svg"
                alt="flag icon"
                width={35}
                height={64}
                loading="eager"
                priority
            />
            <Steps />
        </motion.div>

        {/* //-----------------------------------------------------------------------------desktop mode steps */}

        <AnimatePresence>
            <div className='flex flex-row mt-[38px] mac:mt-[70px] h-fit w-full flex-1 items-end sm:hidden'>
                <div
                    style={{ opacity: selectedItem === 1 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative flex-1 min-h-[22vh] border-t-[1px] border-t-whiteText '></div>
                <motion.div
                    animate={{ height: selectedItem === 1 ? '36vh' : '22vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 1 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative min-h-[22vh] mac:w-[225px] tablet:w-[170px] w-[300px] '>
                    <motion.div
                        animate={{ height: selectedItem === 1 ? '14vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto mac:w-[225px] mac:max-w-[225px] tablet:w-[170px] tablet:max-w-[200px] w-[300px] max-w-[300px] font-normal text-[20px] tablet:text-[15px] tablet:leading-[20px] leading-[36px] mac:text-[17px] mac:leading-[26px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
                        <motion.div animate={{ height: selectedItem === 1 ? '7vh' : 0 }}
                            transition={{ type: "spring", duration: 1.5 }}
                            className='absolute top-0 right-0 z-0 border-r-[1px] border-r-whiteText' />
                        <motion.div
                            animate={{ opacity: selectedItem === 1 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            Dive deep into your IELTS learning journey with interactive charts showing your evolving scores over time. Whether you're just starting out or refining advanced skills, these visuals offer a clear picture of your progress.
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(1)}
                        className='text-whiteText text-[32px] tablet:text-[18px] tablet:leading-[22px] font-normal leading-[38.5px] absolute mac:text-[25px] mac:font-semibold mac:leading-[30px] top-[-60px] mac:top-[-50px] tablet:top-[-37px] right-[13px] cursor-pointer whitespace-nowrap '><span className="text-[rgba(243, 243, 243, 0.50)]">01</span> Dynamic Visuals</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 2 ? '39vh' : '29vh', width: selectedItem === 1 || selectedItem === 2 ? isTablet ? 200 : isMac ? 280 : 340 : isTablet ? 170 : isMac ? 225 : 300 }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 2 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative mac:w-[225px] w-[300px] tablet:w-[170px] min-h-[29vh]'>
                    <motion.div animate={{ height: selectedItem === 2 ? '3vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='absolute top-0 right-0 z-0 border-r-[1px] border-r-whiteText' />
                    <motion.div
                        animate={{ height: selectedItem === 2 ? '17vh' : selectedItem === 1 ? 0 : '7vh', width: selectedItem === 1 || selectedItem === 2 ? isTablet ? 200 : isMac ? 280 : 340 : isTablet ? 170 : isMac ? 225 : 300 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto mac:w-[225px] tablet:w-[170px] w-[300px] mac:max-w-[280px] tablet:max-w-[200px] max-w-[340px] font-normal text-[20px] tablet:text-[15px] tablet:leading-[20px] leading-[36px] mac:text-[17px] mac:leading-[26px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
                        <motion.div
                            animate={{ opacity: selectedItem === 2 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            As part of your comprehensive IELTS preparation, refine and resubmit your essays. Each revision brings fresh scores and insights, allowing you to witness your growth and continuously improve English writing skills.
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(2)}
                        className='text-whiteText text-[32px] tablet:text-[18px] tablet:leading-[22px] font-normal leading-[38.5px] absolute top-[-60px] mac:top-[-50px] tablet:top-[-37px] right-[13px] mac:text-[25px] mac:font-semibold mac:leading-[30px] cursor-pointer whitespace-nowrap '><span className="text-[rgba(243, 243, 243, 0.50)]">02</span> Unlimited Revisions</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 3 ? '50vh' : '36vh', width: selectedItem === 3 || selectedItem === 2 ? isTablet ? 200 : isMac ? 280 : 340 : isTablet ? 170 : isMac ? 225 : 300 }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 3 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative mac:w-[225px] tablet:w-[170px] w-[300px] min-h-[36vh]'>
                    <motion.div
                        animate={{ height: selectedItem === 3 ? '21vh' : selectedItem === 2 ? 0 : '7vh', width: selectedItem === 2 || selectedItem === 3 ? isTablet ? 200 : isMac ? 280 : 340 : isTablet ? 170 : isMac ? 225 : 300 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto mac:w-[225px] w-[300px] tablet:w-[170px] tablet:max-w-[200px] mac:max-w-[280px] max-w-[340px] font-normal text-[20px] tablet:text-[15px] tablet:leading-[20px] leading-[36px] mac:text-[17px] mac:leading-[26px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
                        <motion.div animate={{ height: selectedItem === 3 ? '7vh' : 0 }}
                            transition={{ type: "spring", duration: 1.5 }}
                            className='absolute top-0 right-0 z-0 border-r-[1px] border-r-whiteText' />
                        <motion.div
                            animate={{ opacity: selectedItem === 3 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            Beyond scores, gain insights across varied IELTS tasks and topics. This holistic feedback is crucial for a well-rounded preparation for the IELTS writing exam
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(3)}
                        className='text-whiteText text-[32px] tablet:text-[18px] tablet:leading-[22px] font-normal leading-[38.5px] absolute top-[-60px] mac:top-[-50px]  tablet:top-[-37px] right-[13px] mac:text-[25px] mac:font-semibold mac:leading-[30px] cursor-pointer whitespace-nowrap '><span className="text-[rgba(243, 243, 243, 0.50)]">03</span> Diverse Feedback</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 4 ? '57vh' : '43vh', width: selectedItem === 3 || selectedItem === 4 ? isTablet ? 200 : isMac ? 280 : 340 : isTablet ? 170 : isMac ? 225 : 300 }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 4 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative mac:w-[225px] w-[300px] tablet:w-[170px] min-h-[43vh]'>
                    <motion.div animate={{ height: selectedItem === 4 ? '7vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='absolute top-0 right-0 z-0 border-r-[1px] border-r-whiteText' />
                    <motion.div
                        animate={{ height: selectedItem === 4 ? '21vh' : selectedItem === 3 ? 0 : '7vh', width: selectedItem === 3 || selectedItem === 4 ? isTablet ? 200 : isMac ? 280 : 340 : isTablet ? 170 : isMac ? 225 : 300 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto mac:w-[225px] w-[300px] tablet:w-[170px] tablet:max-w-[200px] mac:max-w-[280px] max-w-[340px] font-normal text-[20px] tablet:text-[15px] tablet:leading-[20px] leading-[36px] mac:text-[17px] mac:leading-[26px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
                        <motion.div
                            animate={{ opacity: selectedItem === 4 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            Visual feedback is a catalyst for motivation. With our progress recording service, celebrate each leap in your IELTS learning journey, setting and achieving higher milestones.
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(4)}
                        className='text-whiteText text-[32px] tablet:text-[18px] tablet:leading-[22px] font-medium leading-[38.5px] absolute top-[-60px] mac:top-[-50px] tablet:top-[-37px]  right-[13px] mac:text-[25px] mac:font-semibold mac:leading-[30px] cursor-pointer whitespace-nowrap '><span className="text-[rgba(243, 243, 243, 0.80)]">04</span> Motivation Booster</div>
                </motion.div>
                <motion.div
                    style={{ opacity: selectedItem === 4 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative flex-1 min-w-[400px] mac:min-w-[300px] tablet:min-w-[200px] h-[50vh]'>
                    <Image
                        className='absolute top-[-105px] tablet:top-[-65px] right-auto tablet:left-[70px] left-[130px] text-whiteText '
                        src="/icons/flag.svg"
                        alt="flag icon"
                        width={isTablet ? 33 : 52}
                        height={isTablet ? 67 : 113}
                        loading="eager"
                        priority
                    />
                    <motion.div
                        animate={{ height: selectedItem === 4 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto flex-1 min-w-[400px] font-normal text-[20px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
                    </motion.div>
                </motion.div>
            </div>
        </AnimatePresence>
    </section>
};