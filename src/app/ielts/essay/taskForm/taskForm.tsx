/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import dynamic from "next/dynamic";
import { Formik } from 'formik';
import client from '@/config/applloAuthorizedClient';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Image from "next/image";
import ReactLoading from 'react-loading';
import toast from "react-hot-toast";
import * as Yup from 'yup';
import { Pixelify } from "react-pixelify";


//--------------------------------------styles
import styles from '../../../../styles/task.module.css';
import '../../../../styles/customMuiStyles.css';

//--------------------------------------components
import {
    ADD_ESSAY, DELETE_ESSAY, GET_RANDOM_WRITING, GET_RANDOM_WRITING_AC_TASK, SELECT_TOPIC
} from "@/config/graphql";
import Loading from "@/components/loading/loading";
import EssayCard from "@/components/essayCard/essayCard";
const Input = dynamic(() => import('@/components/input/input'));
const SelectComponents = dynamic(() => import('@/components/customSelect/customSelect'));
import { CheckCountWords, CountWords } from "@/components/Untitled";
const Text = dynamic(() => import("@/components/text/text"));
const SubTypeSelect = dynamic(() => import("@/components/subTypeSelect/subTypeSelect"));
const Writer = dynamic(() => import("@/components/writer/writer"));
const EssayProcessBar = dynamic(() => import("@/components/essayProcessBar/essayProcessBar"));

//--------------------------------------icons
import { Reload } from "@/../public";
import { IoMdImage } from 'react-icons/io';
import { MdEdit, MdCheck } from 'react-icons/md';

//--------------------------------------types
import { Essay, tempEssay, SelectedTopicTempEssay } from '../../../../../types/essay';
import { topic } from "../../../../../types/topic";

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
    essay?: string,
    GetScores: any
};

const TaskForm: React.FC<_props> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic, essay, GetScores,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef, type, targetRef }) => {
    let DivRef2: any;
    let DivRef3: any;
    if (typeof document !== 'undefined') {
        DivRef2 = document.getElementById('scrollDiv');
        DivRef3 = document.getElementById('essayScrollDiv');
    }
    const [generateWriting, changeGenerateWriting] = React.useState<boolean>(false);
    const [essayTime, changeEssayTime] = React.useState<number>(0);
    const [changeInput, setChangeInput] = React.useState<boolean>(false);
    const [topicLoading, setTopicLoading] = React.useState<boolean>(false);
    const [addEssayLoading, setAddEssayLoading] = React.useState<boolean>(false);
    const [typed, setTyped] = React.useState<boolean>(false);
    const [endTyping, changeEndTyping] = React.useState<boolean>(topic ? true : false);
    const [loading, changeLoading] = React.useState<boolean>(false);
    const [essayLoading, changeEssayLoading] = React.useState<boolean>(false);
    const [deleteLoading, changeDeleteLoading] = React.useState<boolean>(false);
    const [editedGeneratedTopic, changeEditedGeneratedTopic] = React.useState<boolean>(false);
    const [generateWritingTopicLoading, changeGenerateWritingTopicLoading] = React.useState<boolean>(false);
    const [generatedTopic, changeGeneratedTopic] = React.useState<topic>();
    const [currentId, changeCcurrentId] = React.useState<string | null>(null);
    const [showImage, changeShowImage] = React.useState<boolean>(false);
    const [modalImage, changeModalImage] = React.useState<string>();
    const [imagePixels, changeImagePixels] = React.useState<number>(1);

    const handleCancelImageModal = () => changeShowImage(false);

    async function handleSelectImage(url: string) {
        await changeModalImage(url);
        changeShowImage(true);
    };

    //-----------------------------------------------------------------generate topic
    async function GenerateTopic(setFieldValue: any, essay: string, subType: string) {
        changeGenerateWritingTopicLoading(true);
        await client.query({
            query: type === 'academic_task_1' ? GET_RANDOM_WRITING_AC_TASK : GET_RANDOM_WRITING,
            fetchPolicy: "no-cache",
            variables: {
                type: type,
                questionType: subType
            }
        }).then(async (res) => {
            changeImagePixels(15);
            await changeGeneratedTopic({
                id: res.data.getRandomWriting.id, body: res.data.getRandomWriting.body,
                type: res.data.getRandomWriting.type, subType: res.data.getRandomWriting.questionType,
                visuals: res.data.getRandomWriting.visuals
            });
            setFieldValue('topic', res.data.getRandomWriting.body);
            setFieldValue('subType', res.data.getRandomWriting.questionType);
            ChangeTempTopic(essay, res.data.getRandomWriting.body, res.data.getRandomWriting.id);
            changeGenerateWritingTopicLoading(false);
        }).catch(async (err) => {
            toast.error(err.message);
            changeGenerateWritingTopicLoading(false);
        });
    };

    //------------------------------------------------------------------select essay topic
    async function SelectTopic(topic: string): Promise<string | null> {
        setTopicLoading(true);
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
            setAddEssayLoading(true);
            DivRef3.scrollIntoView({ behavior: "smooth" });
        }).catch(async (err) => {
            toast.error(err.message);
            changeLoading(false);
            id = null;
        });
        setTopicLoading(false);
        return id;
    };

    //-------------------------------------------------------------------add new essay
    async function AddNewEssay(Topic: string, body: string, resetForm: any) {
        // changeEssayLoading(true);
        // changeLoading(true);
        setChangeInput(false);
        let id: any;

        if (currentId != null) {
            id = currentId;
        } else
            id = await SelectTopic(Topic);

        await changeLoading(false);

        if (id != null) {
            await setAddEssayLoading(true);
            await client.mutate({
                mutation: ADD_ESSAY,
                variables: {
                    id: id as string,
                    body: body,
                    durationMillisecond: Date.now() - essayTime
                }
            }).then(async (res) => {
                changeTabBarLoc(true);
                setTimeout(() => {
                    changeEndAnimation(true);
                }, 1000);
                setTimeout(() => {
                    DivRef2.scrollIntoView({ behavior: "smooth" });
                }, 1400);

                let lastTemp = await localStorage.getItem(type === 'general_task_1' ? 'lastTempEssay' : type === 'general_task_2' ? 'lastTempEssay2' : 'lastTempEssay3');
                let t = await localStorage.getItem('tempsEssayList');
                let tempsLiset: SelectedTopicTempEssay[] = [];
                if (t) tempsLiset = JSON.parse(t);
                if (tempsLiset.findIndex(item => item.id === currentId) != -1) {
                    await localStorage.setItem('tempsEssayList',
                        JSON.stringify(tempsLiset.filter(item => item.id !== tempsLiset[tempsLiset.findIndex(item => item.id === currentId)].id)));
                } else if (lastTemp) {
                    await localStorage.removeItem(type === 'general_task_1' ? 'lastTempEssay' : type === 'general_task_2' ? 'lastTempEssay2' : 'lastTempEssay3');
                } else {
                    await localStorage.removeItem(type === 'general_task_1' ? 'tempEssay' : type === 'general_task_2' ? 'tempEssay2' : 'tempEssay3');
                };

                await setEssaies([{
                    id: res.data.addNewEssay.id,
                    essay: res.data.addNewEssay.essay,
                    date: res.data.addNewEssay.date,
                    shortId: res.data.addNewEssay.shortId
                }, ...essaies]);
                changeEssayLoading(false);
                await GetScores([{
                    id: res.data.addNewEssay.id,
                    essay: res.data.addNewEssay.essay,
                    date: res.data.addNewEssay.date,
                    shortId: res.data.addNewEssay.shortId
                }, ...essaies]);
                changeCcurrentId(id);
                setAddEssayLoading(false);
                resetForm();
            }).catch(async (err) => {
                toast.error(err.message);
                changeLoading(false);
                setAddEssayLoading(false);
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
            toast.success('Essay deleted.');
        }).catch(async (err) => {
            toast.error(err.message);
            changeDeleteLoading(false);
        });
    };

    //-------------------------------------------------------------------temp
    async function CreateTempEssay(essay: string, Topic: string) {
        let temp: tempEssay = { topic: { id: '', body: '', type: type }, essay: '' };
        let oldestTemp = await localStorage.getItem(type === 'general_task_1' ? 'tempEssay' : type === 'general_task_2' ? 'tempEssay2' : 'tempEssay3');
        let t = await localStorage.getItem('tempsEssayList');
        let tempsList: SelectedTopicTempEssay[] = [];
        if (t) tempsList = JSON.parse(t);

        if (generatedTopic) {
            temp.topic = { id: generatedTopic.id as string, body: Topic, type: type };
            if (generatedTopic?.visuals && generatedTopic.visuals.length > 0)
                temp.visuals = generatedTopic.visuals
        } else {
            temp.topic = { id: '', body: Topic, type: type }
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
            if (JSON.parse(oldestTemp).topic.body === Topic) {
                localStorage.setItem(type === 'general_task_1' ? 'tempEssay' : type === 'general_task_2' ? 'tempEssay2' : 'tempEssay3', JSON.stringify(temp));
            } else {
                localStorage.setItem(type === 'general_task_1' ? 'lastTempEssay' : type === 'general_task_2' ? 'lastTempEssay2' : 'lastTempEssay3', JSON.stringify(temp));
            }
        } else {
            localStorage.setItem(type === 'general_task_1' ? 'tempEssay' : type === 'general_task_2' ? 'tempEssay2' : 'tempEssay3', JSON.stringify(temp));
        };
    };

    async function ChangeTempTopic(essay: string, Topic: string, id?: string) {
        if (essay != '') {
            let temp: tempEssay = { topic: { id: '', body: '', type: type }, essay: '' };
            temp.topic = { id: id ? id : '', body: Topic, type: type }
            temp.essay = essay;
            localStorage.setItem(type === 'general_task_1' ? 'tempEssay' : type === 'general_task_2' ? 'tempEssay2' : 'tempEssay3', JSON.stringify(temp));
        }
    };

    async function ChackTopic() {
        if (topic && essay === '') {
            changeCcurrentId(topic.id);
            changeMoreEssaies(true);
        } else if (topic && essay !== '') {
            let temp = await localStorage.getItem(type === 'general_task_1' ? 'tempEssay' : type === 'general_task_2' ? 'tempEssay2' : 'tempEssay3');
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

    async function OnEditEssay() {
        setChangeInput(true);
        changeEssayTime(Date.now());
    };

    React.useEffect(() => {
        ChackTopic();
    }, []);

    React.useEffect(() => {
        if (imagePixels > 1) {
            setTimeout(() => {
                changeImagePixels(imagePixels - 5);
            }, 1000);
            console.log(imagePixels)
        } else {
            return;
        }
    });

    const nameregex = /^[ A-Za-z ][ A-Za-z0-9  `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n]*$/;

    const EssayValidationSchema = Yup.object().shape({
        body: Yup
            .string()
            .required('Body is required!'),
    });

    return <Formik
        initialValues={{
            topic: topic?.id === '' ? topic?.body : generatedTopic ? generatedTopic.body : '',
            body: essay ? essay : '',
            subType: ''
        }}
        enableReinitialize
        validationSchema={EssayValidationSchema}
        onSubmit={async (values, { resetForm }) => {
            await AddNewEssay(values.topic, values.body, resetForm);
            // resetForm();
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
                            style={{ height: 'fit-content', minHeight: type === 'general_task_1' ? 764 : type === 'general_task_2' ? 600 : 1255 }}
                            className={styles.writingForm}>
                            <SelectComponents values={[
                                { title: 'Essay', active: false, lock: false },
                                { title: 'Score', active: false, lock: false },
                                { title: 'Analysis', active: false, lock: true },
                                { title: 'Recommendations', active: false, lock: true },
                                { title: 'WWAI Tutor', active: false, lock: true }
                            ]} selectedItem={0} className={styles.topSelect} />

                            <div className={styles.wriritngTitle}>
                                {type === 'general_task_1' ? 'IELTS GT Task 1' : type === 'general_task_2' ? 'IELTS Task 2' : 'IELTS AC Task 1'}
                            </div>

                            <div className={styles.writingSecondTitle}>
                                You should spend about {type === 'general_task_2' ? 40 : 20} minutes on this task.
                            </div>
                            {
                                type !== 'academic_task_1' &&
                                <div className={styles.writingInputTitle}>
                                    {'Write about the following topic:'}
                                </div>
                            }

                            {
                                topic && essay === '' ?
                                    < div className={styles.selectedTopcCard}><Text text={topic.body} /></div>
                                    : topic && essay != '' && currentId !== null ?
                                        < div className={styles.selectedTopcCard}><Text text={topic.body} /></div>
                                        : currentId != null ?
                                            <div className={styles.selectedTopcCard}><Text text={values.topic} /></div>
                                            : generateWritingTopicLoading ?
                                                <Loading style={{ height: 250, minHeight: 0 }} />
                                                : <div className={styles.topicInputContainer}>
                                                    {
                                                        generateWriting && !editedGeneratedTopic ?
                                                            <Writer
                                                                changeEndTyping={changeEndTyping}
                                                                type={type}
                                                                topic={values.topic}
                                                            />
                                                            :
                                                            <Input
                                                                disable={type === 'academic_task_1'}
                                                                style={{ width: '70%', marginTop: 0 }}
                                                                className={styles.topicInput}
                                                                onChange={(e: any) => {
                                                                    changeEndTyping(false);
                                                                    setChangeInput(false);
                                                                    setTyped(true);
                                                                    handleChange(e);
                                                                    ChangeTempTopic(values.body, e.target.value);
                                                                }}
                                                                placeHolder={type === "academic_task_1" ? "Generate a topic..." : "Type/paste your topic here, or generate a topic."}
                                                                secondError
                                                                textarea
                                                                textarea_name='topic'
                                                                textarea_value={values.topic}
                                                                textarea_error={errors.topic && touched.topic && errors.topic}
                                                            />
                                                    }
                                                    <div className={styles.topicButtonsContainer}>

                                                        <SubTypeSelect
                                                            defaultValue={values.subType}
                                                            setFieldValue={setFieldValue}
                                                            type={type}
                                                        />

                                                        <button
                                                            aria-label="generate tipic"
                                                            onClick={async () => {
                                                                changeGeneratedTopic(null);
                                                                setChangeInput(false);
                                                                changeEndTyping(false);
                                                                changeEditedGeneratedTopic(false);
                                                                changeGenerateWriting(true);
                                                                await GenerateTopic(setFieldValue, values.body, values.subType);
                                                            }}
                                                            type="button"
                                                            className={styles.generateButton}>
                                                            <Reload style={{ marginTop: 8 }} className={styles.reloadIconResponsive} />
                                                            {
                                                                generatedTopic ? 'Regenereate' :
                                                                    'Generate'
                                                            }
                                                        </button>
                                                    </div>

                                                    {type !== 'academic_task_1' &&
                                                        generateWriting ?
                                                        <button
                                                            aria-label="edit topic"
                                                            type="button"
                                                            onClick={() => {
                                                                changeEditedGeneratedTopic(true);
                                                                changeEndTyping(false);
                                                                changeGenerateWriting(false);
                                                                setChangeInput(false);
                                                                changeGeneratedTopic(null);
                                                                setFieldValue('topic', '');
                                                            }}
                                                            className={styles.editButton}>
                                                            <div>
                                                                {
                                                                    topicLoading ?
                                                                        <ReactLoading type={'spin'} color={'#2E4057'} height={28} width={28} /> :
                                                                        <MdEdit className={styles.editIconResponsive} style={{ fontSize: 40 }} />}</div>
                                                        </button>
                                                        : typed &&
                                                        <button
                                                            aria-label="edit topic"
                                                            type="button"
                                                            onClick={async () => {
                                                                changeCcurrentId(await SelectTopic(values.topic));
                                                            }}
                                                            style={generatedTopic ? { backgroundColor: '#2E4057' } : { backgroundColor: '#d5d7db' }}
                                                            className={styles.checkButton}>
                                                            <div>
                                                                {
                                                                    topicLoading ?
                                                                        <ReactLoading type={'spin'} color={'#2E4057'} height={28} width={28} />
                                                                        : generatedTopic ?
                                                                            <MdCheck className={styles.editIconResponsive} color="#d5d7db" style={{ fontSize: 40 }} />
                                                                            :
                                                                            <MdCheck className={styles.editIconResponsive} color="#2E4057" style={{ fontSize: 40 }} />
                                                                }
                                                            </div>
                                                        </button>
                                                    }

                                                </div>}

                            <div className={styles.writingInputTitle}>
                                {
                                    type === 'academic_task_1' ?
                                        'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.' :
                                        type === 'general_task_2' &&
                                        'Give reasons for your answer and include any relevant examples from your own knowledge or experience.'
                                }
                            </div>

                            <div className={styles.writingInputTitle}>Write at least {type === 'general_task_2' ? 250 : 150} words.
                                {
                                    changeInput && type !== 'academic_task_1' &&
                                    <div className={styles.wordsCount}>
                                        {CountWords(values.body, type === 'general_task_2' ? 250 : 150)}
                                    </div>
                                }
                            </div>

                            {
                                type === 'academic_task_1' &&
                                <div className={styles.imagesContainer + ' col-12'}>

                                    {
                                        topic && topic.visuals && topic.visuals?.length > 0 ?
                                            topic.visuals.map((item, index) =>
                                                <div
                                                    key={index}
                                                    onClick={() => handleSelectImage(item.url)}
                                                    className={styles.imageCard}>

                                                    <Pixelify
                                                        src={item.url}
                                                        pixelSize={imagePixels}
                                                        height={428}
                                                        width={600}
                                                    />

                                                </div>)
                                            : generatedTopic && generatedTopic.visuals && generatedTopic.visuals?.length > 0 ?
                                                generatedTopic.visuals.map((item, index) =>
                                                    <div
                                                        key={index}
                                                        onClick={() => handleSelectImage(item.url)}
                                                        className={styles.imageCard}>

                                                        <Pixelify
                                                            src={item.url}
                                                            pixelSize={imagePixels}
                                                            height={428}
                                                            width={600}
                                                        />
                                                    </div>)
                                                : <div className={styles.emptyImageCard}>
                                                    <IoMdImage fontSize={70} />
                                                </div>
                                    }
                                </div>
                            }

                            {
                                type === 'academic_task_1' &&
                                <div style={{ marginLeft: 'auto', width: 'fit-content', paddingRight: 45 }} className={styles.wordsCount}>
                                    {CountWords(values.body, 150)}
                                </div>
                            }

                            <div className={styles.bodyInputContainer} style={!endTyping ? { opacity: 0.5 } : {}} id='essayScrollDiv'>
                                <Input
                                    style={errors.body ? { borderColoe: 'red' } : {}}
                                    disable={!endTyping || !CheckCountWords(values.body, type === 'general_task_2' ? 349 : 249)}
                                    className={styles.topicInput + ' ' + styles.essayInput}
                                    onChange={(e: any) => {
                                        if (nameregex.test(e.target.value) || e.nativeEvent.data === null || e.nativeEvent.inputType == 'insertLineBreak') {
                                            if (!changeInput) {
                                                setChangeInput(true);
                                                changeEssayTime(Date.now());
                                            }
                                            handleChange(e);
                                            CreateTempEssay(e.target.value, values.topic);
                                        } else {
                                            toast.error('only english letters!');
                                        }
                                    }}
                                    placeHolder={type === 'general_task_1' ? 'Type or paste your letter/email here...'
                                        : type === 'general_task_2' ? 'Type your essay here...'
                                            : 'Type/paste your report here...'}
                                    secondError
                                    textarea
                                    textarea_name='body'
                                    textarea_value={values.body}
                                    textarea_error={errors.body && touched.body && errors.body}
                                >
                                    <EssayProcessBar type={type} changeInput={changeInput} loading={addEssayLoading} error={errors.body ? true : false} />
                                </Input>

                            </div>


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
                                    essaies.map((essay) => <EssayCard type={type} key={essay.id} essay={essay} setFieldValue={setFieldValue} GetScores={GetScores} OnEditEssay={OnEditEssay}
                                        divRef={divRef} handleDelete={DeleteEssay} loading={essayLoading} setEssaies={setEssaies} essaies={essaies} topic={topic ? topic.body : values.topic} />)
                                }
                            </InfiniteScroll>
                    }
                </div>

                {
                    type === 'academic_task_1' &&
                    <Modal
                        bodyStyle={{ width: 700 }}
                        style={{ width: 700 }}
                        footer={null} closeIcon={null} title={null} open={showImage} onCancel={handleCancelImageModal}>
                        <div>
                            <Image
                                src={modalImage}
                                alt="academic task chart"
                                height='679'
                                width='700'
                                loading="eager"
                                priority
                            /></div>
                    </Modal>

                }

            </form >
        )}
    </Formik >;
};

export default TaskForm;