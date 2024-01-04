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
]

const Section4: React.FC = () => {

    const [selectedItem, changeSelectedItem] = React.useState<number>(0);
    // const [animating, changeAnimating] = React.useState<boolean>(false);
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    function selectStep(id: number) {
        if (id === selectedItem)
            changeSelectedItem(0);
        else
            changeSelectedItem(id);
    };

    function DesktopSelectStep(id: number) {
        if (id !== selectedItem) {
            changeSelectedItem(id);
            // if (animating) {
            //     setTimeout(() => {
            //         changeSelectedItem(id);
            //         changeAnimating(true);
            //     }, 1000);
            // } else {
            //     changeSelectedItem(id);
            //     changeAnimating(true);
            // }
        };
        // setTimeout(() => {
        //     changeAnimating(false);
        // }, 1500);
    };

    return <section
        onWheel={() => {
            if (selectedItem === 0 && !isMobile)
                changeSelectedItem(1);
        }}
        className='bg-section4-gradiant overflow-hidden flex pt-[150px] flex-col h-fit sm:pt-[55px] sm:min-h-fit sm:pl-[50px]'>
        <h2 className='text-whiteText leading-[61.5px] ml-[234px] sm:ml-0 sm:leading-[26px]'>Progressive IELTS Learning with WriteWiseAI</h2>
        <div className='hidden sm:ml-0 w-[259px] h-[0.5px] bg-divider-gradiant mt-[18px] mb-[20px] sm:block ' />
        <h6 className='text-whiteText leading-[31px] ml-[234px] sm:ml-0 sm:mt-0 mt-[48px] mb-[90px] max-w-[500px] sm:text-[13px] sm:leading-[19.5px] sm:mb-0 sm:max-w-full sm:mr-[50px] '>
            Empower your IELTS preparation by tracking and visualizing your writing improvements.
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
            <div className='flex flex-row h-fit w-full flex-1 pr-[110px] items-end sm:hidden'>
                <div
                    style={{ opacity: selectedItem === 1 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative flex-1 min-h-[22vh] border-t-[1px] border-t-whiteText '></div>
                <motion.div
                    animate={{ height: selectedItem === 1 ? '36vh' : '22vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 1 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative min-h-[22vh] w-[340px]'>
                    <motion.div
                        animate={{ height: selectedItem === 1 ? '14vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto w-[340px] max-w-[340px] font-normal text-[20px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
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
                        className='text-whiteText text-[32px] font-normal leading-[38.5px] absolute top-[-60px] right-[13px] cursor-pointer whitespace-nowrap '><span className="text-[rgba(243, 243, 243, 0.50)]">01</span> Dynamic Visuals</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 2 ? '39vh' : '29vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 2 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative w-[340px] min-h-[29vh]'>
                    <motion.div animate={{ height: selectedItem === 2 ? '3vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='absolute top-0 right-0 z-0 border-r-[1px] border-r-whiteText' />
                    <motion.div
                        animate={{ height: selectedItem === 2 ? '17vh' : selectedItem === 1 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto w-[340px] max-w-[340px] font-normal text-[20px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
                        <motion.div
                            animate={{ opacity: selectedItem === 2 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            As part of your comprehensive IELTS preparation, refine and resubmit your essays. Each revision brings fresh scores and insights, allowing you to witness your growth and continuously improve English writing skills.
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(2)}
                        className='text-whiteText text-[32px] font-normal leading-[38.5px] absolute top-[-60px] right-[13px] cursor-pointer whitespace-nowrap '><span className="text-[rgba(243, 243, 243, 0.50)]">02</span> Unlimited Revisions</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 3 ? '50vh' : '36vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 3 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative w-[340px] min-h-[36vh]'>
                    <motion.div
                        animate={{ height: selectedItem === 3 ? '21vh' : selectedItem === 2 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto w-[340px] max-w-[340px] font-normal text-[20px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
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
                        className='text-whiteText text-[32px] font-normal leading-[38.5px] absolute top-[-60px] right-[13px] cursor-pointer whitespace-nowrap '><span className="text-[rgba(243, 243, 243, 0.50)]">03</span> Diverse Feedback</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 4 ? '57vh' : '43vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 4 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative w-[340px] min-h-[43vh]'>
                    <motion.div animate={{ height: selectedItem === 4 ? '7vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='absolute top-0 right-0 z-0 border-r-[1px] border-r-whiteText' />
                    <motion.div
                        animate={{ height: selectedItem === 4 ? '21vh' : selectedItem === 3 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto w-[340px] max-w-[340px] font-normal text-[20px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
                        <motion.div
                            animate={{ opacity: selectedItem === 4 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            Visual feedback is a catalyst for motivation. With our progress recording service, celebrate each leap in your IELTS learning journey, setting and achieving higher milestones.
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(4)}
                        className='text-whiteText text-[32px] font-normal leading-[38.5px] absolute top-[-60px] right-[13px] cursor-pointer whitespace-nowrap '><span className="text-[rgba(243, 243, 243, 0.50)]">04</span> Motivation Booster</div>
                </motion.div>
                <motion.div
                    style={{ opacity: selectedItem === 4 || selectedItem === 0 ? 1 : 0.5 }}
                    className='relative w-[340px] h-[50vh]'>
                    <Image
                        className='absolute top-[-105px] right-[100px] text-whiteText '
                        src="/icons/flag.svg"
                        alt="flag icon"
                        width={52}
                        height={113}
                        loading="eager"
                        priority
                    />
                    <motion.div
                        animate={{ height: selectedItem === 4 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className='relative ml-auto w-[340px] max-w-[340px] font-normal text-[20px] text-whiteText h-[7vh] border-l-[1px] border-t-[1px] border-l-whiteText border-t-whiteText '>
                    </motion.div>
                </motion.div>
            </div>
        </AnimatePresence>
    </section>
};

export default Section4;