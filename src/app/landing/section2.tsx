'use client';
import React from "react";
import { useMediaQuery } from 'react-responsive';
import { Carousel } from 'react-responsive-carousel';

//-------------------------------styles
import '../../styles/global.css';

//--------------------------------data 
import steps from '../../../public/data/Steps.json';

export default function Section2() {
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    return <section className="overflow-hidden pt-[150px] pb-[120px] w-full relative flex flex-col items-center bg-section2-gradiant sm:min-h-fit sm:pt-[20px] sm:pb-[100px]"
        id="how-it-works">
        <div className="flex flex-col items-start mb-[80px] sm:mb-[60px]">
            <h2 className="text-whiteText leading-[60px] text-center w-full sm:mx-[30px] sm:text-left sm:mr-auto sm:w-fit " >
                How it works
            </h2>

            <h6 className="text-whiteText mt-[24px] max-w-[1050px] tracking-wider leading-[36px] sm:mt-0 sm:mx-[30px]">
                Start a transformative journey to refine your IELTS writing skills. <span className="font-extrabold sm:font-medium">W</span>rite<span className="font-extrabold sm:font-medium">W</span>ise<span className="font-extrabold sm:font-medium">AI</span> offers a seamless experience, ensuring your essays align with IELTS standards.
                Use our intuitive platform to receive AI-powered rating, analysis, and personalized actionable insights and recommendations.  </h6>
        </div>

        <div className='col-12 border-t-2 border-t-whiteText border-b-2 border-b-whiteText' >
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
                        className='col-12 flex self-center mt-[50px] ml-auto mr-auto sm:mt-[60px]'>
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
                        className='col-12 flex self-center mt-[50px] ml-auto mr-auto sm:mt-[60px]'>

                        <div className="flex flex-row h-[380px]" key={0}>
                            {
                                steps.slice(0, 3).map((item, index) => <StepCard Step={item} key={index} />)
                            }
                        </div>
                        <div className="flex flex-row h-[380px]" key={1}>
                            {
                                steps.slice(3).map((item, index) => <StepCard Step={item} key={index} />)
                            }
                        </div>

                    </Carousel>
            }
        </div>
    </section >
};

interface _props {
    Step: {
        step: string,
        title: string,
        description: string
    }
}

const StepCard: React.FC<_props> = ({ Step }) => <div className='pt-[30px] pr-[108px] pb-[40px] pl-[63px] flex flex-col text-whiteText mb-[60px] min-h-[380px] justify-start w-full items-start sm:pt-[20px] sm:pr-[30px] sm:pb-[10px] sm:pl-[30px] sm:mb-[30px] sm:min-h-[246px] sm:justify-start'>
    <div className='font-light text-[20px] text-justify leading-[40px] sm:text-[13px] sm:font-normal'>{Step.step}</div>
    <div className='font-bold text-[32px] leading-[40px] text-left text-whiteText sm:text-[20px] sm:font-semibold sm:mt-[9px] sm:leading-[20px]'>{Step.title}</div>
    <h4 className='leading-[36px] mt-[26px] sm:mt-[18px] text-left'>{Step.description}</h4>
</div>