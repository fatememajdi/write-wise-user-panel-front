'use client';
import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';

//--------------------------styles
import styles from './landingSection7.module.css';
import '../../styles/global.css';

//------------------------------------------components
import { StartLoader } from "@/components/Untitled";

//------------------------------------------icons
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

const questions = [
    {
        id: 0,
        question: <div className={styles.itemCard}>How does the <span>W</span>rite<span>W</span>ise<span>AI</span> platform work?</div>,
        answer: 'WriteWiseAI is an AI-powered platform designed to help IELTS test-takers improve their writing skills. Users can submit essays for rating, receive personalized feedback, and track your progress. Simply sign up, log in, write or upload your essay, and have it rated to receive your score and individualized insights and resommendations.'
    },
    {
        id: 1,
        question: <div className={styles.itemCard}>How does <span>W</span>rite<span>W</span>ise<span>AI</span> score and analyze essays?</div>,
        answer: 'WriteWiseAI uses advanced artificial intelligence algorithms to accurately score and analyze essays based on the specific criteria of IELTS writing exams. The AI evaluates Task Achievement/Response, Cohesion and Coherence, Lexical Resource, and Grammatical Range and Accuracy. Then it provides your score, and personalized feedback and recommendations to help you improve your writing skills.'
    },
    {
        id: 2,
        question: <div className={styles.itemCard}>How long does it take to get feedback on my essay?</div>,
        answer: 'WriteWiseAI provides feedback on your essay almost instantly. Within seconds of submitting your essay, you will receive a comprehensive analysis, personalized feedback, and targeted recommendations to help you improve'
    },
    {
        id: 3,
        question: <div className={styles.itemCard}>Can I use <span>W</span>rite<span>W</span>ise<span>AI</span> for both General and Academic IELTS writing tasks?</div>,
        answer: 'Absolutely! WriteWiseAI supports Task 1 General, Task 1 Academic, and Task 2 essay types, allowing you to practice and improve your writing skills for any IELTS test format.'
    },
    {
        id: 4,
        question: <div className={styles.itemCard}>How do I pay for <span>W</span>rite<span>W</span>ise<span>AI</span> services?</div>,
        answer: ' To use our Pay-as-you-Go system, after signing up and logging in, navigate to the "Wallet" section in your user panel. Then, select a payment model , and complete the payment process. You can then use your wallet to access rating, analysis and personalized feedback and recommendations.'
    },
    {
        id: 5,
        question: <div className={styles.itemCard}>How accurate are the AI-generated essay ratings?</div>,
        answer: 'WriteWiseAI uses advanced AI technology to analyze your essays based on the official IELTS criteria. While our system is highly accurate and reliable, it\'s important to remember that AI-generated ratings may not perfectly match those of human examiners. We suggest a “between-rater” difference of half a band score to be considered. Nonetheless, our ratings serve as a valuable tool for understanding your current writing proficiency and tracking your progress.'
    }
];

const Section7: React.FC = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const router = useRouter();
    const [selectedItem, ChangeSelectedItem] = React.useState<number>(null);

    return (<section className="overflow-hidden bg-background sm:bg-section7-gradiant " id="FQA">
        <AnimatePresence>
            <div className="flex flex-1 lg:flex-row items-start pt-[240px] px-[290px] pb-[303px] sm:min-h-fit sm:py-[40px] sm:px-[30px] sm:flex-col-reverse ">
                <div className='col-lg-6 col-md-6 col-12 flex flex-col '>
                    {
                        questions.slice(0, 3).map((item, index) => <QuestionCard selectedItem={selectedItem} QA={item} key={index} ChangeSelectedItem={ChangeSelectedItem} />)
                    }
                    <button
                        onClick={() => {
                            router.push('/fqa');
                            StartLoader();
                        }}
                        className="text-seccondaryColor w-fit text-[24px] font-black leading-[24px] mt-[50px] p-0 items-center sm:text-[13px] sm:font-black sm:leading-[16.17px] hover:shadow-none ">
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
}

export default Section7;

type _props = {
    QA: {
        question: any,
        id: number,
        answer: string
    },
    selectedItem: number,
    ChangeSelectedItem: any
};

const QuestionCard: React.FC<_props> = ({ QA, selectedItem, ChangeSelectedItem }) => {

    return <div className="max-w-[622px] min-h-[197px] py-[50px] px-0 flex flex-col h-fit border-b-[1px] border-b-blackText sm:py-[20px] sm:min-h-fit sm:last-of-type:border-b-[1px] last-of-type:border-0 ">
        <div className="w-full flex flex-row items-center justify-between ">
            <h6> {QA.question}</h6>
            {
                selectedItem === QA.id ?
                    <div
                        className="cursor-pointer ml-30px "
                        onClick={() => ChangeSelectedItem(-1)}>
                        <AiOutlineMinus className="text-[40px] sm:text-[20px] " /></div>
                    :
                    <div
                        className="cursor-pointer ml-30px "
                        onClick={() => ChangeSelectedItem(QA.id)}>
                        <AiOutlinePlus className="text-[40px] sm:text-[20px] " /></div>
            }
        </div>

        <motion.div
            animate={{ height: selectedItem === QA.id ? 'fit-content' : 0, opacity: selectedItem === QA.id ? 1 : 0 }}
            transition={{ type: "spring", duration: 1 }}
            className="text-blackText text-[24px] font-light leading-[31.2px] mt-[16px] overflow-hidden sm:text-[13px] sm:font-normal sm:leading-[20px] "
        >
            {
                selectedItem === QA.id && QA.answer
            }
        </motion.div>
    </div>
};