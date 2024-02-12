'use client';
import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';

//--------------------------styles
import '../../styles/global.css';

//------------------------------------------components
import { StartLoader } from "@/components/Untitled";

//------------------------------------------icons
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

//-----------------------------------------data
import questions from '../../../public/data/LandingQuestions.json';

export default function Section7() {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isMiniTablet = useMediaQuery({ query: "(max-width: 815px)" });
    const router = useRouter();
    const [selectedItem, ChangeSelectedItem] = React.useState<number>(null);

    return (<section className=" bg-F&Q-pattern bg-cover bg-no-repeat overflow-hidden bg-background sm:bg-section7-gradiant " id="FQA">
        <AnimatePresence>
            <div className="flex flex-1 lg:flex-row mini-tablet:flex-col-reverse items-start pt-[171px] tablet:pt-[112px] mac:pt-[114px] px-[131px] mini-tablet:pl-[70px] mini-tablet:pr-[59px] tablet:px-[65px] mac:px-[60px] pb-[233px] mini-tablet:pb-[223px] mini-tablet:pt-[95px] tablet:pb-[184px] mac:pb-[218px] sm:min-h-fit sm:py-[40px] sm:px-[30px] sm:flex-col-reverse ">
                <div className='w-[50%] mini-tablet:w-full flex flex-col '>
                    {
                        questions.slice(0, 3).map((item, index) => <QuestionCard selectedItem={selectedItem} QA={item} key={index} ChangeSelectedItem={ChangeSelectedItem} />)
                    }
                    <button
                        onClick={() => {
                            router.push('/fqa');
                            StartLoader();
                        }}
                        className="text-seccondaryColor w-fit text-[24px] mini-tablet:text-[20px] mini-tablet:leading-[24px] tablet:text-[15px] mac:text-[18px] font-bold leading-[36px] tablet:leading-[22px] tablet:mt-[32px] tablet:ml-[25px] mac:leading-[28px] mt-[29px] mini-tablet:ml-0 mini-tablet:mt-[64px] mac:mt-[10px] mac:ml-[45px] ml-[50px] p-0 items-center sm:text-[13px] sm:font-black sm:leading-[16.17px] hover:shadow-none ">
                        Read More <IoIosArrowForward className="text-[26px] mt-[5px] sm:text-[16px] tablet:text-[15px] " />
                    </button>
                </div>

                <div
                    style={{ marginLeft: isMobile || isMiniTablet ? 0 : 30 }}
                    className='w-[50%] mini-tablet:w-full flex flex-col '>
                    {
                        questions.slice(3, 6).map((item, index) => <QuestionCard selectedItem={selectedItem} QA={item} key={index} ChangeSelectedItem={ChangeSelectedItem} />)
                    }
                </div>
            </div>
        </AnimatePresence>
    </section>)
};

type _props = {
    QA: {
        question: string,
        id: number,
        answer: string
    },
    selectedItem: number,
    ChangeSelectedItem: any
};

const QuestionCard: React.FC<_props> = ({ QA, selectedItem, ChangeSelectedItem }) => {

    return <div className=" min-h-[163px] mini-tablet:min-h-[94px] tablet:min-h-[103px] mac:min-h-[128px] pt-[50px] mini-tablet:py-[28px] tablet:pt-[40px] tablet:pb-[16px] pb-[32px] mx-[50px] mini-tablet:mx-0 tablet:mx-[25px] mac:mx-[45px] flex flex-col h-fit border-b-[1px] border-b-blackText sm:py-[20px] sm:min-h-fit sm:last-of-type:border-b-[1px] mini-tablet:last-of-type:border-b-[1px] last-of-type:border-0 ">
        <div className="w-full flex flex-row items-center justify-between ">
            <h6 className=" leading-[30px] mac:leading-[28px] tablet:leading-[22px] mini-tablet:leading-[22px] tablet:pl-[8px] "> {QA.question}</h6>
            {
                selectedItem === QA.id ?
                    <div
                        className="cursor-pointer ml-30px "
                        onClick={() => ChangeSelectedItem(-1)}>
                        <AiOutlineMinus className="text-[40px] mini-tablet:text-[22px] sm:text-[20px] mac:text-[24px] tablet:text-[18px] " /></div>
                    :
                    <div
                        className="cursor-pointer ml-30px "
                        onClick={() => ChangeSelectedItem(QA.id)}>
                        <AiOutlinePlus className="text-[40px] mini-tablet:text-[22px] sm:text-[20px] mac:text-[24px] tablet:text-[18px] " /></div>
            }
        </div>

        <motion.div
            animate={{ height: selectedItem === QA.id ? 'fit-content' : 0, opacity: selectedItem === QA.id ? 1 : 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="text-blackText text-[24px] mini-tablet:text-[15px] mini-tablet:leading-[22px] tablet:text-[15px] mac:text-[18px] font-normal leading-[36px] tablet:leading-[22px] mac:leading-[28px] mt-[16px] overflow-hidden sm:text-[13px] sm:font-normal sm:leading-[20px] "
        >
            {
                selectedItem === QA.id && QA.answer
            }
        </motion.div>
    </div>
};