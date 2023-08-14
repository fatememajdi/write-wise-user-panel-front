/* eslint-disable @next/next/link-passhref */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import dynamic from 'next/dynamic';
import client from '@/config/applloAuthorizedClient';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';

//--------------------------------------styles
import styles from './essay.module.css';

//--------------------------------------components
import { ADD_ESSAY, DELETE_ESSAY, GET_RANDOM_GENERAL_TASK1_WRITING, SELECT_TOPIC } from "@/config/graphql";
import Loading from "@/components/loading/loading";
const Slider = dynamic(() => import("@/components/slider/slider"));
const Input = lazy(() => import('@/components/input/input'));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));
const Text = lazy(() => import("@/components/text/text"));
const DialogComponent = lazy(() => import("@/components/dialog/dialog"));

//--------------------------------------icons
import { Reload } from "../../../../public";
import { MdEdit } from 'react-icons/md';
import { Lock } from '../../../../public/dashboard';
import { AiOutlineDelete } from 'react-icons/ai';

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
    essaies: Essay[],
    GetUserEssaies: any,
    MoreEssaies: boolean,
    changeMoreEssaies: any,
    setEssaies: any,
    handleNewTopic: any,
    divRef?: any
}

//---------------------------------------------------------------validation
const WritingValidationSchema = Yup.object().shape({
    topic: Yup.string(),
    body: Yup
        .string()
        .required('body is required!'),
});

const GeneralTask1: React.FC<writingProps> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef }) => {

    const [generateWriting, changeGenerateWriting] = React.useState<boolean>(false);
    const [loading, changeLoading] = React.useState<boolean>(false);
    const [open, setOpen] = React.useState<boolean>(false);
    const [selectedId, changeSelectedId] = React.useState<string>('');
    const [deleteLoading, changeDeleteLoading] = React.useState<boolean>(false);
    const [firstEssayLoading, changeFirstEssayLoading] = React.useState<boolean>(false);
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
            query: GET_RANDOM_GENERAL_TASK1_WRITING
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
                type: 'general_task_1',
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

    //-------------------------------------------------------------------add new essay
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
                setEssaies([{
                    id: res.data.addEssay.id,
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
                    overallBandScore: res.data.addEssay.overallBandScore
                }, ...essaies]);
                changeCcurrentId(id);
                changeFirstEssayLoading(false);
            }).catch(async (err) => {
                console.log('add new essay error : ', err);
            })
        };
    }

    //-------------------------------------------------------------------delete essay
    async function DeleteEssay() {
        setOpen(false);
        changeDeleteLoading(true);
        await client.mutate({
            mutation: DELETE_ESSAY,
            variables: {
                id: selectedId
            }
        }).then(async (res) => {
            changeDeleteLoading(false);
            setEssaies(essaies.filter(item => item.id !== selectedId));
        }).catch((err) => {
            console.log("delete essay error : ", err);
            changeDeleteLoading(false);
        });
    }

    //-------------------------------------------------------------------dialog
    function handleClose() {
        setOpen(false);
    };

    async function handleDelete(id: string) {
        console.log(id);
        setOpen(true);
        changeSelectedId(id);
    };

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

                {endAnimation && firstEssayLoading &&
                    <WritingDataCard essay={'loading'} />
                }

                {
                    deleteLoading ?
                        <Loading style={{ height: 50, minHeight: 0 }} />
                        :
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={() => GetUserEssaies(currentId)}
                            hasMore={MoreEssaies}
                            loader={<Loading style={{ height: 50, minHeight: 0 }} />}
                            useWindow={false}
                            key={0}
                        >
                            {
                                essaies.map((essay, index) => <WritingDataCard key={index} essay={essay} setFieldValue={setFieldValue} divRef={divRef} handleDelete={handleDelete} />)
                            }
                        </InfiniteScroll>
                }

                <Modal
                    footer={null}
                    title="Add essay error" open={isModalOpen} onCancel={handleCancel}>
                    <div className={styles.modalCard}> {modalContent}</div>
                </Modal>

                <DialogComponent open={open} handleClose={handleClose} handleDelete={DeleteEssay} title="Delete Essay" dialog="Permanently delete the essay?" />
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
];

interface _props {
    essay: any,
    setFieldValue?: any,
    divRef?: any,
    handleDelete?: any
}

const WritingDataCard: React.FC<_props> = ({ essay, setFieldValue, divRef, handleDelete }) => {
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
                        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
                        <div className={styles.writingEssayText}>
                            <Text text={essay.essay} />
                        </div>
                        <div className={styles.essayButtonContainer}>
                            <button
                                onClick={() => handleDelete(essay.id)}
                                type="button"
                                aria-label="delete button"
                                className={styles.deleteWritingButton}>
                                <div className={styles.responsiveEditWritingButton}> <AiOutlineDelete className={styles.deleteWritingButtonIcon} /></div>
                            </button>
                            <button
                                onClick={() => {
                                    setFieldValue('body', essay.essay);
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
                    : writingCardStep === 1 ?
                        <div
                            className={styles.writingScoreCard}>
                            <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
                            <div className={styles.writingScoresContainer}>
                                <div>
                                    <div className={styles.writingScoreItemCard}>Task Achievement: {essay.taskAchievementScore}</div>
                                    <div className={styles.writingScoreItemCard}>Coherence & Cohesion: {essay.coherenceAndCohesionScore}</div>
                                    <div className={styles.writingScoreItemCard}>Lexical resource: {essay.lexicalResourceScore}</div>
                                    <div className={styles.writingScoreItemCard}>Grammatical Range and accuracy: {essay.grammaticalRangeAndAccuracyScore}</div>
                                </div>

                                <div className={styles.sliderContainer}>
                                    <Slider value={essay.overallBandScore} total={9} />
                                </div>
                            </div>
                            {/* <div className={styles.writingScoreText}>
                                Good user<br />
                                Has operational command of the language, though with occasional inaccuracies, inappropriacies and misunderstandings in some situations. Generally handles complex language well and understands detailed reasoning.
                            </div> */}
                            <div className={styles.analusisButtonContainer}>
                                <button
                                    type="button"
                                    aria-label="anausis button"
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
                            <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
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