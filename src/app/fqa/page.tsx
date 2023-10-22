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

//--------------------------------------------------------fake data
const questions = [
    {
        question: 'How does the WriteWiseAI platform work?',
        answer: 'WriteWiseAI is an AI-powered platform designed to help IELTS test-takers improve their writing skills. Users can submit essays for rating, receive personalized feedback, and access our AI-powered writing tutor. Simply sign up, log in, write or upload your essay, and choose the services that best suit your needs.'
    },
    {
        question: 'How long does it take to get feedback on my essay?',
        answer: 'WriteWiseAI provides feedback on your essay almost instantly. Within seconds of submitting your essay, you\'ll receive a comprehensive analysis, personalized feedback, and targeted recommendations to help you improve.'
    },
    {
        question: 'How does WriteWiseAI score and analyze essays?',
        answer: 'WriteWiseAI uses advanced artificial intelligence algorithms to accurately score and analyze essays based on the specific criteria of IELTS writing exams. The AI evaluates Task Achievement, grammar, vocabulary, coherence, and cohesion. Then it provides your score, and if you choose to, personalized feedback and recommendations to help you improve your writing skills.'
    },
    {
        question: 'How much does it cost to get personalized feedback and access the AI-powered writing tutor?',
        answer: 'Personalized feedback and recommendation costs 1 token per essay. Using the AI-powered writing tutor costs 3 tokens per essay (1 token = $1). Simply purchase tokens and use them to submit your essays for detailed feedback and real-time writing guidance.'
    },
    {
        question: 'How long does it take to get feedback on my essay?',
        answer: 'WriteWiseAI provides feedback on your essay almost instantly. Within seconds of submitting your essay, you\'ll receive a comprehensive analysis, personalized feedback, and targeted recommendations to help you improve.'
    },
    {
        question: 'How accurate are the AI-generated essay ratings?',
        answer: 'WriteWiseAI uses advanced AI technology to analyze your essays based on the official IELTS criteria. While our system is highly accurate and reliable, it\'s important to remember that AI-generated ratings may not perfectly match those of human examiners. We suggest a “between rater” difference of half a band score to be considered. Nonetheless, our ratings serve as a valuable tool for understanding your current writing proficiency and tracking your progress.'
    },
    {
        question: 'How do I purchase tokens for WriteWiseAI services?',
        answer: 'After signing up and logging in, navigate to the "Purchase Tokens" section in your user panel. Select the number of tokens you wish to buy (Minimum 10) and complete the payment process. You can then use your tokens to access personalized feedback and the AI-powered writing tutor.'
    },
    {
        question: 'Can I use WriteWiseAI for both General and Academic IELTS writing tasks?',
        answer: 'Absolutely! WriteWiseAI supports Task 1 General, Task 1 Academic, and Task 2 essay types, allowing you to practice and improve your writing skills for any IELTS test format.'
    },
    {
        question: 'Is my personal information and essay data secure on WriteWiseAI?',
        answer: 'Yes, we take data privacy and security very seriously. WriteWiseAI uses industry-standard encryption and security measures to protect your personal information and essay data. We do not share your information with third parties without your consent.'
    },
    {
        question: 'Can I use WriteWiseAI for other types of English exams or general writing improvement?',
        answer: 'WriteWiseAI is specifically designed to help users prepare for IELTS writing exam. However, the feedback and recommendations provided by our platform can also be beneficial for general writing improvement and other types of English exams that involve essay writing.'
    },
    {
        question: 'What payment methods does WriteWiseAI accept?',
        answer: 'WriteWiseAI accepts a variety of payment methods, including credit cards, debit cards, and various online payment services. For Iranian users, we offer localized pricing plans in Iranian Rial.'
    },
    {
        question: 'What is the AI-powered topic generator, and how can I use it?',
        answer: 'The AI-powered topic generator is a feature available in both free and paid plans that generates essay topics for users to practice writing. It helps users by providing fresh, relevant topics tailored to the specific exam type (IELTS General Task 1, IELTS Academic Task1, and IELTS Task 2 writing). To use the topic generator, simply choose the exam type and generate a new topic to practice writing an essay on.'
    },
    {
        question: 'Can I access WriteWiseAI on my mobile device?',
        answer: 'Yes, WriteWiseAI is designed to be accessible on both desktop and mobile devices. Our platform is optimized for a seamless user experience across various screen sizes and devices, allowing you to practice and improve your IELTS writing skills anytime, anywhere.'
    },
    {
        question: 'Can I get a refund if I\'m not satisfied with the service?',
        answer: 'We strive to provide the best possible experience for our users. If you\'re not satisfied with the services provided by WriteWiseAI, please reach out to our customer support team. We\'ll work with you to address your concerns and, if necessary, discuss the possibility of a refund on a case-by-case basis.'
    },
];

const FQA: React.FC = () => {
    React.useEffect(() => {
        StopLoader();
    }, []);

    return <FqaQuestionsBackground>
        <AnimatePresence>
            <div className={'col-12 ' + styles.topContainer}>
                <div className={styles.title}>Frequently Asked Questions</div>

            </div>
            <div className={'col-12 ' + styles.mainContainer}>
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

export default FQA;

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
                    <div className={styles.question}>
                        {question}
                    </div>
                    {
                        showAnswer ?
                            <AiOutlineMinus className={styles.plusIcon} onClick={() => changeShowAnswer(!showAnswer)} />
                            :
                            <AiOutlinePlus className={styles.plusIcon} onClick={() => changeShowAnswer(!showAnswer)} />
                    }

                </div>

                <motion.div
                    animate={{ height: showAnswer ? 'fit-content' : 0, opacity: showAnswer ? 1 : 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className={styles.answer}>
                    {answer}
                </motion.div>

            </div>
        </div>
    )
};
