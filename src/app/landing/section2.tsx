'use client';
import React from "react";
import { Carousel } from 'react-responsive-carousel';

//-------------------------------styles
import styles from './landingSection2.module.css';

//--------------------------------components
import Section2Background from "@/components/section2Background/section2Background";

//--------------------------------icons
import { ArrowRight } from "../../../public";

//--------------------------------data 
const steps = [
    {
        step: 'Step 1',
        title: 'Sign Up and Log InSign Up and Log In',
        description: 'Begin your journey to IELTS success by signing up for a WriteWiseAI account. Once you have registered, log in to access your user panel and explore our wide range of features tailored for IELTS test-takers'
    },
    {
        step: 'Step 1',
        title: 'Sign Up and Log InSign Up and Log In',
        description: 'Begin your journey to IELTS success by signing up for a WriteWiseAI account. Once you have registered, log in to access your user panel and explore our wide range of features tailored for IELTS test-takers'
    },
]

const Section2: React.FC = () => <Section2Background>
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
        renderArrowPrev={(clickHandler, hasPrev) => {
            return (
                <div
                    className={`${hasPrev ? "absolute" : "hidden"
                        } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                    onClick={clickHandler}
                >
                    <ArrowRight className="" />
                </div>
            );
        }}
        renderArrowNext={(clickHandler, hasNext) => {
            return (
                <div
                    className={`${hasNext ? "absolute" : "hidden"
                        } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20`}
                    onClick={clickHandler}
                >
                    <ArrowRight className="" />
                </div>
            );
        }}
        showStatus={false}
        thumbWidth={100}
        className={'col-lg-7 ' + styles.section2carousel}>
        {
            steps.map((item, index) => <StepCard Step={item} key={index} />)
        }
    </Carousel>

</Section2Background>;

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