/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '@/config/applloAuthorizedClient';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Typewriter from 'typewriter-effect';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

//--------------------------------------styles
import styles from './task.module.css';

//--------------------------------------components
import {
    ADD_ESSAY, DELETE_ESSAY, GET_RANDOM_GENERAL_TASK1_WRITING,
    GET_RANDOM_GENERAL_TASK2_WRITING, SCORE_COHERENCE, SCORE_GRAMMATICAL,
    SCORE_LEXICAL, SCORE_TASK_RESPONSE, SELECT_TOPIC
} from "@/config/graphql";
import Loading from "@/components/loading/loading";
import EssayCard from "@/components/essayCard/essayCard";
const Input = lazy(() => import('@/components/input/input'));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));
import { CountWords, SplitText } from "@/components/Untitled";
const Text = lazy(() => import("@/components/text/text"));

//--------------------------------------icons
import { Reload } from "../../../../../public";
import { MdEdit } from 'react-icons/md';

//--------------------------------------types
import { Essay } from '../../../../../types/essay';

type topic = {
    id: string,
    body: string,
    type: string
}

type _props = {
    changeTabBarLoc: any
    changeEndAnimation: any,
    endAnimation: boolean,
    topic?: topic,
    essaies: Essay[],
    GetUserEssaies: any,
    MoreEssaies: boolean,
    changeMoreEssaies: any,
    setEssaies: any,
    handleNewTopic: any,
    divRef?: any,
    type: string
}

const Task: React.FC<_props> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef, type }) => {

    return <>
        {
            type === 'academic_task_1' ?
                <AcademicTask />
                :
                <GeneralTask changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={topic}
                    essaies={essaies} GetUserEssaies={GetUserEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} setEssaies={setEssaies}
                    handleNewTopic={handleNewTopic} divRef={divRef} type={type} />
        }
    </>
};

export default Task;

const GeneralTask: React.FC<_props> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef, type }) => {

    const [generateWriting, changeGenerateWriting] = React.useState<boolean>(false);
    const [changeInput, setChangeInput] = React.useState<boolean>(false);
    const [endTyping, changeEndTyping] = React.useState<boolean>(topic ? true : false);
    const [cursor, changeCursor] = React.useState<string>('|');
    const [loading, changeLoading] = React.useState<boolean>(false);
    const [essayLoading, changeEssayLoading] = React.useState<boolean>(false);
    const [deleteLoading, changeDeleteLoading] = React.useState<boolean>(false);
    const [editedGeneratedTopic, changeEditedGeneratedTopic] = React.useState<boolean>(false);
    const [generateWritingTopicLoading, changeGenerateWritingTopicLoading] = React.useState<boolean>(false);
    const [generatedTopic, changeGeneratedTopic] = React.useState<topic>();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalContent, changeModalContent] = React.useState<string>('Tr again!');
    const [modalTitle, changeModalTitle] = React.useState<string>('Add essay error');
    const [currentId, changeCcurrentId] = React.useState<string | null>(null);

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    //-----------------------------------------------------------------generate topic
    async function GenerateTopic(setFieldValue: any) {
        changeGenerateWritingTopicLoading(true);
        await client.query({
            query: type === 'general_task_1' ? GET_RANDOM_GENERAL_TASK1_WRITING : GET_RANDOM_GENERAL_TASK2_WRITING,
            fetchPolicy: "no-cache"
        }).then(async (res) => {
            await changeGeneratedTopic({ id: res.data.getRandomWriting.id, body: res.data.getRandomWriting.body, type: res.data.getRandomWriting.type });
            setFieldValue('topic', res.data.getRandomWriting.body);
            changeGenerateWritingTopicLoading(false);
        }).catch(async (err) => {
            await changeModalTitle('Generate topic error');
            await changeModalContent(JSON.stringify(err.message));
            changeGenerateWritingTopicLoading(false);
            showModal();
        });
    }

    //------------------------------------------------------------------select essay topic
    async function SelectTopic(topic: string): Promise<string | null> {
        let id: any;
        await client.mutate({
            mutation: SELECT_TOPIC,
            variables: {
                type: type,
                id: !editedGeneratedTopic && generatedTopic?.body === topic || generatedTopic?.body === topic ? generatedTopic?.id : null,
                body: !generatedTopic || generatedTopic?.body != topic ? topic : null
            }
        }).then(async (res) => {
            id = res.data.selectTopic.id as string;
            changeCcurrentId(id);
            handleNewTopic(res.data.selectTopic);
        }).catch(async (err) => {
            await changeModalTitle('Select topic error');
            await changeModalContent(JSON.stringify(err.message));
            changeLoading(false);
            showModal();
            id = null;
        });
        return id;
    }


    async function GetScores(essaies: Essay[]) {
        let newEssay: Essay[] = essaies;
        let score: number = 0;
        await Promise.all([
            client.mutate({
                mutation: SCORE_TASK_RESPONSE,
                variables: {
                    id: newEssay[0].id
                }
            }).then(async (res) => {
                newEssay[0].taskAchievementScore = res.data.scoreTaskResponse.taskAchievementScore;
                newEssay[0].taskAchievementSummery = res.data.scoreTaskResponse.taskAchievementSummery;
                score = score + res.data.scoreTaskResponse.taskAchievementScore;
            }),

            client.mutate({
                mutation: SCORE_COHERENCE,
                variables: {
                    id: newEssay[0].id
                }
            }).then(async (res) => {
                newEssay[0].coherenceAndCohesionScore = res.data.scoreCoherence.coherenceAndCohesionScore;
                newEssay[0].coherenceAndCohesionSummery = res.data.scoreCoherence.coherenceAndCohesionSummery;
                score = score + res.data.scoreCoherence.coherenceAndCohesionScore;
            }),

            client.mutate({
                mutation: SCORE_LEXICAL,
                variables: {
                    id: newEssay[0].id
                }
            }).then(async (res) => {
                newEssay[0].lexicalResourceScore = res.data.scoreLexical.lexicalResourceScore;
                newEssay[0].lexicalResourceSummery = res.data.scoreLexical.lexicalResourceSummery;
                score = score + res.data.scoreLexical.lexicalResourceScore;
            }),

            client.mutate({
                mutation: SCORE_GRAMMATICAL,
                variables: {
                    id: newEssay[0].id
                }
            }).then(async (res) => {
                newEssay[0].grammaticalRangeAndAccuracyScore = res.data.scoreGrammatical.grammaticalRangeAndAccuracyScore;
                newEssay[0].grammaticalRangeAndAccuracySummery = res.data.scoreGrammatical.grammaticalRangeAndAccuracySummery;
                score = score + res.data.scoreGrammatical.grammaticalRangeAndAccuracyScore;
            }),
        ]).catch(async (err) => {
            await changeModalTitle('Get essay score error');
            await changeModalContent(JSON.stringify(err.message));
            showModal();
        }).then(() => {
            newEssay[0].overallBandScore = score / 4;
            if (!newEssay[0].taskAchievementScore) {
                newEssay[0].taskAchievementScore = -1;
                newEssay[0].taskAchievementSummery = '';
            };
            if (!newEssay[0].coherenceAndCohesionScore) {
                newEssay[0].coherenceAndCohesionScore = -1;
                newEssay[0].coherenceAndCohesionSummery = '';
            };
            if (!newEssay[0].grammaticalRangeAndAccuracyScore) {
                newEssay[0].grammaticalRangeAndAccuracyScore = -1;
                newEssay[0].grammaticalRangeAndAccuracySummery = '';
            };
            if (!newEssay[0].lexicalResourceScore) {
                newEssay[0].lexicalResourceScore = -1;
                newEssay[0].lexicalResourceSummery = '';
            };
            setEssaies(newEssay);
            handleNewTopic();
        })
    }

    //-------------------------------------------------------------------add new essay
    async function AddNewEssay(topic: string, body: string) {
        changeLoading(true);
        setChangeInput(false);
        let id: any;
        if (currentId != null) {
            id = currentId;
        }
        else
            id = await SelectTopic(topic);

        await changeLoading(false);

        if (id != null) {
            changeEssayLoading(true);
            changeTabBarLoc(true);
            setTimeout(() => {
                changeEndAnimation(true);
                // changeFirstEssayLoading(true);
            }, 1000);
            await client.mutate({
                mutation: ADD_ESSAY,
                variables: {
                    id: id as string,
                    body: body
                }
            }).then(async (res) => {
                await setEssaies([{
                    id: res.data.finishEssay.id,
                    essay: res.data.finishEssay.essay,
                    date: res.data.finishEssay.date

                }, ...essaies]);
                changeEssayLoading(false);
                await GetScores([{
                    id: res.data.finishEssay.id,
                    essay: res.data.finishEssay.essay,
                    date: res.data.finishEssay.date

                }, ...essaies]);
                changeCcurrentId(id);

            }).catch(async (err) => {
                await changeModalTitle('Add essay error');
                await changeModalContent(JSON.stringify(err.message));
                changeLoading(false);
                showModal();
            })
        };
    }

    //-------------------------------------------------------------------delete essay
    async function DeleteEssay(id: string) {
        changeDeleteLoading(true);
        await client.mutate({
            mutation: DELETE_ESSAY,
            variables: {
                id: id
            }
        }).then(async (res) => {
            changeDeleteLoading(false);
            setEssaies(essaies.filter(item => item.id !== id));
        }).catch(async (err) => {
            await changeModalTitle('Delete essay error');
            await changeModalContent(JSON.stringify(err.message));
            changeDeleteLoading(false);
            showModal();
        });
    }

    React.useEffect(() => {
        if (topic) {
            changeCcurrentId(topic.id);
        } else if (currentId == null) {
            changeMoreEssaies(false);
        }
    });

    const EssayValidationSchema = Yup.object().shape({
        topic: Yup
            .string()
            .required('Topic is required!'),
    });

    return <Formik
        initialValues={{
            topic: generatedTopic ? generatedTopic.body : '',
            body: ''
        }}
        // validationSchema={EssayValidationSchema}
        enableReinitialize
        onSubmit={async (values, { resetForm }) => {
            await AddNewEssay(values.topic, values.body);
            resetForm();
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
                        <Loading style={{ height: 780, minHeight: 0 }} />
                        :
                        <div className={styles.writingForm}>
                            <SelectComponents values={[
                                { title: 'Essay', active: false, lock: false },
                                { title: 'Score', active: false, lock: false },
                                { title: 'Analysis', active: false, lock: true },
                                { title: 'Recommendations', active: false, lock: true },
                                { title: 'WWAI Tutor', active: false, lock: true }
                            ]} selectedItem={0} className={styles.topSelect} />

                            <div className={styles.wriritngTitle}>{topic === undefined ? type == 'general_task_1' ? 'Gen Task 1' : 'Task 2'
                                : topic.type == 'general_task_1' ? 'Gen Task 1' : 'Task 2'}

                                {
                                    changeInput &&
                                    <CountdownCircleTimer
                                        size={75}
                                        strokeWidth={8}
                                        isPlaying
                                        duration={topic === undefined ? type == 'general_task_1' ? 1200 : 2400
                                            : topic.type == 'general_task_1' ? 1200 : 2400}
                                        colors={['#004777', '#F7B801', '#A30000', '#A30000']}
                                        colorsTime={[7, 5, 2, 0]}
                                    >
                                        {({ remainingTime }) => <div style={{ fontSize: 14 }}>{Math.round(remainingTime / 60) + ' min'}</div>}
                                    </CountdownCircleTimer>
                                }

                            </div>

                            <div className={styles.writingSecondTitle}>
                                You should spend about {topic === undefined ? type == 'general_task_1' ? '20' : '40'
                                    : topic.type == 'general_task_1' ? '20' : '40'
                                } minutes on this task
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
                                                {
                                                    generateWriting && !editedGeneratedTopic ?
                                                        <div className={styles.generatedWritingCard}>

                                                            <Typewriter
                                                                options={{
                                                                    delay: 0,
                                                                    // cursor: cursor
                                                                    // cursorClassName: endTyping ? 'Typewriter__cursor ' + styles.cursor : 'Typewriter__cursor'
                                                                }}
                                                                onInit={(typewriter) => {
                                                                    JSON.stringify(SplitText(values.topic)).slice(1, JSON.stringify(SplitText(values.topic)).length - 1).split(/(\s)/).map((str: any, index: number) => {
                                                                        if (index % 10 !== 0) {
                                                                            typewriter.typeString(str)
                                                                                .pauseFor(100);
                                                                        } else {
                                                                            typewriter.typeString(str)
                                                                                .pauseFor(1000);
                                                                        }
                                                                        typewriter.start();
                                                                    });
                                                                    typewriter.callFunction(() => {
                                                                        changeEndTyping(true);
                                                                        changeCursor(' ')
                                                                    })
                                                                }}

                                                            />



                                                        </div>
                                                        :
                                                        <Input
                                                            style={{ width: '70%' }}
                                                            className={styles.topicInput}
                                                            onChange={handleChange}
                                                            placeHolder="Type your topic here..."
                                                            secondError
                                                            textarea
                                                            textarea_name='topic'
                                                            textarea_value={values.topic}
                                                            textarea_error={errors.topic && touched.topic && errors.topic}
                                                        />
                                                }
                                                <button
                                                    aria-label="edit tipic"
                                                    onClick={() => {
                                                        setChangeInput(false);
                                                        changeEndTyping(false);
                                                        changeEditedGeneratedTopic(false);
                                                        changeGenerateWriting(true);
                                                        GenerateTopic(setFieldValue);
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
                                                        aria-label="edit topic"
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

                            <div className={styles.writingInputTitle}>Write at least  {topic === undefined ? type === 'general_task_1' ? '150' : '250'
                                : topic.type == 'general_task_1' ? '150' : '250'} words.</div>

                            <div className={styles.bodyInputContainer}>
                                <Input
                                    disable={!endTyping}
                                    className={styles.topicInput}
                                    onChange={(e: any) => {
                                        if (!changeInput)
                                            setChangeInput(true);
                                        handleChange(e);
                                    }}
                                    placeHolder={topic === undefined ? type === 'general_task_1' ? 'Dear...' : "Type here..." :
                                        topic.type == 'general_task_1' ? 'Dear...' : "Type here..."
                                    }
                                    secondError
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
                            {
                                changeInput &&
                                <div className={styles.wordsCount}>
                                    {CountWords(values.body, true)}
                                </div>
                            }
                        </div>
                }

                {/* {endAnimation && firstEssayLoading ?
                    <EssayCard loading={true} />
                    :
                    <></>
                } */}

                {
                    deleteLoading ?
                        <Loading style={{ height: 50, minHeight: 0 }} />
                        : endAnimation &&
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={() => GetUserEssaies(currentId)}
                            hasMore={MoreEssaies}
                            loader={<Loading style={{ height: 50, minHeight: 0 }} />}
                            useWindow={false}
                            key={0}
                        >
                            {
                                essaies.map((essay, index) => <EssayCard key={index} essay={essay} setFieldValue={setFieldValue}
                                    divRef={divRef} handleDelete={DeleteEssay} loading={essayLoading} setEssaies={setEssaies} essaies={essaies} />)
                            }
                        </InfiniteScroll>
                }

                <Modal
                    footer={null}
                    title={modalTitle} open={isModalOpen} onCancel={handleCancel}>
                    <div className={styles.modalCard}> {modalContent}</div>
                </Modal>

            </form>
        )}
    </Formik >;
};

const AcademicTask: React.FC<{}> = () => {
    return <div>
        hihi
    </div>
};
