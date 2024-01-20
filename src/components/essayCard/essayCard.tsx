import React from "react";
import ReactLoading from 'react-loading';
import { useMediaQuery } from 'react-responsive';
import dynamic from 'next/dynamic';

//--------------------------------------components
import Loading from "@/components/loading/loading";
const SelectComponents = dynamic(() => import('@/components/customSelect/customSelect'));
const DialogComponent = dynamic(() => import("@/components/dialog/dialog"));
const ScoreRecommendationCard = dynamic(() => import("./recommendation"));
const EssayBody = dynamic(() => import("./body"));
const EssayScore = dynamic(() => import("./score"));
const EssayAnalysis = dynamic(() => import("./analysis"));
const ScoreInsightsCard = dynamic(() => import("./insights"));
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';

//--------------------------------------icons
import { Lock } from '../../../public/dashboard';
import { HiExclamationCircle } from 'react-icons/hi';

//----------------------------------------------styles
import styles from './essayCard.module.css';

//----------------------------------------------types
import { Essay } from "../../../types/essay";
import { CheckStatus } from "../Untitled";

type _props = {
    essay: Essay,
    setFieldValue: any,
    divRef: any,
    handleDelete: any,
    loading?: boolean,
    setEssaies: any,
    essaies: Essay[],
    topic: string,
    type: string,
    GetScores: any,
    OnEditEssay: any
};

const EssayCard: React.FC<_props> = ({ essay, setFieldValue, divRef, handleDelete, loading, topic, GetScores, essaies, OnEditEssay, type }) => {
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    const tabBarItems = [
        {
            title: type === 'academic_task_1' ? 'Report' : type === 'general_task_1' ? 'Letter/Email' : 'Essay',
            active: true,
            index: 1,
        },
        {
            title: 'Score',
            active: true,
            index: 0,
        },
        {
            title: 'Analysis',
            active: true,
            index: 2,
        },
        {
            title: 'Insights',
            active: true,
            index: 3,
        },
        {
            title: 'Recommendations',
            active: true,
            index: 4,
        },
    ];

    async function Retry() {
        await GetScores(essaies, essay);
    };
    const [open, setOpen] = React.useState<boolean>(false);
    const { step, goTo, currentStepIndex } = useMultiStepForm(
        [
            <EssayScore key={0} essay={essay} GetScores={Retry} />,
            <EssayBody key={1} essay={essay} setFieldValue={setFieldValue} handleDelete={handleDelete} divRef={divRef} setOpen={setOpen} topic={topic} OnEditEssay={OnEditEssay} />,
            <EssayAnalysis key={2} essay={essay} GetScores={Retry} />,
            <ScoreInsightsCard key={4} Insight={essay.essayInsights as string} GetScores={Retry} essay={essay} />,
            <ScoreRecommendationCard key={3} recommendation={essay.essayRecommendations as string} GetScores={Retry} essay={essay} />
        ]);

    return <div className='h-[596px] flex flex-col rounded-[8px] overflow-hidden mt-[55px] z-[2] sm:bg-background sm:h-fit sm:relative sm:border-none '>
        {!isMobile ?
            <div className='bg-seccondaryColor h-[64px] flex flex-row items-center justify-between border-[2px] border-seccondaryColor z-[2] mac:h-[50px] mac:p-0 '>
                {
                    tabBarItems.map((item, index) =>
                        <div
                            onClick={() => goTo(item.index)}
                            style={!item.active ? { cursor: 'context-menu' } : {}}
                            className={'flex flex-1 items-center justify-center text-whiteText text-center text-[20px] font-medium leading-normal cursor-pointer py-0 px-[40px] rounded-[8px] h-[64px] mac:h-[50px] mac:text-[16px] sm:text-[16px] sm:py-0 sm:px-[15px] '
                                + (currentStepIndex === item.index ? ' bg-navyBlue underline mac:h-full ' : '')}
                            key={index} >
                            <span
                                style={!item.active ? { opacity: 0.5, cursor: 'context-menu' } : {}}>{item.title}</span>
                            {!item.active && <Lock className='text-whiteText ml-[5px] ' />}
                            {
                                index === 1 ? CheckStatus(essay.scoreJobStatus, 'loading') ?
                                    <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} className='flex ml-[8px] ' />
                                    : CheckStatus(essay.scoreJobStatus, 'fail') ?
                                        <HiExclamationCircle color="#763646" className="ml-[5px] mt-[5px] text-[25px] " /> : <></>

                                    : index === 2 ? CheckStatus(essay.scoreJobStatus, 'loading') ?
                                        <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} className='flex ml-[8px] ' />
                                        : CheckStatus(essay.scoreJobStatus, 'fail') ?
                                            <HiExclamationCircle color="#763646" className="ml-[5px] mt-[5px] text-[25px] " /> : <></>

                                        : index === 3 ? CheckStatus(essay.insightJobStatus, 'loading') ?
                                            <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} className='flex ml-[8px] ' />
                                            : CheckStatus(essay.insightJobStatus, 'fail') ?
                                                <HiExclamationCircle color="#763646" className="ml-[5px] mt-[5px] text-[25px] " /> : <></>

                                            : index === 4 ? CheckStatus(essay.recommendationJobStatus, 'loading') ?
                                                <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} className='flex ml-[8px] ' />
                                                : CheckStatus(essay.recommendationJobStatus, 'fail') ?
                                                    <HiExclamationCircle color="#763646" className="ml-[5px] mt-[5px] text-[25px] " /> : <></>
                                                : <></>
                            }
                        </div>
                    )
                }
            </div>
            :
            <SelectComponents values={[
                { title: type === 'academic_task_1' ? 'Report' : type === 'general_task_1' ? 'Letter/Email' : 'Essay', active: true },
                { title: 'Essay', active: true },
                { title: 'Analysis', active: true },
                { title: 'Insights', active: true },
                { title: 'Recommendations', active: true }
            ]}
                selectedItem={currentStepIndex} onChange={goTo} />
        }

        {
            loading === true ?
                <div className={styles.writingEssayCard}>
                    <Loading style={{ height: 390, minHeight: 0 }} />
                </div>
                : step

        }

        <DialogComponent open={open} handleClose={() => setOpen(false)}
            handleDelete={() => {
                setOpen(false);
                handleDelete(essay?.id)
            }}
            title="Delete Essay" dialog="Permanently delete the essay?" />
    </div >
};

export default EssayCard;
