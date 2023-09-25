import React, { lazy } from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';
import client from "@/config/applloAuthorizedClient";
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

//----------------------------------------------styles
import styles from './essayCard.module.css';

//----------------------------------------------types
import { Essay } from "../../../types/essay";

//----------------------------------------------components
const DialogComponent = lazy(() => import("@/components/dialog/dialog"));
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
import { SCORE_COHERENCE, SCORE_GRAMMATICAL, SCORE_INSIGHT, SCORE_LEXICAL, SCORE_RECOMMENDATION, SCORE_TASK_RESPONSE } from "@/config/graphql";

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
        title: 'Recommendations',
        active: true,
        index: 3,
    },
    {
        title: 'Insights',
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
        [<EssayScore key={0} essay={essay} goTo={analysisStep} essaies={essaies} setEssaies={setEssaies} />,
        <EssayBody key={1} essay={essay} setFieldValue={setFieldValue} handleDelete={handleDelete} divRef={divRef} setOpen={setOpen} topic={topic} />,
        <EssayAnalysis key={2} essay={essay} essaies={essaies} setEssaies={setEssaies} />,
        <ScoreRecommendationCard key={3} recommendation={essay.essayRecommendations as string} essay={essay} essaies={essaies} setEssaies={setEssaies} />,
        <ScoreInsightsCard key={4} Insight={essay.essayInsights as string} essay={essay} essaies={essaies} setEssaies={setEssaies} />
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
            { title: 'Analysis', active: false, lock: true },
            { title: 'Recommendations', active: false, lock: true },
            { title: 'WWAI Tutor', active: false, lock: true }
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
            {/* <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div> */}

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

const EssayScore: React.FC<{ essay: Essay, setEssaies: any, essaies: Essay[], goTo: any }> = ({ goTo, essay, setEssaies, essaies }) => {
    const router = useRouter();
    async function GetTaskScore() {
        let Essaies: Essay[] = essaies;
        let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
        await client.mutate({
            mutation: SCORE_TASK_RESPONSE,
            variables: {
                id: essay.id
            }
        }).then(async (res) => {
            if (Essay) {
                Essay.taskAchievementScore = res.data.scoreTaskResponse.taskAchievementScore;
                Essay.taskAchievementSummery = res.data.scoreTaskResponse.taskAchievementSummery;
                Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
            };
            setEssaies(Essaies);
            router.refresh();
        }).catch((err) => {
            console.log('get score error : ', err);
        });
    };

    async function GetCoherenceAndCohesionScore() {
        let Essaies: Essay[] = essaies;
        let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
        await client.mutate({
            mutation: SCORE_COHERENCE,
            variables: {
                id: essay.id
            }
        }).then(async (res) => {
            if (Essay) {
                Essay.coherenceAndCohesionScore = res.data.scoreCoherence.coherenceAndCohesionScore;
                Essay.coherenceAndCohesionSummery = res.data.scoreCoherence.coherenceAndCohesionSummery;
                Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
            };
            setEssaies(Essaies);
            router.refresh();
        }).catch((err) => {
            console.log('get score error : ', err);
        });
    };

    async function GetLexicalResourceScore() {
        let Essaies: Essay[] = essaies;
        let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
        await client.mutate({
            mutation: SCORE_LEXICAL,
            variables: {
                id: essay.id
            }
        }).then(async (res) => {
            if (Essay) {
                Essay.lexicalResourceScore = res.data.scoreLexical.lexicalResourceScore;
                Essay.lexicalResourceSummery = res.data.scoreLexical.lexicalResourceSummery;
                Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
            };
            setEssaies(Essaies);
            router.refresh();

        }).catch((err) => {
            console.log('get score error : ', err);
        });
    };

    async function GetGrammaticalRangeAndAccuracyScore() {
        let Essaies: Essay[] = essaies;
        let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
        await client.mutate({
            mutation: SCORE_GRAMMATICAL,
            variables: {
                id: essay.id
            }
        }).then(async (res) => {
            if (Essay) {
                Essay.grammaticalRangeAndAccuracyScore = res.data.scoreGrammatical.grammaticalRangeAndAccuracyScore;
                Essay.grammaticalRangeAndAccuracySummery = res.data.scoreGrammatical.grammaticalRangeAndAccuracySummery;
                Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
            };
            await setEssaies(Essaies);
            router.refresh();
        }).catch((err) => {
            console.log('get score error : ', err);
        });
    };

    return <div
        className={styles.writingScoreCard}>
        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
        <div className={styles.writingScoresContainer}>
            <div>
                <ScoreCard key={0} title="Task Achievement" score={essay?.taskAchievementScore} getScore={GetTaskScore} />
                <ScoreCard key={1} title="Coherence & Cohesion" score={essay?.coherenceAndCohesionScore} getScore={GetCoherenceAndCohesionScore} />
                <ScoreCard key={2} title="Lexical resource" score={essay?.lexicalResourceScore} getScore={GetLexicalResourceScore} />
                <ScoreCard key={3} title="Grammatical Range and accuracy" score={essay?.grammaticalRangeAndAccuracyScore} getScore={GetGrammaticalRangeAndAccuracyScore} />
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

const EssayAnalysis: React.FC<{ essay: Essay, setEssaies: any, essaies: Essay[] }> = ({ essay, setEssaies, essaies }) => {
    const router = useRouter();
    async function GetTaskScore() {
        let Essaies: Essay[] = essaies;
        let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
        await client.mutate({
            mutation: SCORE_TASK_RESPONSE,
            variables: {
                id: essay.id
            }
        }).then(async (res) => {
            if (Essay) {
                Essay.taskAchievementScore = res.data.scoreTaskResponse.taskAchievementScore;
                Essay.taskAchievementSummery = res.data.scoreTaskResponse.taskAchievementSummery;
                Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
            };
            setEssaies(Essaies);
            router.refresh();
        }).catch((err) => {
            console.log('get score error : ', err);
        });
    };

    async function GetCoherenceAndCohesionScore() {
        let Essaies: Essay[] = essaies;
        let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
        await client.mutate({
            mutation: SCORE_COHERENCE,
            variables: {
                id: essay.id
            }
        }).then(async (res) => {
            if (Essay) {
                Essay.coherenceAndCohesionScore = res.data.scoreCoherence.coherenceAndCohesionScore;
                Essay.coherenceAndCohesionSummery = res.data.scoreCoherence.coherenceAndCohesionSummery;
                Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
            };
            setEssaies(Essaies);
            router.refresh();
        }).catch((err) => {
            console.log('get score error : ', err);
        });
    };

    async function GetLexicalResourceScore() {
        let Essaies: Essay[] = essaies;
        let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
        await client.mutate({
            mutation: SCORE_LEXICAL,
            variables: {
                id: essay.id
            }
        }).then(async (res) => {
            if (Essay) {
                Essay.lexicalResourceScore = res.data.scoreLexical.lexicalResourceScore;
                Essay.lexicalResourceSummery = res.data.scoreLexical.lexicalResourceSummery;
                Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
            };
            setEssaies(Essaies);
            router.refresh();

        }).catch((err) => {
            console.log('get score error : ', err);
        });
    };

    async function GetGrammaticalRangeAndAccuracyScore() {
        let Essaies: Essay[] = essaies;
        let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
        await client.mutate({
            mutation: SCORE_GRAMMATICAL,
            variables: {
                id: essay.id
            }
        }).then(async (res) => {
            if (Essay) {
                Essay.grammaticalRangeAndAccuracyScore = res.data.scoreGrammatical.grammaticalRangeAndAccuracyScore;
                Essay.grammaticalRangeAndAccuracySummery = res.data.scoreGrammatical.grammaticalRangeAndAccuracySummery;
                Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
            };
            await setEssaies(Essaies);
            router.refresh();
        }).catch((err) => {
            console.log('get score error : ', err);
        });
    };
    return <div
        className={styles.writingScoreCard}>
        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
        <div className={styles.writingScoresContainer}>
            <div>
                <ScoreSummeryCard key={0} title="Task Achievement" summery={essay?.taskAchievementSummery} getScore={GetTaskScore} />
                <ScoreSummeryCard key={1} title="Coherence & Cohesion" summery={essay?.coherenceAndCohesionSummery} getScore={GetCoherenceAndCohesionScore} />
                <ScoreSummeryCard key={2} title="Lexical resource" summery={essay?.lexicalResourceSummery} getScore={GetLexicalResourceScore} />
                <ScoreSummeryCard key={3} title="Grammatical Range and accuracy" summery={essay?.grammaticalRangeAndAccuracySummery} getScore={GetGrammaticalRangeAndAccuracyScore} />
            </div>
        </div>
    </div>

};

const ScoreCard: React.FC<{ title: string, score?: number, getScore: any }> = ({ title, score, getScore }) => {
    const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);

    async function RefetchScore() {
        setRefetchLoading(true);
        typeof (getScore());
        await getScore();
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

const ScoreSummeryCard: React.FC<{ title: string, summery?: string, getScore: any }> = ({ title, summery, getScore }) => {
    const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);

    async function RefetchScore() {
        setRefetchLoading(true);
        typeof (getScore());
        await getScore();
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

const ScoreRecommendationCard: React.FC<{ recommendation: string, essay: Essay, setEssaies: any, essaies: Essay[] }>
    = ({ recommendation, essaies, essay, setEssaies }) => {
        const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);
        const [htmlString, setHtmlString] = React.useState(recommendation);

        const createMarkup = () => {
            return { __html: htmlString };
        };

        const router = useRouter();

        async function GetTaskRecommendation() {
            setRefetchLoading(true);
            let Essaies: Essay[] = essaies;
            let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
            await client.mutate({
                mutation: SCORE_RECOMMENDATION,
                variables: {
                    id: essay.id
                }
            }).then(async (res) => {
                console.log('reload recommendation : ', res);
                if (Essay) {
                    Essay.essayRecommendations = res.data.recommendation.essayRecommendations;
                    Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
                };
                setHtmlString(res.data.recommendation.essayRecommendations);
                setEssaies(Essaies);
                router.refresh();
            }).catch((err) => {
                console.log('get recommendation error: ', err);
            });
            setRefetchLoading(false);
        };

        return (<div className={styles.writingScoreCard}>
            {refetchLoading ?
                <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />
                : recommendation != '' ?
                    <div dangerouslySetInnerHTML={createMarkup()} />
                    : <div
                        style={{ marginLeft: 8, fontSize: 18, color: '#AB141D', cursor: 'pointer' }}
                        onClick={() => GetTaskRecommendation()}>reload!</div>
            }
        </div>
        );
    }

const ScoreInsightsCard: React.FC<{ Insight: string, essay: Essay, setEssaies: any, essaies: Essay[] }>
    = ({ Insight, essaies, essay, setEssaies }) => {
        const [htmlString, setHtmlString] = React.useState(Insight);
        const [refetchLoading, setRefetchLoading] = React.useState<boolean>(false);

        const createMarkup = () => {
            return { __html: htmlString };
        };

        const router = useRouter();

        async function GetTaskInsights() {
            setRefetchLoading(true);
            let Essaies: Essay[] = essaies;
            let Essay: Essay | undefined = essaies.find(item => item.id === essay.id);
            await client.mutate({
                mutation: SCORE_INSIGHT,
                variables: {
                    id: essay.id
                }
            }).then(async (res) => {
                if (Essay) {
                    Essay.essayInsights = res.data.insights.essayInsights;
                    Essaies[Essaies.findIndex(item => item.id === essay.id)] = Essay;
                };
                setHtmlString(res.data.insights.essayInsights);
                setEssaies(Essaies);
                router.refresh();
            }).catch((err) => {
                console.log('get score insights : ', err);
            });
            setRefetchLoading(false);
        };


        return (<div className={styles.writingScoreCard}>
            {refetchLoading ?
                <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />
                : Insight != '' ?
                    <div dangerouslySetInnerHTML={createMarkup()} />
                    : <div
                        style={{ marginLeft: 8, fontSize: 18, color: '#AB141D', cursor: 'pointer' }}
                        onClick={() => GetTaskInsights()}>reload!</div>
            }
        </div >
        );
    }