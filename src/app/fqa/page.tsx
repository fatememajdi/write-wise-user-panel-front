'use client';
import React from "react";
import dynamic from "next/dynamic";
import ReactLoading from 'react-loading';
import { AnimatePresence } from 'framer-motion';

//--------------------------------------------components
const FqaQuestionsBackground = dynamic(
    () => import("@/components/backgrounds/fqaBackground/fqaBackground").then(module => ({ default: module.FqaQuestionsBackground })), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
}
);
const Footer = dynamic(() => import("@/components/footer/footer"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-[200px]"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const QuestionCard = dynamic(() => import("@/components/questionCard/questionCard"), { ssr: false, loading: () => <div className=" min-h-[80px] items-center justify-center flex m-auto ml-auto "><ReactLoading type='bubbles' color={'#929391'} height={50} width={50} /></div> });
import { StopLoader } from "@/components/Untitled";

//--------------------------------------------icons 
import { IoMdChatbubbles } from 'react-icons/io';

//-------------------------------------------------------- data
import questions from '../../../public/data/Questions.json';

const Page: React.FC = () => {
    React.useEffect(() => {
        StopLoader();
    }, []);

    return <FqaQuestionsBackground>
        <AnimatePresence>
            <div className='col-12 bg-seccondaryColor h-[418px] relative top-0 flex flex-col justify-center items-center pt-[100px] sm:h-[150px] '>
                <div className='text-whiteText text-center text-[64px] font-bold leading-[40px] flex flex-col items-center sm:text-[20px] sm:mb-[50px] '>
                    <IoMdChatbubbles className='text-[100px] sm:hidden ' /><br />
                    Frequently Asked Questions</div>

            </div>
            <div className='col-12 flex lg:flex-row min-h-[30vh] pt-[147px] pr-[40px] pb-[150px] pl-[180px] items-start sm:py-[50px] sm:px-[14px] sm:flex-col ' key={Math.random()} >
                <div className='flex flex-col h-fit flex-1 '>
                    {
                        questions.slice(0, questions.length / 2).map((item, index) => <QuestionCard key={index} question={item.question} answer={item.answer} />)
                    }

                </div>
                <div className='flex flex-col h-fit flex-1 '>
                    {
                        questions.slice(questions.length / 2, questions.length + 1).map((item, index) => <QuestionCard key={index} question={item.question} answer={item.answer} />)
                    }

                </div>
            </div>
        </AnimatePresence>
        <Footer />
    </FqaQuestionsBackground>
};

export default Page;

