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
            <div className='col-12 bg-seccondaryColor h-[460px] mini-tablet:h-[236px] tablet:h-[272px] mac:h-[370px] relative top-0 flex flex-col justify-center items-center mini-tablet:pt-[40px] tablet:pt-[34px] pt-[100px] sm:h-[150px] '>
                <div className='text-whiteText relative text-center text-[48px] mini-tablet:text-[30px] tablet:text-[30px] mac:text-[38px] mac:leading-[47px] tablet:leading-[36px] font-extrabold leading-[36px] flex flex-col items-center sm:text-[20px] sm:mb-[50px] '>
                    <IoMdChatbubbles className='text-[98px] mini-tablet:text-[60px] tablet:text-[60px] mac:text-[77px] sm:hidden absolute top-[-50px] right-[-95px] mini-tablet:top-[-7px] mini-tablet:right-[-60px] tablet:top-[-7px] tablet:right-[-60px] mac:top-[-10px] mac:right-[-75px] ' /><br />
                    Frequently Asked Questions
                </div>

            </div>
            <div className='col-12 flex lg:flex-row mini-tablet:flex-col min-h-[30vh] pt-[85px] tablet:pt-[36px] mac:pt-[41px] pr-[167px] mac:px-[105px] tablet:px-[50px] mini-tablet:px-[70px] mini-tablet:pb-[80px] mini-tablet:pt-[36px] pb-[312px] tablet:pb-[100px] pl-[167px] items-start sm:py-[50px] sm:px-[14px] sm:flex-col ' key={Math.random()} >
                <div className='flex flex-col h-fit flex-1 pr-[100px] tablet:pr-[50px] mini-tablet:pr-0 mac:pr-[90px] '>
                    {
                        questions.slice(0, questions.length / 2).map((item, index) => <QuestionCard key={index} question={item.question} answer={item.answer} id={item.id} showQ={showQ === item.id} changeShowQ={changeShowQ} />)
                    }

                </div>
                <div className='flex flex-col h-fit flex-1 pl-[100px] tablet:pl-[50px] mini-tablet:pl-0 mac:pl-[90px] '>
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

