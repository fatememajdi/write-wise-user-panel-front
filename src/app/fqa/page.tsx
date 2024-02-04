'use client';
import React from "react";
import dynamic from "next/dynamic";
import ReactLoading from 'react-loading';
import { AnimatePresence } from 'framer-motion';

//--------------------------------------------components
const Footer = dynamic(() => import("@/components/footer/footer"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-[200px]"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const QuestionCard = dynamic(() => import("@/components/questionCard/questionCard"), { ssr: false, loading: () => <div className=" min-h-[80px] items-center justify-center flex m-auto ml-auto "><ReactLoading type='bubbles' color={'#929391'} height={50} width={50} /></div> });
const LandingHeader = dynamic(() => import("@/components/landingHeader/landingHeader"), { ssr: false, loading: () => <div className="text-center min-h-[80px] items-center justify-center flex bg-seccondaryColor "><ReactLoading type='bubbles' color={'#929391'} height={50} width={50} /></div> });
import { StopLoader } from "@/components/Untitled";

//--------------------------------------------icons 
import { IoMdChatbubbles } from 'react-icons/io';

//-------------------------------------------------------- data
import questions from '../../../public/data/Questions.json';

const Page: React.FC = () => {
    React.useEffect(() => {
        StopLoader();
    }, []);

    const [logedIn, changeLogedIn] = React.useState<boolean>(false);
    const [showQ, changeShowQ] = React.useState<number>();

    React.useEffect(() => {
        const item = localStorage.getItem('user');
        if (item)
            changeLogedIn(true);
        else
            changeLogedIn(false);
        StopLoader();

    }, []);


    return <div className="col-12 bg-fqa-pattern bg-cover bg-no-repeat min-h-screen overflow-hidden relative sm:min-h-fit ">
        <LandingHeader logedIn={logedIn} shadow />

        <AnimatePresence>
            <div className='col-12 bg-seccondaryColor h-[460px] mac:h-[370px] relative top-0 flex flex-col justify-center items-center pt-[100px] sm:h-[150px] '>
                <div className='text-whiteText relative text-center text-[48px] mac:text-[38px] mac:leading-[47px] font-extrabold leading-[36px] flex flex-col items-center sm:text-[20px] sm:mb-[50px] '>
                    <IoMdChatbubbles className='text-[98px] mac:text-[77px] sm:hidden absolute top-[-50px] right-[-95px] mac:top-[-10px] mac:right-[-75px] ' /><br />
                    Frequently Asked Questions
                </div>

            </div>
            <div className='col-12 flex lg:flex-row min-h-[30vh] pt-[85px] mac:pt-[41px] pr-[167px] mac:px-[105px] pb-[312px] pl-[167px] items-start sm:py-[50px] sm:px-[14px] sm:flex-col ' key={Math.random()} >
                <div className='flex flex-col h-fit flex-1 pr-[100px] mac:pr-[90px] '>
                    {
                        questions.slice(0, questions.length / 2).map((item, index) => <QuestionCard key={index} question={item.question} answer={item.answer} id={item.id} showQ={showQ === item.id} changeShowQ={changeShowQ} />)
                    }

                </div>
                <div className='flex flex-col h-fit flex-1 pl-[100px] mac:pl-[90px] '>
                    {
                        questions.slice(questions.length / 2, questions.length + 1).map((item, index) => <QuestionCard key={index} question={item.question} answer={item.answer} id={item.id} showQ={showQ === item.id} changeShowQ={changeShowQ} />)
                    }

                </div>
            </div>
        </AnimatePresence>
        <Footer />
    </div>
};

export default Page;

