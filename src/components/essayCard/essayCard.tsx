import React, { lazy } from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

//--------------------------------------components
import Loading from "@/components/loading/loading";
const Slider = dynamic(() => import("@/components/slider/slider"));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));
const Text = lazy(() => import("@/components/text/text"));

//--------------------------------------icons
import { MdEdit } from 'react-icons/md';
import { Lock } from '../../../public/dashboard';
import { AiOutlineDelete } from 'react-icons/ai';
import { LuAlarmClock } from 'react-icons/lu';

//----------------------------------------------styles
import styles from './essayCard.module.css';

//----------------------------------------------types
import { Essay } from "../../../types/essay";

//----------------------------------------------components
const DialogComponent = lazy(() => import("@/components/dialog/dialog"));
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';

const tabBarItems = [
    {
        title: 'Essay',
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

type _props = {
    essay: Essay,
    setFieldValue: any,
    divRef: any,
    handleDelete: any,
    loading?: boolean,
    setEssaies: any,
    essaies: Essay[],
    topic: string
}

const EssayCard: React.FC<_props> = ({ essay, setFieldValue, divRef, handleDelete, loading, setEssaies, essaies, topic }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const { step, goTo, currentStepIndex } = useMultiStepForm(
        [<EssayScore key={0} essay={essay} goTo={analysisStep} />,
        <EssayBody key={1} essay={essay} setFieldValue={setFieldValue} handleDelete={handleDelete} divRef={divRef} setOpen={setOpen} topic={topic} />,
        <EssayAnalysis key={2} essay={essay} />,
        <ScoreInsightsCard key={4} Insight={essay.essayInsights as string} />,
        <ScoreRecommendationCard key={3} recommendation={essay.essayRecommendations as string} />
        ]);

    function analysisStep() { goTo(2) };


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

const EssayBody: React.FC<{ essay: Essay, setFieldValue: any, handleDelete: any, divRef?: any, setOpen: any, topic: string }>
    = ({ essay, setFieldValue, divRef, setOpen, topic }) => {
        return <div className={styles.writingEssayCard}>

            <div className={styles.writingTimeCard}>
                <LuAlarmClock className={styles.clockIcon} />
                {essay.durationMillisecond && Math.round(essay.durationMillisecond / 60000) + ' minutes'}
                <span>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</span>
            </div>

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

const EssayScore: React.FC<{ essay: Essay, goTo: any }> = ({ goTo, essay }) => {

    return <div
        className={styles.writingScoreCard}>
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
        <div className={styles.analusisButtonContainer}>
            <button
                type="button"
                aria-label="anausis button"
                onClick={() => goTo(3)}
                className={styles.analusisButton}>
                Analysis
            </button>
        </div>
    </div>
};

const EssayAnalysis: React.FC<{ essay: Essay }> = ({ essay }) => {
    return <div
        className={styles.writingScoreCard}>
        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
        <div className={styles.writingScoresContainer}>
            <div>
                <ScoreSummeryCard key={0} title="Task Achievement" summery={essay?.taskAchievementSummery} />
                <ScoreSummeryCard key={1} title="Coherence & Cohesion" summery={essay?.coherenceAndCohesionSummery} />
                <ScoreSummeryCard key={2} title="Lexical resource" summery={essay?.lexicalResourceSummery} />
                <ScoreSummeryCard key={3} title="Grammatical Range and accuracy" summery={essay?.grammaticalRangeAndAccuracySummery} />
            </div>
        </div>
    </div>

};

const ScoreCard: React.FC<{ title: string, score?: number }> = ({ title, score }) => {
    const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);

    async function RefetchScore() {
        setRefetchLoading(true);
        setRefetchLoading(false);
    };

    return <div className={styles.writingScoreItemCard}>
        {title}:{
            refetchLoading || score === undefined ? <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />
                : score <= 0 ? <div
                    style={{ marginLeft: 8, fontSize: 18, color: '#AB141D', cursor: 'pointer' }}
                    onClick={() => RefetchScore()}>reload!</div>
                    : score
        }
    </div>
}

const ScoreSummeryCard: React.FC<{ title: string, summery?: string }> = ({ title, summery }) => {
    const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);

    async function RefetchScore() {
        setRefetchLoading(true);
        setRefetchLoading(false);
    };

    return <div className={styles.writingScoreSummeryItemCard}>
        {title}: <br /><span>
            {
                refetchLoading || summery === undefined ? <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />
                    : summery === '' ? <div
                        style={{ marginLeft: 8, fontSize: 18, color: '#AB141D', cursor: 'pointer' }}
                        onClick={() => RefetchScore()}>reload!</div>
                        : summery
            }
        </span>
    </div>
}

const ScoreRecommendationCard: React.FC<{ recommendation: string }>
    = ({ recommendation }) => {
        const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);
        const [htmlString, setHtmlString] = React.useState(recommendation);

        const createMarkup = () => {
            return { __html: htmlString };
        };

        const router = useRouter();

        return (<div className={styles.writingScoreCard}>
            {refetchLoading ?
                <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />
                : recommendation != '' ?
                    <div dangerouslySetInnerHTML={createMarkup()} />
                    : <div
                        style={{ marginLeft: 8, fontSize: 18, color: '#AB141D', cursor: 'pointer' }}>reload!</div>
            }
        </div>
        );
    }

const ScoreInsightsCard: React.FC<{ Insight: string }>
    = ({ Insight }) => {
        const [htmlString, setHtmlString] = React.useState(Insight);
        const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);

        const createMarkup = () => {
            return { __html: htmlString };
        };

        const router = useRouter();

        return (<div className={styles.writingScoreCard}>
            {refetchLoading ?
                <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />
                : Insight != '' ?
                    <div dangerouslySetInnerHTML={createMarkup()} />
                    : <div
                        style={{ marginLeft: 8, fontSize: 18, color: '#AB141D', cursor: 'pointer' }}>reload!</div>
            }
        </div >
        );
    }