'use client';
import React from "react";
import { motion } from 'framer-motion';

//--------------------------------------------icons 
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';


type _props = {
    question: string,
    answer: string
};

export default function QuestionCard({ question, answer }: _props) {
    const [showAnswer, changeShowAnswer] = React.useState<boolean>(false);

    return (
        <div className='col-lg-6 col-md-6 col-12 pr-[127px] h-fit max-h-fit self-start flex w-full mb-auto sm:pr-0 sm:z-[2] '>
            <div className='flex-1 flex flex-col h-fit border-b-[1px] border-b-blackText '>
                <div className='flex-1 flex flex-row justify-between items-center pt-[32px] '>
                    <h6 className='h-fit leading-[30px] text-blackText mr-[45px] flex flex-row sm:text-[13px] '>
                        {question}
                    </h6>
                    {
                        showAnswer ?
                            <AiOutlineMinus className='min-h-[35px] min-w-[35px] text-[35px] cursor-pointer sm:min-h-[20px] sm:min-w-[20px] sm:text-[20px] ' onClick={() => changeShowAnswer(!showAnswer)} />
                            :
                            <AiOutlinePlus className='min-h-[35px] min-w-[35px] text-[35px] cursor-pointer sm:min-h-[20px] sm:min-w-[20px] sm:text-[20px] ' onClick={() => changeShowAnswer(!showAnswer)} />
                    }

                </div>

                <motion.div
                    animate={showAnswer ? { height: 'fit-content', opacity: 1, marginTop: 20 } : { height: 0, opacity: 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className='rounded-[5px] mr-[22px] mb-[32px] text-blackText font-light leading-[30px] text-[24px] overflow-hidden sm:text-[13px] h-0 '>
                    {answer}
                </motion.div>

            </div>
        </div>
    )
};
