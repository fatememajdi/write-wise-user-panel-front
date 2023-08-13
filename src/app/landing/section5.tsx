'use client';
import React from "react";
import { useRouter } from 'next/navigation';

//------------------------------------------styles
import styles from './landingSection5.module.css';

//------------------------------------------components
import { FqaBackground } from "@/components/backgrounds/fqaBackground/fqaBackground";
import { StartLoader } from "@/components/Untitled";

//------------------------------------------icons
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

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

const Section5: React.FC = () => {
    const router = useRouter();

    return (<FqaBackground>
        <div className={'col-12 ' + styles.fqaContainer}>
            <div className={styles.fqaItemText + ' ' + styles.fqaFirstItem}>
                How does the WriteWiseAI platform work?
            </div>
            <div className={styles.fqaItemText}>
                How does WriteWiseAI score and analyze essays?
            </div>
            <div className={styles.fqaItemText + ' ' + styles.fqaLastItem}>
                How long does it take to get feedback on my essay?
            </div>
            {
                questions.map((question, index) => <QuestionCard key={index} question={question} />)
            }
            <button
                aria-label="fqa page button"
                onClick={() => {
                    router.push('/fqa');
                    StartLoader();
                }}
                className={styles.fqaButton}>
                FQA page
            </button>
        </div>
    </FqaBackground>)
};

export default Section5;

const QuestionCard: React.FC<{ question: any }> = ({ question }) => {

    const [showAnswer, setShowAnswer] = React.useState<boolean>(false);

    return <div className={styles.questionCard}>
        <div className={styles.questionContent}>
            <div className={styles.questionText}>{question.question}</div>
            <div
                className={styles.showAnserButton}
                onClick={() => setShowAnswer(!showAnswer)}
            >
                {
                    !showAnswer ?
                        <AiOutlinePlus />
                        :
                        <AiOutlineMinus />
                }
            </div>
        </div>
        {
            showAnswer &&
            <div className={styles.answer}>{question.answer}</div>
        }
    </div>
};