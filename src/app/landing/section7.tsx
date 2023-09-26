'use client';
import React from "react";
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
        question: 'How does the WriteWiseAI platform work?',
        answer: ''
    },
    {
        question: 'How does WriteWiseAI score and analyze essays?',
        answer: ''
    },
    {
        question: 'How long does it take to get feedback on my essay?',
        answer: ''
    },
    {
        question: 'How long does it take to get feedback on my essay?',
        answer: ''
    },
    {
        question: 'Is my personal information and essay data secure on WriteWiseAI?',
        answer: ''
    },
    {
        question: 'Is my personal information and essay data secure on WriteWiseAI?',
        answer: ''
    }
];

const Section7: React.FC = () => {
    const router = useRouter();

    return (<FqaBackground>
        <div className={styles.section7Container}>
            <div className={'col-lg-6 col-md-6 ' + styles.itemsContainer}>
                <QuestionCard question={<div className={styles.itemCard}>How does the <span>W</span>rite<span>W</span>ise<span>AI</span> platform work?</div>} />
                <QuestionCard question={<div className={styles.itemCard}>How does <span>W</span>rite<span>W</span>ise<span>AI</span> score and analyze essays?</div>} />
                <QuestionCard question={<div className={styles.itemCard}>How long does it take to get feedback on my essay?</div>} />
                <button
                    onClick={() => {
                        router.push('/fqa');
                        StartLoader();
                    }}
                    className={styles.readMoreButton}>
                    Read more <IoIosArrowForward fontSize={26} />
                </button>
            </div>

            <div
                style={{ paddingLeft: 50 }}
                className={'col-lg-6 col-md-6 ' + styles.itemsContainer}>
                <QuestionCard question={<div className={styles.itemCard}>How long does it take to get feedback on my essay?</div>} />
                <QuestionCard question={<div className={styles.itemCard}>Is my personal information and essay data secure on <span>W</span>rite<span>W</span>ise<span>AI</span>?</div>} />
                <QuestionCard question={<div className={styles.itemCard}>Is my personal information and essay data secure on <span>W</span>rite<span>W</span>ise<span>AI</span>?</div>} />
            </div>
        </div>
    </FqaBackground>)
}

export default Section7;


const QuestionCard: React.FC<{ question: any }> = ({ question }) => {

    const [showAnswer, setShowAnswer] = React.useState<boolean>(false);

    return <div className={styles.itemContainer}>
        {question}
        {
            showAnswer ?
                <div
                    className={styles.icon}
                    onClick={() => setShowAnswer(false)}>
                    <AiOutlineMinus fontSize={40} /></div>
                :
                <div
                    className={styles.icon}
                    onClick={() => setShowAnswer(true)}>
                    <AiOutlinePlus fontSize={40} /></div>
        }
    </div>
};