'use client';
import React from "react";
import { Carousel } from 'react-responsive-carousel';

//-------------------------------styles
import styles from './landingSection2.module.css';

//--------------------------------components
import Section2Background from "@/components/backgrounds/section2Background/section2Background";

//--------------------------------icons
import { ArrowLeft, ArrowRight } from "../../../public";
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

//--------------------------------data 
const steps = [
    {
        step: 'Step 1',
        title: 'Sign Up and Log InSign Up and Log In',
        description: 'Begin your journey to IELTS success by signing up for a WriteWiseAI account. Once you have registered, log in to access your user panel and explore our wide range of features tailored for IELTS test-takers'
    },
    {
        step: 'Step 2',
        title: 'Write or Upload Your Essay',
        description: 'Choose from Task 1 General, Task 1 Academic, or Task 2 essay prompts, and write your response directly on our platform or upload a pre-written essay. Our AI-powered system will analyze your work, providing a comprehensive rating based on the IELTS criteria.'
    },
    {
        step: 'Step 3',
        title: 'Receive Personalized Feedback',
        description: 'For a small fee of just $1 per essay, our expert system will generate in-depth feedback and recommendations, pinpointing areas for improvement and offering practical guidance to help you refine your writing skills'
    },
    {
        step: 'Step 4',
        title: 'Learn,Improve,and Succeed',
        description: 'leverage the power of our AI-powered step-by-step writing tutor as you practice and refine your IELTS writing skills. Receive real-time guidance and suggestions while composing your essays, ensuring that you develop strong essay structures, enhance coherence and cohesion, improve vocabulary and grammar, and fine-tune your arguments. With WriteWiseAI, you will gain the confidence and expertise to excel in your IELTS writing, paving the way for your future success.'
    }
]

const Section2: React.FC = () => {

    return <Section2Background>
        <div className={styles.section2Container}>
            <div className={styles.title}>
                How it works
            </div>

            <div className={styles.secondTitle}>
                Achieve IELTS Writing Success in 4 Simple Steps!
            </div>

            <div className={styles.description}>
                Unlock your IELTS writing potential with WriteWiseAI,
                a user-friendly platform designed to enhance your<br /> essay writing skills. Follow our simple,
                four-step process to get accurate essay ratings, personalized <br />feedback,
                and valuable recommendations that will elevate your IELTS performance.
            </div>

            <Carousel
                showThumbs={false}
                renderArrowPrev={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasPrev: any) => {
                    return (
                        <div
                            className={`${hasPrev ? "absolute" : "hidden"
                                } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 ` + styles.arrowCard}
                            onClick={clickHandler}
                        >
                            <div
                                style={{ paddingRight: 5 }}
                                className={styles.arrowContainer}>
                                <ArrowLeft className={styles.arrowIcon} />
                                <IoIosArrowBack className={styles.mobileArrowIcon} />
                            </div>
                        </div>
                    );
                }}
                renderArrowNext={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasNext: any) => {
                    return (
                        <div
                            className={`${hasNext ? "absolute" : "hidden"
                                } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 ` + styles.arrowCard}
                            onClick={clickHandler}
                        >
                            <div
                                style={{ paddingLeft: 5 }}
                                className={styles.arrowContainer}>
                                <ArrowRight className={styles.arrowIcon} />
                                <IoIosArrowForward className={styles.mobileArrowIcon} />
                            </div>

                        </div>
                    );
                }}
                showStatus={false}
                thumbWidth={100}
                className={'col-12 col-md-10 col-lg-8 col-12 ' + styles.section2carousel}>
                {
                    steps.map((item, index) => <StepCard Step={item} key={index} />)
                }
            </Carousel>
        </div >
    </Section2Background >
};

export default Section2;


interface _props {
    Step: {
        step: string,
        title: string,
        description: string
    }
}

const StepCard: React.FC<_props> = ({ Step }) => <div className={styles.stepCard}>
    <div className={styles.stepCardtitle}>{Step.step}</div>
    <div className={styles.stepCardSecondtitle}>{Step.title}</div>
    <div className={styles.stepCardDescription}>{Step.description}</div>
</div>