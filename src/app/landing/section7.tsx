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
    const router = useRouter();
    const [selectedItem, ChangeSelectedItem] = React.useState<number>(null);

    return (<section className="overflow-hidden bg-background sm:bg-section7-gradiant " id="FQA">
        <AnimatePresence>
            <div className="flex flex-1 lg:flex-row items-start pt-[171px] mac:pt-[114px] px-[131px] mac:px-[60px] pb-[233px] mac:pb-[218px] sm:min-h-fit sm:py-[40px] sm:px-[30px] sm:flex-col-reverse ">
                <div className='col-lg-6 col-md-6 col-12 flex flex-col '>
                    {
                        questions.slice(0, 3).map((item, index) => <QuestionCard selectedItem={selectedItem} QA={item} key={index} ChangeSelectedItem={ChangeSelectedItem} />)
                    }
                    <button
                        onClick={() => {
                            router.push('/fqa');
                            StartLoader();
                        }}
                        className="text-seccondaryColor w-fit text-[24px] mac:text-[18px] font-bold leading-[36px] mac:leading-[28px] mt-[29px] mac:mt-[10px] mac:ml-[45px] ml-[50px] p-0 items-center sm:text-[13px] sm:font-black sm:leading-[16.17px] hover:shadow-none ">
                        Read More <IoIosArrowForward className="text-[26px] mt-[5px] sm:text-[16px] " />
                    </button>
                </div>

                <div
                    style={{ marginLeft: isMobile ? 0 : 30 }}
                    className='col-lg-6 col-md-6 col-12 flex flex-col '>
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

    return <div className=" min-h-[163px] mac:min-h-[128px] pt-[50px] pb-[32px] mx-[50px] mac:mx-[45px] flex flex-col h-fit border-b-[1px] border-b-blackText sm:py-[20px] sm:min-h-fit sm:last-of-type:border-b-[1px] last-of-type:border-0 ">
        <div className="w-full flex flex-row items-center justify-between ">
            <h6 className=" leading-[30px] mac:leading-[28px] "> {QA.question}</h6>
            {
                selectedItem === QA.id ?
                    <div
                        className="cursor-pointer ml-30px "
                        onClick={() => ChangeSelectedItem(-1)}>
                        <AiOutlineMinus className="text-[40px] sm:text-[20px] mac:text-[24px] " /></div>
                    :
                    <div
                        className="cursor-pointer ml-30px "
                        onClick={() => ChangeSelectedItem(QA.id)}>
                        <AiOutlinePlus className="text-[40px] sm:text-[20px] mac:text-[24px] " /></div>
            }
        </div>

        <motion.div
            animate={{ height: selectedItem === QA.id ? 'fit-content' : 0, opacity: selectedItem === QA.id ? 1 : 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="text-blackText text-[24px] mac:text-[18px] font-normal leading-[36px] mac:leading-[28px] mt-[16px] overflow-hidden sm:text-[13px] sm:font-normal sm:leading-[20px] "
        >
            {
                selectedItem === QA.id && QA.answer
            }
        </motion.div>
    </div>
};