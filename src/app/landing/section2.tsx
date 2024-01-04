'use client';
import React from "react";
import { useMediaQuery } from 'react-responsive';
import { Carousel } from 'react-responsive-carousel';

//-------------------------------styles
import styles from './landingSection2.module.css';
import '../../styles/global.css';

//--------------------------------data 
import steps from '../../../public/data/Steps.json';

const Section2: React.FC = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    return <section className="overflow-hidden pt-[150px] pb-[120px] w-full relative flex flex-col items-center bg-section2-gradiant sm:min-h-fit sm:pt-[20px] sm:pb-[100px]"
        id="how-it-works">
        <div className="flex flex-col items-start mb-[80px] sm:mb-[60px]">
            <h2 className={"text-whiteText leading-[60px] text-center w-full sm:mx-[30px] sm:text-left " + styles.title}>
                How it works
            </h2>

            <h6 className="text-whiteText mt-[24px] max-w-[1050px] tracking-wider leading-[36px] sm:mt-0 sm:mx-[30px]">
                Start a transformative journey to refine your IELTS writing skills. <span className="font-extrabold sm:font-medium">W</span>rite<span className="font-extrabold sm:font-medium">W</span>ise<span className="font-extrabold sm:font-medium">AI</span> offers a seamless experience, ensuring your essays align with IELTS standards.
                Use our intuitive platform to receive AI-powered rating, analysis, and personalized actionable insights and recommendations.  </h6>
        </div>

        <div className={'col-12 ' + styles.carouselCard}>
            {
                isMobile ?
                    <Carousel
                        showThumbs={false}
                        autoPlay
                        interval={6000}
                        showStatus={false}
                        showArrows={false}
                        showIndicators={true}
                        infiniteLoop
                        thumbWidth={100}
                        className={'col-12 ' + styles.section2carousel}>
                        {
                            steps.map((item, index) => <StepCard Step={item} key={index} />)
                        }

                    </Carousel>
                    :
                    <Carousel
                        showThumbs={false}
                        autoPlay
                        interval={6000}
                        showStatus={false}
                        showArrows={false}
                        showIndicators={true}
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
            }
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