import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

//--------------------------------------components
import Loading from "@/components/loading/loading";
const Slider = dynamic(() => import("@/components/slider/slider"));
const SelectComponents = dynamic(() => import('@/components/customSelect/customSelect'));
const Text = dynamic(() => import("@/components/text/text"));
const DialogComponent = dynamic(() => import("@/components/dialog/dialog"));
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';

//--------------------------------------icons
import { MdEdit } from 'react-icons/md';
import { Lock } from '../../../public/dashboard';
import { AiOutlineDelete } from 'react-icons/ai';
import { LuAlarmClock } from 'react-icons/lu';
import { HiExclamationCircle } from 'react-icons/hi';

//----------------------------------------------styles
import styles from './essayCard.module.css';
import './htmlStyles.css';

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

const EssayBody: React.FC<{ essay: Essay, setFieldValue: any, handleDelete: any, divRef?: any, setOpen: any, topic: string, OnEditEssay: any }>
    = ({ essay, setFieldValue, divRef, setOpen, topic, OnEditEssay }) => {
        return <div className={styles.writingEssayCard}>

            <div className={styles.writingTimeCard}>
                <LuAlarmClock className={styles.clockIcon} />
                {essay.durationMillisecond && Math.round(essay.durationMillisecond / 60000) + ' minutes'}
                <span>{new Intl.DateTimeFormat('en-US').format((new Date(essay?.date)))}</span>
                <span>{essay.shortId}</span>
            </div>

            <ul>
                <li>
                    zxc
                </li>
            </ul>
            <div className={styles.writingEssayTopic}>
                <Text text={topic} />
            </div>

            <div className={styles.writingEssayText}>
                <Text text={essay?.essay} />
            </div>
            <div className={styles.essayButtonContainer}>
                <button
                    onClick={() => setOpen(true)}
                    type="button"
                    aria-label="delete button"
                    className={styles.deleteWritingButton}>
                    <div className={styles.responsiveEditWritingButton}> <AiOutlineDelete className={styles.deleteWritingButtonIcon} /></div>
                </button>
                <button
                    onClick={() => {
                        setFieldValue('body', essay?.essay);
                        OnEditEssay();
                        if (divRef)
                            divRef.scrollTop = divRef.offsetTop;
                    }}
                    type="button"
                    aria-label="edit button"
                    className={styles.editWritingButton}>
                    <div className={styles.responsiveEditWritingButton}> <MdEdit className={styles.editWritingButtonIcon} /></div>
                </button>

            </div>
        </div>
    };

const EssayScore: React.FC<{ essay: Essay, goTo: any, GetScores: any }> = ({ goTo, essay, GetScores }) => {

    const [reloadStatus, setReloadStatus] = React.useState<boolean>(essay.taskAchievementScore <= 0 || essay.coherenceAndCohesionScore <= 0
        || essay.lexicalResourceScore <= 0 || essay.grammaticalRangeAndAccuracyScore <= 0
    )

    return <div style={reloadStatus ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            essay.overallBandScore === undefined ?
                <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
                : reloadStatus ?
                    <>
                        <RetryCard GetScores={GetScores} />
                    </>
                    :
                    <>
                        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
                        <div className={styles.writingScoresContainer}>
                            <div>
                                <ScoreCard key={0} title="Task Achievement" score={essay?.taskAchievementScore} />
                                <ScoreCard key={1} title="Coherence & Cohesion" score={essay?.coherenceAndCohesionScore} />
                                <ScoreCard key={2} title="Lexical resource" score={essay?.lexicalResourceScore} />
                                <ScoreCard key={3} title="Grammatical Range and accuracy" score={essay?.grammaticalRangeAndAccuracyScore} />
                            </div>

                            <div className={styles.sliderContainer}>
                                <Slider value={essay?.overallBandScore} total={9} />
                            </div>
                        </div>
                    </>
        }
    </div>
};

const EssayAnalysis: React.FC<{ essay: Essay, GetScores: any }> = ({ essay, GetScores }) => {
    const [reloadStatus, setReloadStatus] = React.useState<boolean>(essay.taskAchievementSummery === '' || essay.coherenceAndCohesionSummery === ''
        || essay.lexicalResourceSummery === '' || essay.grammaticalRangeAndAccuracySummery === ''
    )
    return <div style={reloadStatus ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            essay.taskAchievementSummery === undefined ?
                <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
                : reloadStatus ?
                    <RetryCard GetScores={GetScores} />
                    : <>
                        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
                        <div className={styles.writingScoresContainer}>
                            <div>
                                <ScoreSummeryCard key={0} title="Task Achievement" summery={essay?.taskAchievementSummery} />
                                <ScoreSummeryCard key={1} title="Coherence & Cohesion" summery={essay?.coherenceAndCohesionSummery} />
                                <ScoreSummeryCard key={2} title="Lexical resource" summery={essay?.lexicalResourceSummery} />
                                <ScoreSummeryCard key={3} title="Grammatical Range and accuracy" summery={essay?.grammaticalRangeAndAccuracySummery} />
                            </div>
                        </div>
                    </>
        }
    </div>

};

const ScoreRecommendationCard: React.FC<{ recommendation: string, GetScores: any }> = ({ recommendation, GetScores }) => {
    const [htmlString, setHtmlString] = React.useState(recommendation);

    const createMarkup = () => {
        return { __html: htmlString };
    };

    return (<div style={recommendation === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            recommendation === '' ?
                <RetryCard GetScores={GetScores} />
                : recommendation === undefined ?
                    <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
                    : <div dangerouslySetInnerHTML={createMarkup()} />
        }
    </div>
    );
};

const ScoreInsightsCard: React.FC<{ Insight: string, GetScores: any, essay: Essay, goTo: any }> = ({ Insight, GetScores, essay, goTo }) => {
    const [htmlString, setHtmlString] = React.useState(Insight);
    const createMarkup = () => {
        return { __html: htmlString };
    };
    const router = useRouter();

    // return (<div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
    //     {
    //         Insight === '' ?
    //             <RetryCard GetScores={GetScores} essay={essay} />
    //             : Insight === undefined ?
    //                 <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
    //                 : <div dangerouslySetInnerHTML={createMarkup()} />
    //     }
    // </div >
    // );

    if (Insight === '') {
        goTo(3);
        return <div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>

            <RetryCard GetScores={GetScores} essay={essay} />
        </div >
    }
    else if (Insight === undefined) {
        goTo(3);

        return <div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
            <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
        </div >
    } else {
        goTo(3);

        return <div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
            <div dangerouslySetInnerHTML={createMarkup()} />
        </div >
    }
};

const RetryCard: React.FC<{ GetScores: any, essay?: Essay }> = ({ GetScores, essay }) => {
    const [reload, setReload] = React.useState<boolean>(false);

    const router = useRouter();

    return !reload ? <div className={styles.retryContainer}>
        Sorry, something went wrong please try again !
        <button
            type="button"
            onClick={async () => {
                await setReload(true);
                await GetScores();

            }}
        >
            Retry
        </button>
    </div>
        :
        <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
};

const ScoreCard: React.FC<{ title: string, score?: number }> = ({ title, score }) => {
    const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);

    async function RefetchScore() {
        setRefetchLoading(true);
        setRefetchLoading(false);
    };

    return <div className={styles.writingScoreItemCard}>
        {title}:{score}
    </div>
};

const ScoreSummeryCard: React.FC<{ title: string, summery?: string }> = ({ title, summery }) => {
    return <div className={styles.writingScoreSummeryItemCard}>
        {title}: <br /><span>
            {summery}
        </span>
    </div>
};