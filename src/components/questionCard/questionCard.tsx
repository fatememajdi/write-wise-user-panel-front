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
    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });
    const isTablet = useMediaQuery({ query: "(max-width: 1281px)" });

    return (
        <div className='col-lg-6 col-md-6 col-12 h-fit max-h-fit self-start flex w-full mb-auto sm:pr-0 sm:z-[2] '>
            <div className='flex-1 flex flex-col h-fit py-[63px] tablet:py-[30px] mac:py-[40px] justify-center min-h-[176px] tablet:min-h-[126px] mac:min-h-[115px] border-b-[1px] border-b-blackText '>
                <div className='flex-1 flex flex-row justify-between items-center '>
                    <div className='h-fit text-[24px] tablet:text-[15px] mac:text-[19px] font-bold leading-[36px] tablet:leading-[22px] mac:leading-[28px] pl-[23px] text-blackText mr-[45px] tablet:mr-[30px] flex flex-row sm:text-[13px] '>
                        {question}
                    </div>
                    {
                        showQ ?
                            <AiOutlineMinus className='min-h-[35px] min-w-[35px] tablet:min-h-[20px] tablet:min-w-[20px] text-[35px] tablet:text-[15px] cursor-pointer sm:min-h-[20px] sm:min-w-[20px] sm:text-[20px] ' onClick={() => changeShowQ()} />
                            :
                            <AiOutlinePlus className='min-h-[35px] min-w-[35px] tablet:min-h-[20px] tablet:min-w-[20px] text-[35px] tablet:text-[15px] cursor-pointer sm:min-h-[20px] sm:min-w-[20px] sm:text-[20px] ' onClick={() => changeShowQ(id)} />
                    }

                </div>

                <motion.div
                    animate={showQ ? { height: 'fit-content', opacity: 1, marginTop: isTablet ? 11 : isMac ? 15 : 29, marginBottom: isMac ? 8 : 14 } : { height: 0, opacity: 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className='pl-[23px] pr-[33px] text-blackText font-normal leading-[36px] tablet:leading-[22px] mac:leading-[28px] text-[24px] tablet:text-[15px] mac:text-[19px] overflow-hidden sm:text-[13px] h-0 '>
                    {answer}
                </motion.div>

            </div>
        </div>
    )
};
