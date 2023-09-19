/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '@/config/applloAuthorizedClient';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Typewriter from 'typewriter-effect';
// import { CountdownCircleTimer } from 'react-countdown-circle-timer'

//--------------------------------------styles
import styles from '../../../../styles/task.module.css';

//--------------------------------------components
import {
    ADD_ESSAY, DELETE_ESSAY, GET_OVERAL_SCORE, GET_RANDOM_GENERAL_TASK1_WRITING,
    GET_RANDOM_GENERAL_TASK2_WRITING, SCORE_COHERENCE, SCORE_GRAMMATICAL,
    SCORE_LEXICAL, SCORE_TASK_RESPONSE, SELECT_TOPIC
} from "@/config/graphql";
import Loading from "@/components/loading/loading";
import EssayCard from "@/components/essayCard/essayCard";
const Input = lazy(() => import('@/components/input/input'));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));
import { CountWords, SplitText } from "@/components/Untitled";
const Text = lazy(() => import("@/components/text/text"));
const Timer = lazy(() => import("@/components/timer/timer"));

//--------------------------------------icons
import { Reload } from "../../../../../public";
import { MdEdit } from 'react-icons/md';

//--------------------------------------types
import { Essay, tempEssay, SelectedTopicTempEssay } from '../../../../../types/essay';

type topic = {
    id: string,
    body: string,
    type: string
};

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
    type: string,
    targetRef: any,
    essay?: string
};


const GeneralTask: React.FC<_props> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic, essay,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef, type, targetRef }) => {

    let DivRef2: any;
    if (typeof document !== 'undefined')
        DivRef2 = document.getElementById('scrollDiv');
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
    async function GenerateTopic(setFieldValue: any, essay: string) {
        changeGenerateWritingTopicLoading(true);
        await client.query({
            query: GET_RANDOM_GENERAL_TASK1_WRITING,
            fetchPolicy: "no-cache"
        }).then(async (res) => {
            await changeGeneratedTopic({ id: res.data.getRandomWriting.id, body: res.data.getRandomWriting.body, type: res.data.getRandomWriting.type });
            setFieldValue('topic', res.data.getRandomWriting.body);
            ChangeTempTopic(essay, res.data.getRandomWriting.body, res.data.getRandomWriting.id);
            changeGenerateWritingTopicLoading(false);
        }).catch(async (err) => {
            await changeModalTitle('Generate topic error');
            await changeModalContent(JSON.stringify(err.message));
            changeGenerateWritingTopicLoading(false);
            showModal();
        });
    };

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
            changeGeneratedTopic({
                id: res.data.selectTopic.id,
                body: res.data.selectTopic.topic,
                type: res.data.selectTopic.type
            });
        }).catch(async (err) => {
            await changeModalTitle('Select topic error');
            await changeModalContent(JSON.stringify(err.message));
            changeLoading(false);
            showModal();
            id = null;
        });
        return id;
    };

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
        }).then(async () => {

            await client.query({
                query: GET_OVERAL_SCORE,
                variables: {
                    id: newEssay[0].id
                }
            }).then((res) => {
                newEssay[0].overallBandScore = res.data.getEssay.overallBandScore
            }).catch(() => {
                newEssay[0].overallBandScore = -1;
            });
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
    };

    //-------------------------------------------------------------------add new essay
    async function AddNewEssay(Topic: string, body: string) {
        changeEssayLoading(true);
        changeLoading(true);
        setChangeInput(false);
        let id: any;

        if (currentId != null) {
            id = currentId;
        } else
            id = await SelectTopic(Topic);

        await changeLoading(false);

        if (id != null) {
            changeTabBarLoc(true);
            setTimeout(() => {
                changeEndAnimation(true);
                // changeFirstEssayLoading(true);
            }, 1000);
            setTimeout(() => {
                DivRef2.scrollIntoView({ behavior: "smooth" });
            }, 1400);
            await client.mutate({
                mutation: ADD_ESSAY,
                variables: {
                    id: id as string,
                    body: body
                }
            }).then(async (res) => {

                let lastTemp = await localStorage.getItem('lastTempEssay');
                let t = await localStorage.getItem('tempsEssayList');
                let tempsLiset: SelectedTopicTempEssay[] = [];
                if (t) tempsLiset = JSON.parse(t);
                if (tempsLiset.findIndex(item => item.id === currentId) != -1) {
                    await localStorage.setItem('tempsEssayList', JSON.stringify(tempsLiset.filter(item => item.id !== tempsLiset[tempsLiset.findIndex(item => item.id === currentId)].id)));
                } else if (lastTemp) {
                    await localStorage.removeItem('lastTempEssay');
                } else {
                    await localStorage.removeItem('tempEssay');
                };

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
                console.log(err)
                await changeModalContent(JSON.stringify(err.message));
                changeLoading(false);
                showModal();
            })
        };
    };

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
    };

    //-------------------------------------------------------------------temp
    async function CreateTempEssay(essay: string, Topic: string) {
        let temp: tempEssay = { topic: { id: '', body: '', type: 'general_task_1' }, essay: '' };
        let oldestTemp = await localStorage.getItem('tempEssay');
        let t = await localStorage.getItem('tempsEssayList');
        let tempsList: SelectedTopicTempEssay[] = [];
        if (t) tempsList = JSON.parse(t);

        if (generatedTopic) {
            temp.topic = { id: generatedTopic.id as string, body: Topic, type: 'general_task_1' };
        } else {
            temp.topic = { id: '', body: Topic, type: 'general_task_1' }
        };
        temp.essay = essay;

        if (currentId) {
            if (tempsList.length === 0) {
                tempsList.push({ essay: essay, id: currentId });
            } else {
                if (tempsList.findIndex(item => item.id === currentId) === -1) {
                    tempsList.push({ essay: essay, id: currentId });
                } else {
                    tempsList[tempsList.findIndex(item => item.id === currentId)].essay = essay;
                }
            };
            localStorage.setItem('tempsEssayList', JSON.stringify(tempsList));
        } else if (oldestTemp) {
            console.log(JSON.parse(oldestTemp).topic.body === Topic);
            console.log(JSON.parse(oldestTemp).topic.body);
            console.log(JSON.parse(oldestTemp).topic.body );
            if (JSON.parse(oldestTemp).topic.body === Topic) {
                localStorage.setItem('tempEssay', JSON.stringify(temp));
            } else {
                localStorage.setItem('lastTempEssay', JSON.stringify(temp));
            }
        } else {
            localStorage.setItem('tempEssay', JSON.stringify(temp));
        };
    };

    async function ChangeTempTopic(essay: string, Topic: string, id?: string) {
        if (essay != '') {
            let temp: tempEssay = { topic: { id: '', body: '', type: 'general_task_1' }, essay: '' };
            temp.topic = { id: id ? id : '', body: Topic, type: 'general_task_1' }
            temp.essay = essay;
            localStorage.setItem('tempEssay', JSON.stringify(temp));
        }
    };

    async function ChackTopic() {
        if (topic && essay === '') {
            changeCcurrentId(topic.id);
            changeMoreEssaies(true);
        } else if (topic && essay !== '') {
            let temp = await localStorage.getItem('tempEssay');
            let t = await localStorage.getItem('tempsEssayList');
            let tempsLiset: SelectedTopicTempEssay[] = [];
            if (t)
                tempsLiset = JSON.parse(t);

            if (temp && topic.id === JSON.parse(temp).topic.id) {
                let tempTopic: topic = {
                    id: JSON.parse(temp).topic.id,
                    body: JSON.parse(temp).topic.body,
                    type: JSON.parse(temp).topic.type
                }
                changeGeneratedTopic(tempTopic);
                changeMoreEssaies(false);
            } else if (tempsLiset.findIndex(item => item.id === topic.id) != -1) {
                changeCcurrentId(topic.id);
                changeMoreEssaies(true);
            } else if (currentId == null) {
                changeMoreEssaies(false);
            }
        }
    };

    React.useEffect(() => {
        ChackTopic();
    }, []);

    const EssayValidationSchema = Yup.object().shape({
        topic: Yup
            .string()
            .required('Topic is required!'),
    });

    return <Formik
        initialValues={{
            topic: topic?.id === '' ? topic?.body : generatedTopic ? generatedTopic.body : '',
            body: essay ? essay : ''
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
                        <Loading style={{ height: 750, minHeight: 0 }} />
                        :
                        <div
                            ref={targetRef}
                            style={{ height: 'fit-content', minHeight: 700 }}
                            className={styles.writingForm}>
                            <SelectComponents values={[
                                { title: 'Essay', active: false, lock: false },
                                { title: 'Score', active: false, lock: false },
                                { title: 'Analysis', active: false, lock: true },
                                { title: 'Recommendations', active: false, lock: true },
                                { title: 'WWAI Tutor', active: false, lock: true }
                            ]} selectedItem={0} className={styles.topSelect} />

                            <div className={styles.wriritngTitle}>
                                Gen Task 1 Topic
                            </div>

                            <div className={styles.writingSecondTitle}>
                                You should spend about 20 minutes on this task.
                            </div>

                            <div className={styles.writingInputTitle}>Write about the following topic:</div>
                            {
                                topic && essay === '' ?
                                    < div className={styles.selectedTopcCard}><Text text={topic.body} /></div>
                                    : topic && essay != '' && currentId !== null ?
                                        < div className={styles.selectedTopcCard}><Text text={topic.body} /></div>
                                        : currentId != null ?
                                            <div className={styles.selectedTopcCard}><Text text={values.topic} /></div>
                                            : generateWritingTopicLoading ?
                                                <Loading style={{ height: 250, minHeight: 0 }} />
                                                :
                                                <div className={styles.topicInputContainer}>

                                                    {
                                                        generateWriting && !editedGeneratedTopic ?
                                                            <div
                                                                style={{ height: 250 }}
                                                                className={styles.generatedWritingCard}>
                                                                <Typewriter
                                                                    options={{
                                                                        delay: 0,
                                                                        wrapperClassName: styles.writerClassname
                                                                        // cursor: cursor
                                                                        // cursorClassName: endTyping ? 'Typewriter__cursor ' + styles.cursor : 'Typewriter__cursor'
                                                                    }}
                                                                    onInit={(typewriter) => {
                                                                        JSON.stringify(SplitText(values.topic)).slice(1, JSON.stringify(values.topic).length - 1).split(/(\s)/).map((str: any, index: number) => {
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
                                                                className={styles.topicInputsecond + ' ' + styles.topicInput}
                                                                onChange={(e: any) => {
                                                                    changeEndTyping(true);
                                                                    handleChange(e);
                                                                    ChangeTempTopic(values.body, e.target.value);
                                                                }}
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
                                                        onClick={async () => {
                                                            setChangeInput(false);
                                                            changeEndTyping(false);
                                                            changeEditedGeneratedTopic(false);
                                                            changeGenerateWriting(true);
                                                            await GenerateTopic(setFieldValue, values.body);
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

                            <div className={styles.writingInputTitle}>Write at least 150 words.
                                {
                                    changeInput &&
                                    <div className={styles.wordsCount}>
                                        {CountWords(values.body, true)}
                                    </div>
                                }
                            </div>

                            <div className={styles.bodyInputContainer}>
                                <Input
                                    disable={!endTyping}
                                    className={styles.topicInput}
                                    onChange={(e: any) => {
                                        if (!changeInput)
                                            setChangeInput(true);
                                        handleChange(e);
                                        CreateTempEssay(e.target.value, values.topic);
                                    }}
                                    placeHolder={'Dear...'}
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
                                <div className={styles.timer}>
                                    <Timer time={1200} />
                                </div>
                            }

                        </div>
                }
                <div
                    id="scrollDiv"
                >
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
                                        divRef={divRef} handleDelete={DeleteEssay} loading={essayLoading} setEssaies={setEssaies} essaies={essaies} topic={topic ? topic.body : values.topic} />)
                                }
                            </InfiniteScroll>
                    }
                </div>

                <Modal
                    footer={null}
                    title={modalTitle} open={isModalOpen} onCancel={handleCancel}>
                    <div className={styles.modalCard}> {modalContent}</div>
                </Modal>

            </form>
        )}
    </Formik >;
};

export default GeneralTask;