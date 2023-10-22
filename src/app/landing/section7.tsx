'use client';
import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';

//--------------------------styles
import styles from './landingSection7.module.css';

//------------------------------------------components
import { FqaBackground } from "@/components/backgrounds/fqaBackground/fqaBackground";
import { StartLoader } from "@/components/Untitled";

//------------------------------------------icons
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoIosArrowForward } from 'react-icons/io';

const questions = [
    {
        id: 0,
        question: <div className={styles.itemCard}>How does the <span>W</span>rite<span>W</span>ise<span>AI</span> platform work?</div>,
        answer: 'WriteWiseAI is an AI-powered platform designed to help IELTS test-takers improve their writing skills. Users can submit essays for rating, receive personalized feedback, and access our AI-powered writing tutor. Simply sign up, log in, write or upload your essay, and choose the services that best suit your needs.'
    },
    {
        id: 1,
        question: <div className={styles.itemCard}>How does <span>W</span>rite<span>W</span>ise<span>AI</span> score and analyze essays?</div>,
        answer: 'WriteWiseAI uses advanced artificial intelligence algorithms to accurately score and analyze essays based on the specific criteria of IELTS writing exams. The AI evaluates Task Achievement, grammar, vocabulary, coherence, and cohesion. Then it provides your score, and if you choose to, personalized feedback and recommendations to help you improve your writing skills.'
    },
    {
        id: 2,
        question: <div className={styles.itemCard}>How long does it take to get feedback on my essay?</div>,
        answer: 'WriteWiseAI provides feedback on your essay almost instantly. Within seconds of submitting your essay, you will receive a comprehensive analysis, personalized feedback, and targeted recommendations to help you improve.'
    },
    {
        id: 3,
        question: <div className={styles.itemCard}>How long does it take to get feedback on my essay?</div>,
        answer: 'WriteWiseAI provides feedback on your essay almost instantly. Within seconds of submitting your essay, you will receive a comprehensive analysis, personalized feedback, and targeted recommendations to help you improve.'
    },
    {
        id: 4,
        question: <div className={styles.itemCard}>Is my personal information and essay data secure on <span>W</span>rite<span>W</span>ise<span>AI</span>?</div>,
        answer: 'Yes, WriteWiseAI offers a free essay rating service that provides an overall band score and 4 criteria-specific band scores for your essay. There is no cost for this service, and you can use it an unlimited number of times.'
    },
    {
        id: 5,
        question: <div className={styles.itemCard}>How much does it cost to get personalized feedback and access the AI-powered writing tutor?</div>,
        answer: 'Personalized feedback and recommendation costs 1 token per essay. Using the AI-powered writing tutor costs 3 tokens per essay (1 token = $1). Simply purchase tokens and use them to submit your essays for detailed feedback and real-time writing guidance.'
    }
];

const Section7: React.FC = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const router = useRouter();
    const [selectedItem, ChangeSelectedItem] = React.useState<number>(null);

    return (<FqaBackground>
        <AnimatePresence>
            <div className={styles.section7Container}>
                <div className={'col-lg-6 col-md-6 col-12 ' + styles.itemsContainer}>
                    {
                        questions.slice(0, 3).map((item, index) => <QuestionCard selectedItem={selectedItem} QA={item} key={index} ChangeSelectedItem={ChangeSelectedItem} />)
                    }
                    <button
                        onClick={() => {
                            router.push('/fqa');
                            StartLoader();
                        }}
                        className={styles.readMoreButton}>
                        Read more <IoIosArrowForward className={styles.arrowIcon} />
                    </button>
                </div>

                <div
                    style={{ marginLeft: isMobile ? 0 : 30 }}
                    className={'col-lg-6 col-md-6 col-12 ' + styles.itemsContainer}>
                    {
                        questions.slice(3, 6).map((item, index) => <QuestionCard selectedItem={selectedItem} QA={item} key={index} ChangeSelectedItem={ChangeSelectedItem} />)
                    }
                </div>
            </div>
        </AnimatePresence>
    </FqaBackground>)
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

    return <div className={styles.itemContainer}>
        <div className={styles.QuestionCard}>
            {QA.question}
            {
                selectedItem === QA.id ?
                    <div
                        className={styles.icon}
                        onClick={() => ChangeSelectedItem(-1)}>
                        <AiOutlineMinus className={styles.QuestionIcon} /></div>
                    :
                    <div
                        className={styles.icon}
                        onClick={() => ChangeSelectedItem(QA.id)}>
                        <AiOutlinePlus className={styles.QuestionIcon} /></div>
            }
        </div>

        <motion.div
            animate={{ height: selectedItem === QA.id ? 'fit-content' : 0, opacity: selectedItem === QA.id ? 1 : 0 }}
            transition={{ type: "spring", duration: 1 }}
            className={styles.answerCard}
        >
            {
                selectedItem === QA.id && QA.answer
            }
        </motion.div>
    </div>
};