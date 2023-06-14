'use client';
import React from "react";
import { Formik } from 'formik';

//--------------------------------------------styles
import styles from './fqa.module.css';

//--------------------------------------------components
import { FqaQuestionsBackground } from "@/components/fqaBackground/fqaBackground";
import LandingThirdHeader from "@/components/landingThirdHeader/landingThirdHeader";
import Input from "../../components/input/input";
import Footer from "@/components/footer/footer";

//--------------------------------------------icons 
import { Search } from '../../../public';
import { VscCircleFilled } from 'react-icons/vsc';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

//--------------------------------------------------------fake data
const questions = [
    {
        question: 'How does the WriteWiseAI platform work?',
        answer: ' '
    },
    {
        question: 'How long does it take to get feedback on my essay?',
        answer: ' '
    },
    {
        question: 'How does WriteWiseAI score and analyze essays?',
        answer: ' '
    },
    {
        question: 'How much does it cost to get personalized feedback and access the AI-powered writing tutor?',
        answer: ' '
    },
    {
        question: 'Can I use WriteWiseAI for both General and Academic IELTS writing tasks?',
        answer: ' '
    },
    {
        question: 'Is my personal information and essay data secure on WriteWiseAI?',
        answer: ' '
    },
    {
        question: 'Can I use WriteWiseAI for other types of English exams or general writing improvement?',
        answer: ' '
    },
    {
        question: 'What payment methods does WriteWiseAI accept?',
        answer: ' '
    },
    {
        question: 'What is the AI-powered topic generator, and how can I use it?',
        answer: ' '
    },
    {
        question: 'Can I access WriteWiseAI on my mobile device?',
        answer: ' '
    },
    {
        question: 'Can I get a refund if Im not satisfied with the service?',
        answer: 'Yes, WriteWiseAI is designed to be accessible on both desktop and mobile devices. Our platform is optimized for a seamless user experience across various screen sizes and devices, allowing you to practice and improve your IELTS writing skills anytime, anywhere.'
    },
    {
        question: 'How accurate are the AI-generated essay ratings?',
        answer: ' '
    },
    {
        question: 'How do I purchase tokens for WriteWiseAI services?',
        answer: ' '
    },
    {
        question: 'How long does it take to get feedback on my essay?',
        answer: ' '
    },
]

const FQA: React.FC = () => <FqaQuestionsBackground>
    <div className={'col-12 ' + styles.topContainer}>
        <LandingThirdHeader />
        <div className={styles.title}>How can I help you ?</div>
        <Formik
            initialValues={{
                search: ''
            }}
            // validationSchema={WritingValidationSchema}
            enableReinitialize
            onSubmit={async (values) => {
                // await handleSubmit(values);
            }}

        >
            {({
                values,
                errors,
                touched,
                handleSubmit,
                setFieldValue,
                handleChange
            }) => (

                <form
                    className={styles.searchCard}
                    onSubmit={handleSubmit}>

                    <Search color='#FFFFFF' height={50} width={51.27} />
                    <Input
                        className={styles.searchInput}
                        onChange={handleChange}
                        placeHolder='type here...'
                        input
                        inputtype='search'
                        input_name='search'
                        input_value={values.search}
                        input_error={errors.search && touched.search && errors.search} />
                </form>

            )}

        </Formik>
    </div>
    <div className={'col-12 ' + styles.mainContainer}>
        {
            questions.map((item, index) => <QuestionCard key={index} question={item.question} answer={item.answer} />)
        }
    </div>
    <Footer />
</FqaQuestionsBackground>;

export default FQA;

interface _props {
    question: string,
    answer: string
}

const QuestionCard: React.FC<_props> = ({ question, answer }) => {
    const [showAnswer, changeShowAnswer] = React.useState<boolean>(false);

    return (
        <div className={'col-lg-6 ' + styles.questionCard}>
            <div className={styles.questionContent}>
                <div className={styles.question}>
                    <VscCircleFilled className={styles.circleIcon} />
                    {question}
                </div>
                {
                    showAnswer ?
                        <AiOutlineMinus className={styles.plusIcon} onClick={() => changeShowAnswer(!showAnswer)} />
                        :
                        <AiOutlinePlus className={styles.plusIcon} onClick={() => changeShowAnswer(!showAnswer)} />
                }

            </div>
            {
                showAnswer &&
                <div className={styles.answer}>
                    {answer}
                </div>
            }
        </div>
    )
};
