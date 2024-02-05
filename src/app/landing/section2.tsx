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

    return <section className="bg-howItWorks-pattern bg-cover bg-no-repeat overflow-hidden pt-[58px] mac:pt-[56px] pb-[106px] mac:pb-[100px] w-full relative flex flex-col items-center sm:min-h-fit sm:pt-[20px] sm:pb-[100px]"
        id="how-it-works">
        <div className="flex flex-col items-start mb-[87px] mac:mb-[57px] sm:mb-[60px]">
            <h2 className="text-whiteText leading-[60px] mac:leading-[47px] text-center w-full sm:mx-[30px] sm:text-left sm:mr-auto sm:w-fit " >
                How it works
            </h2>

            <h6 className="text-whiteText mt-[50px] mac:mt-[27px] mac:leading-[28.5px] max-w-[58%] mac:max-w-[69%] lg:mx-auto mac:mx-auto tracking-wider leading-[36px] sm:leading-[20px] sm:mt-0 sm:mx-[30px]">
                Start a transformative journey to refine your IELTS writing skills. WriteWiseAI offers a seamless experience, ensuring your essays align with IELTS standards.
                Use our intuitive platform to receive AI-powered rating, analysis, and personalized actionable insights and recommendations.  </h6>
        </div>

        <div className='col-12 border-t-2 border-t-whiteText border-b-2 border-b-whiteText mac:pl-[87px] mac:pr-[50px] ' >
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
                        className='col-12 flex self-center mt-[20px] ml-auto mr-auto sm:mt-[60px]'>

                        <div className="flex flex-row h-[380px] mac:h-[332px] " key={0}>
                            {
                                steps.slice(0, 3).map((item, index) => <StepCard Step={item} key={index} />)
                            }
                        </div>
                        <div className="flex flex-row h-[380px] mac:h-[332px] " key={1}>
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

const StepCard: React.FC<_props> = ({ Step }) => <div className='pt-[52px] mac:pt-[55px] pr-[23px] mac:pr-[50px] pb-[36px] pl-[80px] mac:pl-0 flex flex-col text-whiteText mb-[60px] min-h-[380px] justify-start w-full items-start sm:pt-[20px] sm:pr-[30px] sm:pb-[10px] sm:pl-[30px] sm:mb-[30px] sm:min-h-[246px] sm:justify-start'>
    <div className='font-normal text-[24px] text-justify leading-[36px] mac:leading-[22px] mac:text-[19px] sm:text-[13px] sm:font-normal'>{Step.step}</div>
    <div className='font-extrabold text-[32px] mac:text-[25px] leading-[36px] mac:leading-[22px] mt-[20px] mac:mt-[12px] text-left text-whiteText sm:text-[20px] sm:font-semibold sm:mt-[9px] sm:leading-[20px]'>{Step.title}</div>
    <div className='leading-[36px] mac:leading-[28.5px] sm:leading-[21px] text-[24px] mac:text-[19px] sm:text-[13px] font-normal mt-[24px] mac:mt-[18px] sm:mt-[18px] text-left'>{Step.description}</div>
</div>