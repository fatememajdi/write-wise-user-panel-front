import React, { lazy } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { loadStripe } from '@stripe/stripe-js';
import client from '@/config/applloClient';

//--------------------------------------styles
import styles from './essay.module.css';

//--------------------------------------components
import { ADD_ESSAY, GET_RANDOM_GENERAL_TASK1_WRITING, GET_USER_ESSAY, SELECT_TOPIC } from "@/config/graphql";
import Loading from "@/components/loading/loading";
const Slider = dynamic(() => import("@/components/slider/slider"));
const Input = lazy(() => import('@/components/input/input'));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));
import Text from "@/components/text/text";

//--------------------------------------icons
import { Reload } from "../../../../public";
import { MdEdit } from 'react-icons/md';
import { Lock } from '../../../../public/dashboard';

interface topic {
    id: string,
    body: string
}

interface writingProps {
    changeTabBarLoc: any
    changeEndAnimation: any,
    endAnimation: boolean,
    topic?: topic,
    GetTopicsList: any
}

//---------------------------------------------------------------validation
const WritingValidationSchema = Yup.object().shape({
    topic: Yup.string(),
    body: Yup
        .string()
        .required('body is required!'),
});

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string);

const GeneralTask1: React.FC<writingProps> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic, GetTopicsList }) => {

    const [generateWriting, changeGenerateWriting] = React.useState<boolean>(false);
    const [loading, changeLoading] = React.useState<boolean>(false);
    const [firstEssayLoading, changeFirstEssayLoading] = React.useState<boolean>(false);
    const [editedGeneratedTopic, changeEditedGeneratedTopic] = React.useState<boolean>(false);
    const [generateWritingTopicLoading, changeGenerateWritingTopicLoading] = React.useState<boolean>(false);
    const [essaies, setEssaies] = React.useState([]);
    const [essayTopic, changeTopic] = React.useState<topic>();

    //----------------------------------------------------------------get user essaies
    async function GetUserEssaies(id: string) {
        await client.query({
            query: GET_USER_ESSAY,
            variables: {
                id: id
            }
        }).then(async (res) => {
            await setEssaies(res.data.getUserEssay.essaies);
        }).catch((err) => {
            console.log('get users essay error :  : ', err)
        });
    };

    //-----------------------------------------------------------------generate topic
    async function GenerateTopic() {
        changeGenerateWritingTopicLoading(true);
        await client.query({
            query: GET_RANDOM_GENERAL_TASK1_WRITING,
        }).then(async (res) => {
            await changeTopic({ id: res.data.getRandomWriting.id, body: res.data.getRandomWriting.body })
            changeGenerateWritingTopicLoading(false);
        }).catch((err) => {
            console.log('get random writing error :  : ', err);
            changeGenerateWritingTopicLoading(false);
        });
    }

    //------------------------------------------------------------------select essay topic
    async function SelectTopic(topic: string): Promise<string | null> {
        console.log(!editedGeneratedTopic && essayTopic?.body === topic || essayTopic?.body === topic);
        console.log(!essayTopic || essayTopic?.body != topic);
        let id: any;
        await client.mutate({
            mutation: SELECT_TOPIC,
            variables: {
                type: 'general_task_1',
                id: !editedGeneratedTopic && essayTopic?.body === topic || essayTopic?.body === topic ? essayTopic?.id : null,
                body: !essayTopic || essayTopic?.body != topic ? topic : null
            }
        }).then(async (res) => {
            id = res.data.selectTopic.id as string;
        }).catch(async (err) => {
            await console.log(err);
            id = null;
        });
        return id;
    }

    //-------------------------------------------------------------------ass new essay
    async function AddNewEssay(topic: string, body: string) {
        changeLoading(true);
        const id = await SelectTopic(topic);
        console.log(id);
        changeLoading(false);

        if (id != null) {
            changeTabBarLoc(true);
            setTimeout(() => {
                changeEndAnimation(true);
                changeFirstEssayLoading(true);
            }, 1000);
            await client.mutate({
                mutation: ADD_ESSAY,
                variables: {
                    id: id as string,
                    body: body
                }
            }).then(async (res) => {
                await GetUserEssaies(id);
                changeFirstEssayLoading(false);
                GetTopicsList('general_task_1')
            }).catch((err) => {
                console.log('add new essay error : ', err);
            })
        };
    }

    React.useEffect(() => {
        if (topic) {
            changeTopic(topic);
            GetUserEssaies(topic.id as string);
        }
    });

    return <Formik
        initialValues={{
            topic: essayTopic ? essayTopic.body : '',
            body: ''
        }}
        // validationSchema={WritingValidationSchema}
        enableReinitialize
        onSubmit={async (values) => {
            await AddNewEssay(values.topic, values.body);
        }}>{({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            handleChange
        }) => (
            <form
                className={'col-12 ' + styles.writingContainer}
                onSubmit={handleSubmit}>

                {
                    loading ?
                        <Loading style={{ height: 750, minHeight: 0 }} />
                        :
                        <div className={styles.writingForm}>

                            <SelectComponents values={[
                                { title: 'Essay', active: false, lock: false },
                                { title: 'Score', active: false, lock: false },
                                { title: 'Analysis', active: false, lock: true },
                                { title: 'Recommendations', active: false, lock: true },
                                { title: 'WWAI Tutor', active: false, lock: true }
                            ]} selectedItem={0} className={styles.topSelect} />

                            <div className={styles.wriritngTitle}>Gen Task 1</div>

                            <div className={styles.writingSecondTitle}>
                                You should spend about 20 minutes on this task
                            </div>

                            <div className={styles.writingInputTitle}>Write about following topic :</div>
                            {
                                topic ?
                                    <div className={styles.selectedTopcCard}><Text text={topic.body} /></div>
                                    : generateWritingTopicLoading ?
                                        <Loading style={{ height: 250, minHeight: 0 }} />
                                        :
                                        <div className={styles.topicInputContainer}>
                                            <Input
                                                style={{ width: '70%' }}
                                                className={styles.topicInput}
                                                onChange={handleChange}
                                                placeHolder="Type your topic here..."
                                                textarea
                                                textarea_name='topic'
                                                textarea_value={values.topic}
                                                textarea_error={errors.topic && touched.topic && errors.topic}
                                            />
                                            <button
                                                onClick={() => {
                                                    changeGenerateWriting(true);
                                                    GenerateTopic();
                                                }}
                                                type="button" className={styles.generateButton}>
                                                <Reload className={styles.reloadIconResponsive} />Generate
                                            </button>

                                            {
                                                generateWriting &&
                                                <button
                                                    onClick={() => changeEditedGeneratedTopic(true)}
                                                    className={styles.editButton}>
                                                    <div><MdEdit className={styles.editIconResponsive} style={{ fontSize: 40 }} /></div>
                                                </button>
                                            }

                                        </div>
                            }

                            <div className={styles.writingInputTitle}>Write at least 150 words.</div>

                            <div className={styles.bodyInputContainer}>
                                <Input
                                    className={styles.topicInput}
                                    onChange={handleChange}
                                    placeHolder="Type here..."
                                    textarea
                                    textarea_name='body'
                                    textarea_value={values.body}
                                    textarea_error={errors.body && touched.body && errors.body}
                                />
                                <button
                                    type="submit"
                                    className={styles.scoreButton}>
                                    <div>
                                        Score
                                    </div>
                                </button>

                            </div>
                        </div>
                }

                {endAnimation && firstEssayLoading &&
                    <WritingDataCard essay={'loading'} />
                }

                {
                    essaies.map((essay, index) => <WritingDataCard key={index} essay={essay} />)
                }

            </form>
        )}
    </Formik >;
};

const tabBarItems = [
    {
        title: 'Essay',
        active: true
    },
    {
        title: 'Score',
        active: true
    },
    {
        title: 'Analysis',
        active: true
    },
    {
        title: 'Recommendations',
        active: false
    },
    {
        title: 'WWAI Tutor',
        active: false
    },
]

const WritingDataCard: React.FC<{ essay: any }> = ({ essay }) => {
    const [writingCardStep, changeWritingCardStep] = React.useState<number>(1);

    const handleClick = async (event: any) => {
        event.preventDefault();
        const { sessionId } = await fetch('/api/checkout/session', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ quantity: 1 })
        }).then(res => res.json())
        const stripe = await stripePromise;
        if (stripe) {
            const { error } = await stripe.redirectToCheckout({
                sessionId
            });
            console.log('stripe error : ', error);
        }
    }

    return <div className={styles.writingDataCard}>
        <div className={styles.writingDataTabBarCard}>
            {
                tabBarItems.map((item, index) =>
                    <div
                        onClick={() => {
                            changeWritingCardStep(index);
                        }}
                        style={!item.active ? { cursor: 'context-menu' } : {}}
                        className={writingCardStep === index ? styles.activeTopTabBarItemCard + ' ' + styles.topTabBarItemCard
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
            { title: 'Essay', active: true, lock: false },
            { title: 'Score', active: true, lock: false },
            { title: 'Analysis', active: false, lock: true },
            { title: 'Recommendations', active: false, lock: true },
            { title: 'WWAI Tutor', active: false, lock: true }
        ]}
            selectedItem={writingCardStep} className={styles.writingCardSelect} onChange={changeWritingCardStep} />

        {
            essay === 'loading' ?
                <div className={styles.writingEssayCard}>
                    <Loading style={{ height: 390, minHeight: 0 }} />
                </div>
                : writingCardStep === 0 ?
                    <div className={styles.writingEssayCard}>
                        {/* <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div> */}
                        <div className={styles.writingEssayText}>
                            <Text text={essay.essay} />
                        </div>
                        <button
                            type="button"
                            aria-label="edit button"
                            className={styles.editWritingButton}>
                            <div className={styles.responsiveEditWritingButton}> <MdEdit className={styles.editWritingButtonIcon} /></div>
                        </button>
                    </div>
                    : writingCardStep === 1 ?
                        <div
                            className={styles.writingScoreCard}>
                            <div className={styles.writingScoreDate}>JAN 18</div>
                            <div className={styles.writingScoresContainer}>
                                <div>
                                    <div className={styles.writingScoreItemCard}>Task Achievement: {essay.taskAchievementScore}</div>
                                    <div className={styles.writingScoreItemCard}>Coherence & Cohesion: {essay.coherenceAndCohesionScore}</div>
                                    <div className={styles.writingScoreItemCard}>Lexical resource: {essay.lexicalResourceScore}</div>
                                    <div className={styles.writingScoreItemCard}>Grammatical Range and accuracy: {essay.grammaticalRangeAndAccuracyScore}</div>
                                </div>

                                <div className={styles.sliderContainer}>
                                    <Slider value={Number(((essay.taskAchievementScore + essay.coherenceAndCohesionScore + essay.lexicalResourceScore + essay.grammaticalRangeAndAccuracyScore) / 4).toFixed(1))} total={9} />
                                </div>
                            </div>
                            <div className={styles.writingScoreText}>
                                Good user<br />
                                Has operational command of the language, though with occasional inaccuracies, inappropriacies and misunderstandings in some situations. Generally handles complex language well and understands detailed reasoning.
                            </div>
                            <div className={styles.analusisButtonContainer}>
                                <button
                                    type="button"
                                    aria-label="anausis button"
                                    // onClick={(e) => handleClick(e)}
                                    onClick={() => {
                                        changeWritingCardStep(2);
                                    }}
                                    className={styles.analusisButton}>
                                    Analysis
                                </button>
                            </div>
                        </div>
                        :
                        <div
                            className={styles.writingScoreCard}>
                            <div className={styles.writingScoreDate}>JAN 18</div>
                            <div className={styles.writingScoresContainer}>
                                <div>
                                    <div className={styles.writingScoreItemCard}>Task Achievement Summery: <br /><span>{essay.taskAchievementSummery}</span></div>
                                    <div className={styles.writingScoreItemCard}>Coherence & Cohesion Summery: <br /><span>{essay.coherenceAndCohesionSummery}</span></div>
                                    <div className={styles.writingScoreItemCard}>Lexical resource summery:<br /><span> {essay.lexicalResourceSummery}</span></div>
                                    <div className={styles.writingScoreItemCard}>Grammatical Range and accuracy summery:<br /><span> {essay.grammaticalRangeAndAccuracySummery}</span></div>
                                </div>
                            </div>
                        </div>

        }

    </div >
};

export default GeneralTask1;