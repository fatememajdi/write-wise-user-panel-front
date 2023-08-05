/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import { loadStripe } from '@stripe/stripe-js';
import client from '@/config/applloAuthorizedClient';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';


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

//--------------------------------------types
import { Essay } from '../../../../types/essay';

interface topic {
    id: string,
    body: string
}

interface writingProps {
    changeTabBarLoc: any
    changeEndAnimation: any,
    endAnimation: boolean,
    topic?: topic,
    GetTopicsList: any,
    essaies: Essay[],
    GetUserEssaies: any,
    changePage: any,
    MoreEssaies: boolean,
    changeMoreEssaies: any,
    setEssaies: any
}

//---------------------------------------------------------------validation
const WritingValidationSchema = Yup.object().shape({
    topic: Yup.string(),
    body: Yup
        .string()
        .required('body is required!'),
});

const GeneralTask1: React.FC<writingProps> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic, essaies, GetUserEssaies, changePage, MoreEssaies, changeMoreEssaies, GetTopicsList, setEssaies }) => {

    const [generateWriting, changeGenerateWriting] = React.useState<boolean>(false);
    const [loading, changeLoading] = React.useState<boolean>(false);
    const [firstEssayLoading, changeFirstEssayLoading] = React.useState<boolean>(false);
    const [editedGeneratedTopic, changeEditedGeneratedTopic] = React.useState<boolean>(false);
    const [generateWritingTopicLoading, changeGenerateWritingTopicLoading] = React.useState<boolean>(false);
    const [essayTopic, changeTopic] = React.useState<topic>();
    const [generatedTopic, changeGeneratedTopic] = React.useState<topic>();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalContent, changeModalContent] = React.useState<string>('sdf');
    const [currentId, changeCcurrentId] = React.useState<string | null>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //-----------------------------------------------------------------generate topic
    async function GenerateTopic() {
        console.log('hiiii')
        changeGenerateWritingTopicLoading(true);
        await client.query({
            query: GET_RANDOM_GENERAL_TASK1_WRITING,
        }).then(async (res) => {
            await changeGeneratedTopic({ id: res.data.getRandomWriting.id, body: res.data.getRandomWriting.body })
            changeGenerateWritingTopicLoading(false);
        }).catch((err) => {
            console.log('get random writing error :  : ', err);
            changeGenerateWritingTopicLoading(false);
        });
    }

    //------------------------------------------------------------------select essay topic
    async function SelectTopic(topic: string): Promise<string | null> {
        let id: any;
        await client.mutate({
            mutation: SELECT_TOPIC,
            variables: {
                type: 'general_task_1',
                id: !editedGeneratedTopic && generatedTopic?.body === topic || generatedTopic?.body === topic ? generatedTopic?.id : null,
                body: !generatedTopic || generatedTopic?.body != topic ? topic : null
            }
        }).then(async (res) => {
            id = res.data.selectTopic.id as string;
            changeCcurrentId(id);
            if (generatedTopic)
                changeTopic({ id: generatedTopic.id, body: generatedTopic.body });

        }).catch(async (err) => {
            await changeModalContent('try again!');
            showModal();
            await console.log(err);
            id = null;
        });
        return id;
    }

    //-------------------------------------------------------------------ass new essay
    async function AddNewEssay(topic: string, body: string) {
        changeLoading(true);
        let id: any;
        if (currentId != null) {
            id = currentId;
        }
        else
            id = await SelectTopic(topic);
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
                await changePage(essaies.length + 1);
                console.log(res.data.addEssay);
                setEssaies([{
                    essay: res.data.addEssay.essay,
                    date: res.data.addEssay.date,
                    taskAchievementScore: res.data.addEssay.taskAchievementScore,
                    taskAchievementSummery: res.data.addEssay.taskAchievementSummery,
                    coherenceAndCohesionScore: res.data.addEssay.coherenceAndCohesionScore,
                    coherenceAndCohesionSummery: res.data.addEssay.coherenceAndCohesionSummery,
                    lexicalResourceScore: res.data.addEssay.lexicalResourceScore,
                    lexicalResourceSummery: res.data.addEssay.lexicalResourceSummery,
                    grammaticalRangeAndAccuracyScore: res.data.addEssay.grammaticalRangeAndAccuracyScore,
                    grammaticalRangeAndAccuracySummery: res.data.addEssay.grammaticalRangeAndAccuracySummery,
                }, ...essaies])
                changeCcurrentId(id);
                // await changeMoreEssaies(true);
                // await GetUserEssaies(id);
                await GetTopicsList();
                changeFirstEssayLoading(false);
            }).catch(async (err) => {
                console.log('add new essay error : ', err);
            })
        };
    }

    React.useEffect(() => {
        if (topic) {
            changeCcurrentId(topic.id);
            changeTopic(topic);
        } else if (currentId == null) {
            changeMoreEssaies(false);
        }
    });


    return <Formik
        initialValues={{
            topic: generatedTopic ? generatedTopic.body : '',
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
                                    : currentId != null ?
                                        <div className={styles.selectedTopcCard}><Text text={values.topic} /></div>
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
                                                    aria-label="edit tipic"
                                                    onClick={() => {
                                                        changeGenerateWriting(true);
                                                        GenerateTopic();
                                                    }}
                                                    type="button" className={styles.generateButton}>
                                                    <Reload style={{ marginTop: 8 }} className={styles.reloadIconResponsive} />
                                                    {
                                                        generatedTopic ? 'Regenereate' :
                                                            'Generate'
                                                    }
                                                </button>

                                                {
                                                    generateWriting &&
                                                    <button
                                                        aria-label="edit tipic"
                                                        type="button"
                                                        onClick={() => {
                                                            changeEditedGeneratedTopic(true);
                                                            setFieldValue('topic', '');
                                                        }}
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

                <InfiniteScroll
                    pageStart={0}
                    loadMore={() => GetUserEssaies(currentId)}
                    hasMore={MoreEssaies}
                    loader={<Loading style={{ height: 50, minHeight: 0 }} />}
                    useWindow={false}
                    key={0}
                >
                    {
                        essaies.map((essay, index) => <WritingDataCard key={index} essay={essay} />)
                    }
                </InfiniteScroll>


                <Modal
                    footer={null}
                    title="Add essay error" open={isModalOpen} onCancel={handleCancel}>
                    <div className={styles.modalCard}> {modalContent}</div>
                </Modal>

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