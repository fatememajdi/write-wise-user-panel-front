'use client';
import React, { lazy } from "react";
import { AnimatePresence, motion } from 'framer-motion';

//--------------------------------------------styles
import styles from './fqa.module.css';

//--------------------------------------------components
const FqaQuestionsBackground = React.lazy(
    () => import("@/components/backgrounds/fqaBackground/fqaBackground").then(module => ({ default: module.FqaQuestionsBackground }))
);
const Footer = lazy(() => import("@/components/footer/footer"));
import { StopLoader } from "@/components/Untitled";

//--------------------------------------------icons 
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';
import { IoMdChatbubbles } from 'react-icons/io';

//-------------------------------------------------------- data
import questions from '../../../public/data/Questions.json';

const Page: React.FC = () => {
    React.useEffect(() => {
        StopLoader();
    }, []);

    return <FqaQuestionsBackground>
        <AnimatePresence>
            <div className={'col-12 ' + styles.topContainer}>
                <div className={styles.title}>
                    <IoMdChatbubbles className={styles.chatIcon} /><br />
                    Frequently Asked Questions</div>

            </div>
            <div className={'col-12 ' + styles.mainContainer} key={Math.random()} >
                <div className={styles.left}>
                    {
                        questions.slice(0, questions.length / 2).map((item, index) => <QuestionCard key={index} question={item.question} answer={item.answer} />)
                    }

                </div>
                <div className={styles.right}>
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

interface _props {
    question: string,
    answer: string
}

const QuestionCard: React.FC<_props> = ({ question, answer }) => {
    const [showAnswer, changeShowAnswer] = React.useState<boolean>(false);

    return (
        <div className={'col-lg-6 col-md-6 col-12 ' + styles.questionCard}>
            <div className={styles.questionMainCard}>
                <div className={styles.questionContent}>
                    <h6 className={styles.question}>
                        {question}
                    </h6>
                    {
                        showAnswer ?
                            <AiOutlineMinus className={styles.plusIcon} onClick={() => changeShowAnswer(!showAnswer)} />
                            :
                            <AiOutlinePlus className={styles.plusIcon} onClick={() => changeShowAnswer(!showAnswer)} />
                    }

                </div>

                <motion.div
                    animate={showAnswer ? { height: 'fit-content', opacity: 1, marginTop: 20 } : { height: 0, opacity: 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className={styles.answer}>
                    {answer}
                </motion.div>

            </div>
        </div>
    )
};
