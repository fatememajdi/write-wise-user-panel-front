'use client';
import React from "react";
import { motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

//--------------------------------------------icons 
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';


type _props = {
    question: string,
    answer: string,
    id: number,
    showQ: boolean,
    changeShowQ: any
};

export default function QuestionCard({ question, answer, id, showQ, changeShowQ }: _props) {
    const isMac = useMediaQuery({ query: "(max-width: 1680px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1399px)" });
    const isMiniTablet = useMediaQuery({ query: "(max-width: 821px)" });
    const isTabletPro = useMediaQuery({ maxWidth: 1399, minHeight: 1200 });

    return (
        <div className='col-lg-6 col-md-6 col-12 h-fit max-h-fit self-start flex w-full mb-auto sm:pr-0 sm:z-[2] '>
            <div className='flex-1 flex flex-col h-fit py-[63px] tablet:py-[30px] tablet-pro:py-[30px] mac:py-[40px] justify-center min-h-[176px] tablet:min-h-[126px] tablet-pro:min-h-[107px] mini-tablet:min-h-[80px] mini-tablet:pt-[17px] mini-tablet:pb-[30px] mac:min-h-[115px] border-b-[1px] border-b-blackText '>
                <div className='flex-1 flex flex-row justify-between items-center '>
                    <div className='h-fit text-[24px] tablet-pro:text-[19px] mini-tablet:text-[15px] tablet:text-[15px] mac:text-[19px] font-bold leading-[36px] tablet-pro:leading-[29px] mini-tablet:leading-[22px] tablet:leading-[22px] mac:leading-[28px] pl-[23px] tablet-pro:pl-[21px] mini-tablet:pl-[18px] text-blackText mr-[45px] tablet:mr-[30px] flex flex-row sm:text-[13px] '>
                        {question}
                    </div>
                    {
                        showQ ?
                            <AiOutlineMinus className='min-h-[35px] min-w-[35px] tablet-pro:min-h-[23px] tablet-pro:min-w-[23px] tablet-pro:text-[23px] mini-tablet:min-h-[18px] mini-tablet:min-w-[18px] mini-tablet:text-[18px] tablet:min-h-[20px] tablet:min-w-[20px] text-[35px] tablet:text-[15px] cursor-pointer sm:min-h-[20px] sm:min-w-[20px] sm:text-[20px] ' onClick={() => changeShowQ()} />
                            :
                            <AiOutlinePlus className='min-h-[35px] min-w-[35px] tablet-pro:min-h-[23px] tablet-pro:min-w-[23px] tablet-pro:text-[23px] mini-tablet:min-h-[18px] mini-tablet:min-w-[18px] mini-tablet:text-[18px] tablet:min-h-[20px] tablet:min-w-[20px] text-[35px] tablet:text-[15px] cursor-pointer sm:min-h-[20px] sm:min-w-[20px] sm:text-[20px] ' onClick={() => changeShowQ(id)} />
                    }

                </div>

                <motion.div
                    animate={showQ ? { height: 'fit-content', opacity: 1, marginTop: isMiniTablet ? 25 : isTabletPro ? 35 : isTablet ? 11 : isMac ? 15 : 29, marginBottom: isMiniTablet ? -6 : isMac ? 8 : 14 } : { height: 0, opacity: 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className='pl-[23px] tablet-pro:text-[19px] mini-tablet:pl-0 pr-[33px] mini-tablet:pr-0 mini-tablet:text-[15px] mini-tablet:leading-[22px] tablet-pro:leading-[29px] tablet-pro:pl-0 text-blackText font-normal leading-[36px] tablet:leading-[22px] mac:leading-[28px] text-[24px] tablet:text-[15px] mac:text-[19px] overflow-hidden sm:text-[13px] h-0 '>
                    {answer}
                </motion.div>

            </div>
        </div>
    )
};
