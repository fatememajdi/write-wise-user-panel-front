/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '@/config/applloAuthorizedClient';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

//--------------------------------------styles
import styles from './task.module.css';

//--------------------------------------components
import { ADD_ESSAY, DELETE_ESSAY, GET_RANDOM_GENERAL_TASK1_WRITING, GET_RANDOM_GENERAL_TASK2_WRITING, SCORE_COHERENCE, SCORE_GRAMMATICAL, SCORE_LEXICAL, SCORE_TASK_RESPONSE, SELECT_TOPIC } from "@/config/graphql";
import Loading from "@/components/loading/loading";
import EssayCard from "@/components/essayCard/essayCard";
const Input = lazy(() => import('@/components/input/input'));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));
const Text = lazy(() => import("@/components/text/text"));

//--------------------------------------icons
import { Reload } from "../../../../../public";
import { MdEdit } from 'react-icons/md';

//--------------------------------------types
import { Essay } from '../../../../../types/essay';

interface topic {
    id: string,
    body: string
}

interface _props {
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
    const [loading, changeLoading] = React.useState<boolean>(false);
    const [deleteLoading, changeDeleteLoading] = React.useState<boolean>(false);
    // const [firstEssayLoading, changeFirstEssayLoading] = React.useState<boolean>(false);
    const [editedGeneratedTopic, changeEditedGeneratedTopic] = React.useState<boolean>(false);
    const [generateWritingTopicLoading, changeGenerateWritingTopicLoading] = React.useState<boolean>(false);
    const [generatedTopic, changeGeneratedTopic] = React.useState<topic>();
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalContent, changeModalContent] = React.useState<string>('Tr again!');
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
            query: type === 'general_task_1' ? GET_RANDOM_GENERAL_TASK1_WRITING : GET_RANDOM_GENERAL_TASK2_WRITING
        }).then(async (res) => {
            await changeGeneratedTopic({ id: res.data.getRandomWriting.id, body: res.data.getRandomWriting.body });
            setFieldValue('topic', res.data.getRandomWriting.body);
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
                type: type,
                id: !editedGeneratedTopic && generatedTopic?.body === topic || generatedTopic?.body === topic ? generatedTopic?.id : null,
                body: !generatedTopic || generatedTopic?.body != topic ? topic : null
            }
        }).then(async (res) => {
            id = res.data.selectTopic.id as string;
            changeCcurrentId(id);
            handleNewTopic(res.data.selectTopic);
        }).catch(async (err) => {
            await changeModalContent('try again!');
            showModal();
            await console.log(err);
            id = null;
        });
        return id;
    }


    async function GetScores(essaies: Essay[]) {
        let newEssay: Essay[] = essaies;
        await Promise.all([
            client.mutate({
                mutation: SCORE_TASK_RESPONSE,
                variables: {
                    id: newEssay[0].id
                }
            }).then(async (res) => {
                newEssay[0].taskAchievementScore = res.data.scoreTaskResponse.taskAchievementScore;
                newEssay[0].taskAchievementSummery = res.data.scoreTaskResponse.taskAchievementSummery;
                newEssay[0].overallBandScore = res.data.scoreTaskResponse.overallBandScore;
            }),

            client.mutate({
                mutation: SCORE_COHERENCE,
                variables: {
                    id: newEssay[0].id
                }
            }).then(async (res) => {
                newEssay[0].coherenceAndCohesionScore = res.data.scoreCoherence.coherenceAndCohesionScore;
                newEssay[0].coherenceAndCohesionSummery = res.data.scoreCoherence.coherenceAndCohesionSummery;
                newEssay[0].overallBandScore = res.data.scoreCoherence.overallBandScore;
            }),

            client.mutate({
                mutation: SCORE_LEXICAL,
                variables: {
                    id: newEssay[0].id
                }
            }).then(async (res) => {
                newEssay[0].lexicalResourceScore = res.data.scoreLexical.lexicalResourceScore;
                newEssay[0].lexicalResourceSummery = res.data.scoreLexical.lexicalResourceSummery;
                newEssay[0].overallBandScore = res.data.scoreLexical.overallBandScore;
            }),

            client.mutate({
                mutation: SCORE_GRAMMATICAL,
                variables: {
                    id: newEssay[0].id
                }
            }).then(async (res) => {
                newEssay[0].grammaticalRangeAndAccuracyScore = res.data.scoreGrammatical.grammaticalRangeAndAccuracyScore;
                newEssay[0].grammaticalRangeAndAccuracySummery = res.data.scoreGrammatical.grammaticalRangeAndAccuracySummery;
                newEssay[0].overallBandScore = res.data.scoreGrammatical.overallBandScore;
            }),
        ]).catch((err) => {
            console.log('get essay score error : ', err);
        }).then(() => {
            setEssaies(newEssay);
        })
    }

    //-------------------------------------------------------------------add new essay
    async function AddNewEssay(topic: string, body: string) {
        changeLoading(true);
        let id: any;
        if (currentId != null) {
            id = currentId;
        }
        else
            id = await SelectTopic(topic);

        if (id != null) {
            await client.mutate({
                mutation: ADD_ESSAY,
                variables: {
                    id: id as string,
                    body: body
                }
            }).then(async (res) => {
                // changeFirstEssayLoading(false);
                setEssaies([{
                    id: res.data.finishEssay.id,
                    essay: res.data.finishEssay.essay,
                    date: res.data.finishEssay.date

                }, ...essaies]);
                changeLoading(false);
                changeTabBarLoc(true);
                setTimeout(() => {
                    changeEndAnimation(true);
                    // changeFirstEssayLoading(true);
                }, 1000);
                await GetScores([{
                    id: res.data.finishEssay.id,
                    essay: res.data.finishEssay.essay,
                    date: res.data.finishEssay.date

                }, ...essaies]);
                changeCcurrentId(id);
            }).catch(async (err) => {
                console.log('add new essay error : ', err);
                changeLoading(false);
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
        }).catch((err) => {
            console.log("delete essay error : ", err);
            changeDeleteLoading(false);
        });
    }

    React.useEffect(() => {
        if (topic) {
            changeCcurrentId(topic.id);
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
        onSubmit={async (values, { resetForm }) => {
            await AddNewEssay(values.topic, values.body);
            resetForm();
        }}>{({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            handleChange,
            resetForm
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

                            <div className={styles.wriritngTitle}>{type === 'general_task_1' ? 'Gen Task 1' : 'Task 2'} </div>

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
                                    divRef={divRef} handleDelete={DeleteEssay} />)
                            }
                        </InfiniteScroll>
                }

                <Modal
                    footer={null}
                    title="Add essay error" open={isModalOpen} onCancel={handleCancel}>
                    <div className={styles.modalCard}> {modalContent}</div>
                </Modal>

            </form>
        )}
    </Formik >;
};

const AcademicTask: React.FC<{}> = () => {
    return <div></div>
};
