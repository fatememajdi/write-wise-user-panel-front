import React from "react";
import ReactLoading from 'react-loading';
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
            <EssayScore key={0} essay={essay} goTo={analysisStep} GetScores={Retry} />,
            <EssayBody key={1} essay={essay} setFieldValue={setFieldValue} handleDelete={handleDelete} divRef={divRef} setOpen={setOpen} topic={topic} OnEditEssay={OnEditEssay} />,
            <EssayAnalysis key={2} essay={essay} GetScores={Retry} />,
            <ScoreInsightsCard key={4} Insight={essay.essayInsights as string} GetScores={Retry} essay={essay} goTo={GoTo} />,
            <ScoreRecommendationCard key={3} recommendation={essay.essayRecommendations as string} GetScores={Retry} />
        ]);

    function analysisStep() { goTo(2) };
    function GoTo(index: number) { goTo(index) };

    return <div className={styles.writingDataCard}>
        <div className={styles.writingDataTabBarCard}>
            {
                tabBarItems.map((item, index) =>
                    <div
                        onClick={() => goTo(item.index)}
                        style={!item.active ? { cursor: 'context-menu' } : {}}
                        className={currentStepIndex === item.index ? styles.activeTopTabBarItemCard + ' ' + styles.topTabBarItemCard
                            : styles.topTabBarItemCard}
                        key={index} >
                        <span
                            style={!item.active ? { opacity: 0.5, cursor: 'context-menu' } : {}}>{item.title}</span>
                        {!item.active && <Lock className={styles.lockIcon} />}
                        {
                            index === 1 ? essay.overallBandScore === undefined ?
                                <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} className={styles.titleLoading} />
                                : essay.taskAchievementScore <= 0 || essay.coherenceAndCohesionScore <= 0
                                    || essay.lexicalResourceScore <= 0 || essay.grammaticalRangeAndAccuracyScore <= 0 ?
                                    <HiExclamationCircle color="#763646" style={{ marginLeft: 5, marginTop: 5, fontSize: 25 }} /> : <></>

                                : index === 2 ? essay.taskAchievementSummery === undefined || essay.coherenceAndCohesionSummery === undefined ||
                                    essay.grammaticalRangeAndAccuracySummery === undefined || essay.lexicalResourceSummery === undefined ?
                                    <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} className={styles.titleLoading} /> :
                                    essay.taskAchievementSummery === '' || essay.coherenceAndCohesionSummery === '' ||
                                        essay.grammaticalRangeAndAccuracySummery === '' || essay.lexicalResourceSummery === '' ?
                                        <HiExclamationCircle color="#763646" style={{ marginLeft: 5, marginTop: 5, fontSize: 25 }} /> : <></>

                                    : index === 3 ? essay.essayInsights === undefined ?
                                        <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} className={styles.titleLoading} />
                                        : essay.essayInsights === '' ?
                                            <HiExclamationCircle color="#763646" style={{ marginLeft: 5, marginTop: 5, fontSize: 25 }} /> : <></>

                                        : index === 4 ? essay.essayRecommendations === undefined ?
                                            <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} className={styles.titleLoading} />
                                            : essay.essayRecommendations === '' ?
                                                <HiExclamationCircle color="#763646" style={{ marginLeft: 5, marginTop: 5, fontSize: 25 }} /> : <></>
                                            : <></>
                        }
                    </div>
                )
            }
        </div>

        <SelectComponents values={[
            { title: 'Score', active: true, lock: false },
            { title: 'Essay', active: true, lock: false },
            { title: 'Analysis', active: true, lock: false },
            { title: 'Recommendations', active: true, lock: false },
            { title: 'Insights', active: true, lock: false }
        ]}
            selectedItem={currentStepIndex} className={styles.writingCardSelect} onChange={goTo} />

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