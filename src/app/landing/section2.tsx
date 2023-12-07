'use client';
import React from "react";
import { Carousel } from 'react-responsive-carousel';

//-------------------------------styles
import styles from './landingSection2.module.css';
import '../../styles/global.css';

//--------------------------------data 
import steps from '../../../public/data/Steps.json';

const Section2: React.FC = () => {

    return <section className={styles.section2Container} id="how-it-works">
        <div className={styles.textContainer}>
            <h2 className={styles.title}>
                How it works
            </h2>

            <h6 className={styles.description}>
                Start a transformative journey to refine your IELTS writing skills. <span>W</span>rite<span>W</span>ise<span>AI</span> offers a seamless experience, ensuring your essays align with IELTS standards.
                Use our intuitive platform to receive AI-powered rating, analysis, and personalized actionable insights and recommendations.  </h6>
        </div>

        <div className={'col-12 ' + styles.carouselCard}>
            <Carousel
                showThumbs={false}
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
    <h4 className={styles.stepCardDescription}>{Step.description}</h4>
</div>