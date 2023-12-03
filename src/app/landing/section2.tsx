'use client';
import React from "react";
import { Carousel } from 'react-responsive-carousel';

//-------------------------------styles
import styles from './landingSection2.module.css';

//--------------------------------data 
const steps = [
    {
        step: 'Step 1',
        title: 'Sign Up and claim your offer!',
        description: 'Kickstart your IELTS success by signing up for a WriteWiseAI account. Once registered, top up your wallet to start your journey.'
    },
    {
        step: 'Step 2',
        title: 'Choose Task Type',
        description: 'In your dashboard, choose your IELTS writing task type. Pick between GT Task 1, AC Task 1, or Task 2 writing types.'
    },
    {
        step: 'Step 3',
        title: 'Choose a Topic',
        description: 'Type in your own topic or ask the system to generate a topic for you. You can choose your writing task subtype or leave it on Random and then click on ‘Generate’ button. You need to validate your topic first if you type it in.'
    },
    {
        step: 'Step 4',
        title: 'Start Writing',
        description: 'Start writing your task or paste your previously written task in the space provided and when finished, click on the ‘Score’ button.'
    },
    {
        step: 'Step 5',
        title: 'Get your Score,Analysis,and Recommendations',
        description: 'After submission, let our expert system analyze your essay. Receive in-depth, AI-powered analysis, feedback, and tailored recommendations that spotlight areas for improvement. With WriteWiseAI, every critique becomes a stepping stone towards IELTS excellence.'
    }
];

const Section2: React.FC = () => {

    return <section className={styles.section2Container} id="how-it-works">
        <div className={styles.textContainer}>
            <div className={styles.title}>
                How it works
            </div>

            <div className={styles.description}>
                Start a transformative journey to refine your IELTS writing skills. <span>W</span>rite<span>W</span>ise<span>AI</span> offers a seamless experience, ensuring your essays align with IELTS standards.
                Use our intuitive platform to receive AI-powered rating, analysis, and personalized actionable insights and recommendations.  </div>
        </div>

        <div className={'col-12 ' + styles.carouselCard}>
            <Carousel
                showThumbs={false}
                // renderArrowPrev={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasPrev: any) => {
                //     return (
                //         <div
                //             className={`${hasPrev ? "absolute" : "hidden"
                //                 } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 ` + styles.arrowCard}
                //             onClick={clickHandler}
                //         >
                //             <div
                //                 style={{ paddingRight: 5 }}
                //                 className={styles.arrowContainer}>
                //                 <ArrowLeft className={styles.arrowIcon} />
                //                 <IoIosArrowBack className={styles.mobileArrowIcon} />
                //             </div>
                //         </div>
                //     );
                // }}
                // renderArrowNext={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasNext: any) => {
                //     return (
                //         <div
                //             className={`${hasNext ? "absolute" : "hidden"
                //                 } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 ` + styles.arrowCard}
                //             onClick={clickHandler}
                //         >
                //             <div
                //                 style={{ paddingLeft: 5 }}
                //                 className={styles.arrowContainer}>
                //                 <ArrowRight className={styles.arrowIcon} />
                //                 <IoIosArrowForward className={styles.mobileArrowIcon} />
                //             </div>

                //         </div>
                //     );
                // }}
                autoPlay
                interval={6000}
                showStatus={false}
                showArrows={false}
                showIndicators={false}
                infiniteLoop
                thumbWidth={100}
                className={'col-12 ' + styles.section2carousel}>
                <div style={{ display: 'flex', flexDirection: 'row', height: 380 }} key={0}>
                    {
                        steps.slice(0, 3).map((item, index) => <StepCard Step={item} key={index} />)
                    }
                </div>
                <div style={{ display: 'flex', flexDirection: 'row', height: 380 }} key={1}>
                    {
                        steps.slice(3).map((item, index) => <StepCard Step={item} key={index} />)
                    }
                </div>
            </Carousel>
        </div>
    </section >
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