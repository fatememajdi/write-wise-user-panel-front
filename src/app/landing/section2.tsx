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
        title: 'Sign Up and Select Your IELTS Exam',
        description: 'Kickstart your IELTS success by signing up for a WriteWiseAI account. Once registered, choose your IELTS category - General or Academic - ensuring feedback tailored to specific IELTS criteria.'
    },
    {
        step: 'Step 2',
        title: 'Compose or Upload Your Essay',
        description: 'Pick between Task 1 General, Task 1 Academic, or Task 2 essay prompts. Draft your response directly on our platform or paste a pre-written essay. Our AI-driven system will then scrutinize your work, offering a comprehensive rating rooted in IELTS guidelines.'
    },
    {
        step: 'Step 3',
        title: 'Unlock AI-Powered Feedback and Insights',
        description: 'Upon submission, let our expert system delve into your essay. Receive in-depth, AI-powered analysis, feedback, and tailored recommendations that spotlight areas for improvement. With WriteWiseAI, every critique becomes a stepping stone to IELTS excellence.'
    },
    {
        step: 'Step 4',
        title: 'Continuously Learn, Refine, and Triumph',
        description: 'Capitalize on our AI-fueled writing tutor as you practice and hone your IELTS writing skills. Secure real-time guidance while crafting your essays, ensuring enhancement in structure, coherence, vocabulary, and argumentation. As you evolve with WriteWiseAI, pave the way for top-tier IELTS scores and future accomplishments."'
    }
]

const Section2: React.FC = () => {

    return <Section2Background>
        <section className={styles.section2Container} id="section-5">
            <div className={styles.textContainer}>
                <div className={styles.title}>
                    How it works
                </div>

                <div className={styles.secondTitle}>
                    Achieve IELTS Writing Success in 3 Simple Steps!
                </div>

                <div className={styles.description}>
                    Embark on a transformative journey to refine your IELTS writing skills.
                    <span className={styles.boldLetter}>W</span>rite<span className={styles.boldLetter}>W</span>ise<span className={styles.boldLetter}>AI</span>, powered by advanced GPT-4<br />
                    technology, offers a seamless experience, ensuring your essays align with IELTS standards. Dive into our intuitive four-<br />
                    step process for AI-powered insights, personalized feedback, and actionable recommendations.
                </div>
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
        </section >
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