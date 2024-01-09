/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import dynamic from "next/dynamic";
import { Formik } from 'formik';
import InfiniteScroll from 'react-infinite-scroller';
import Image from "next/image";
import ReactLoading from 'react-loading';
import toast from "react-hot-toast";
import * as Yup from 'yup';
// import { Pixelify } from "react-pixelify";
import { useMutation } from "@apollo/client";
import { useMediaQuery } from 'react-responsive';
import { AnimatePresence, motion } from "framer-motion";
import { Popover } from 'antd';

//--------------------------------------styles
import styles from '../../../../styles/task.module.css';
import '../../../../styles/customMuiStyles.css';

//--------------------------------------components
import { ADD_ESSAY, SELECT_TOPIC } from "@/config/graphql";
const Input = dynamic(() => import('@/components/input/input'), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-[209px]">
        <ReactLoading type={'spin'} color={'#929391'} height={30} width={30} /></div>
});
const EssayCard = dynamic(() => import('@/components/essayCard/essayCard'), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-[590px]">
        <ReactLoading type={'spin'} color={'#929391'} height={30} width={30} /></div>
});
const Loading = dynamic(() => import('@/components/loading/loading'), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-[209px]">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const SelectComponents = dynamic(() => import('@/components/customSelect/customSelect'), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-auto">
        <ReactLoading className="mt-[24px]" type={'spin'} color={'#929391'} height={20} width={20} /></div>
});
import { CheckCountWords, CountWords } from "@/components/Untitled";
const Text = dynamic(() => import("@/components/text/text"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center mt-[24px] h-auto">
        <ReactLoading type={'bubbles'} color={'#929391'} height={20} width={20} /></div>
});
const SubTypeSelect = dynamic(() => import("@/components/subTypeSelect/subTypeSelect"), {
    ssr: false, loading: () => <div role="status" className="w-[100px] m-auto flex justify-center self-center items-center h-auto">
        <ReactLoading type={'spin'} color={'#929391'} height={20} width={20} /></div>
});
const Writer = dynamic(() => import("@/components/writer/writer"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-[209px]">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
import { DeleteEssaies, GenerateNewTopic } from "@/hooks/actions";
const EssayProcessBar = dynamic(() => import("@/components/essayProcessBar/essayProcessBar"), { ssr: false });

//--------------------------------------icons
import { Reload } from "@/../public";
import { IoMdImage } from 'react-icons/io';
import { MdEdit, MdCheck } from 'react-icons/md';

//--------------------------------------types
import { tempEssay, SelectedTopicTempEssay } from '../../../../../types/essay';
import { topic } from "../../../../../types/topic";
import { TaskProps } from "../../../../../types/task";

export default function TaskForm({
    changeTabBarLoc, changeEndAnimation, endAnimation, topic, essay, GetScores,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef, type, targetRef, handleShowError
}: TaskProps) {
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
    const [isBig, setIsBig] = React.useState<boolean>(false);
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    //-----------------------------------------------------------------graphQl functions
    const [selectTopic, { error }] = useMutation(SELECT_TOPIC);
    const [addNewEssay] = useMutation(ADD_ESSAY);


    //-----------------------------------------------------------------generate topic
    async function GenerateTopic(setFieldValue: any, essay: string, subType: string) {
        changeGenerateWritingTopicLoading(true);
        let res = await GenerateNewTopic(type, subType);
        if (res) {
            changeGeneratedTopic({
                id: res.id, body: res.body,
                type: res.type, subType: res.questionType,
                visuals: res.visuals
            });
            setFieldValue('topic', res.body);
            setFieldValue('subType', res.questionType);
            ChangeTempTopic(essay, res.body, res.id);
        }
        changeGenerateWritingTopicLoading(false);
    };

    //------------------------------------------------------------------select essay topic
    async function SelectTopic(topic: string): Promise<string | null> {
        setTopicLoading(true);
        let id: any;
        await selectTopic({
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
        }).catch((err: typeof error) => {
            if (err.graphQLErrors[0].status == 402) {
                handleShowError();
                id = null;
            } else {
                toast.error(err.graphQLErrors[0].message);
                changeLoading(false);
                id = null;
            }
        });
        setTopicLoading(false);
        return id;
    };

    //-------------------------------------------------------------------add new essay
    async function AddNewEssay(Topic: string, body: string, resetForm: any) {
        setChangeInput(false);
        let id: any;

        if (currentId != null) {
            id = currentId;
        } else
            id = await SelectTopic(Topic);


        if (id != null) {
            await setAddEssayLoading(true);
            await addNewEssay({
                variables: {
                    id: 'f5c1cc26-fdc8-47ac-8ae5-8bbb89bf26e0',
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

                await setEssaies([res.data.addNewEssay, ...essaies]);
                changeEssayLoading(false);
                setTimeout(async () => {
                    await GetScores([res.data.addNewEssay, ...essaies]);
                }, 3000);
                changeCcurrentId(id);
                setAddEssayLoading(false);
                resetForm();
            }).catch(async (err: typeof error) => {
                if (err.graphQLErrors[0].status == 402) {
                    handleShowError();
                } else {
                    toast.error(err.graphQLErrors[0].message);
                }
                changeLoading(false);
                setAddEssayLoading(false);
            });
        };
    };

    //-------------------------------------------------------------------delete essay
    async function DeleteEssay(id: string) {
        changeDeleteLoading(true);
        if (await DeleteEssaies(id)) {
            setEssaies(essaies.filter(item => item.id !== id));
        }
        changeDeleteLoading(false);
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

    function handleGenerateTopic() {
        changeGeneratedTopic(null);
        setChangeInput(false);
        changeEndTyping(false);
        changeEditedGeneratedTopic(false);
        changeGenerateWriting(true);
    };

    function handleEditTopic() {
        changeEditedGeneratedTopic(true);
        changeEndTyping(false);
        changeGenerateWriting(false);
        setChangeInput(false);
        changeGeneratedTopic(null);
    };

    function handleChangeTopicInput() {
        changeEndTyping(false);
        setChangeInput(false);
        setTyped(true);
    };

    React.useEffect(() => {
        ChackTopic();
    }, []);

    const nameregex = /^[ A-Za-z ][ A-Za-z0-9  `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~\n]*$/;

    const EssayValidationSchema = Yup.object().shape({
        body: Yup
            .string()
            .required('Body is required!'),
        topic: Yup
            .string(),
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
                className='col-12 flex flex-1 flex-col pr-[95px] pb-[100px] pl-[90px] not-italic mac:pr-[27px] mac:pb-[100px] mac:pl-[22px] sm:pr-[22px] sm:pb-[50px] sm:pl-[22px] '
                onSubmit={handleSubmit}>

                {
                    loading ?
                        <Loading style={{ height: 750, minHeight: 0 }} />
                        :
                        <div
                            ref={targetRef}
                            className={' h-fit overflow-hidden sm:pb-[50px] ' + (type === 'general_task_1' ? 'min-h-[764px] ' : type === 'general_task_2' ? 'min-h-[600px] ' : 'min-h-[1255px]')}>

                            {
                                isMobile &&
                                <SelectComponents values={[
                                    { title: type === 'academic_task_1' ? 'Report' : type === 'general_task_1' ? 'Letter/Email' : 'Essay', active: false },
                                    { title: 'Score', active: false },
                                    { title: 'Analysis', active: false },
                                    { title: 'Recommendations', active: false },
                                    { title: 'WWAI Tutor', active: false }
                                ]} selectedItem={0} className=' mt-[24px] ' />
                            }
                            <div className='text-blackText text-left text-[20px] font-medium leading-normal ml-[45px] flex mac:text-[16px] sm:ml-[8px] sm:text-[16px] sm:mt-[20px] '>
                                {type === 'general_task_1' ? 'IELTS GT Task 1' : type === 'general_task_2' ? 'IELTS Task 2' : 'IELTS AC Task 1'}
                            </div>

                            <div className='text-blackText text-[20px] font-light leading-normal ml-[45px] mt-[17px] mac:text-[16px] sm:text-[16px] sm:ml-[8px] '>
                                You should spend about {type === 'general_task_2' ? 40 : 20} minutes on this task.
                            </div>
                            {
                                type !== 'academic_task_1' &&
                                <div className='mt-[8px] text-blackText text-left text-[20px] font-light ml-[45px] leading-[26px] flex flex-row justify-between pr-[40px] mac:text-[16px] sm:text-[16px] sm:ml-[8px] sm:pr-0 '>
                                    {'Write about the following topic:'}
                                </div>
                            }

                            {
                                topic && essay === '' ?
                                    < div className='rounded-[8px] mt-[15px] mr-[40px] mb-0 ml-[45px] pt-[15px] pr-[52px] pb-[10px] pl-[18px] w-[70%] h-fit overflow-y-auto text-blackText text-[20px] not-italic font-normal leading-[180%] mac:text-[16px] sm:text-[16px] sm:mt-[15px] sm:mr-0 sm:mb-0 sm:ml-0 sm:w-full sm:h-fit '>
                                        <Text text={topic.body} />
                                    </div>
                                    : topic && essay != '' && currentId !== null ?
                                        < div className='rounded-[8px] mt-[15px] mr-[40px] mb-0 ml-[45px] pt-[15px] pr-[52px] pb-[10px] pl-[18px] w-[70%] h-fit overflow-y-auto text-blackText text-[20px] not-italic font-normal leading-[180%] mac:text-[16px] sm:text-[16px] sm:mt-[15px] sm:mr-0 sm:mb-0 sm:ml-0 sm:w-full sm:h-fit '>
                                            <Text text={topic.body} />
                                        </div>
                                        : currentId != null ?
                                            <div className='rounded-[8px] mt-[15px] mr-[40px] mb-0 ml-[45px] pt-[15px] pr-[52px] pb-[10px] pl-[18px] w-[70%] h-fit overflow-y-auto text-blackText text-[20px] not-italic font-normal leading-[180%] mac:text-[16px] sm:text-[16px] sm:mt-[15px] sm:mr-0 sm:mb-0 sm:ml-0 sm:w-full sm:h-fit '>
                                                <Text text={values.topic} />
                                            </div>
                                            : generateWritingTopicLoading ?
                                                <Loading style={{ height: 250, minHeight: 209 }} />
                                                : <div className='flex lg:flex-row mac:flex-row relative mr-[40px] ml-[45px] sm:m-0 sm:flex-col-reverse '>
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
                                                                className={'mt-[26px] rounded-[8px] overflow-hidden sm:w-full sm:mt-[16px] '+styles.topicInput}
                                                                onChange={(e: any) => {
                                                                    handleChangeTopicInput();
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
                                                    <div className='flex lg:flex-col mac:flex-col items-center w-fit h-fit ml-[20px] sm:flex-row sm:ml-[8px] '>

                                                        <SubTypeSelect
                                                            defaultValue={values.subType !== '' ? values.subType : generatedTopic ? generatedTopic.subType : ''}
                                                            setFieldValue={setFieldValue}
                                                            type={type}
                                                        />

                                                        <button
                                                            aria-label="generate tipic"
                                                            onClick={async () => {
                                                                handleGenerateTopic();
                                                                await GenerateTopic(setFieldValue, values.body, values.subType);
                                                            }}
                                                            type="button"
                                                            className='hover:shadow-none bg-seccondaryColor border-[2px] border-seccondaryColor w-[170px] h-[40px] text-whiteText ml-[29px] mt-[19px] py-0 px-[22px] text-center text-[17px] not-italic font-normal leading-normal mac:text-[14px] sm:h-[25px] sm:w-[100px] sm:text-[13px] sm:ml-[9px] '>
                                                            {
                                                                !isMobile &&
                                                                <Reload style={{ marginTop: 8 }} />
                                                            }
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
                                                                handleEditTopic();
                                                                setFieldValue('topic', '');
                                                            }}
                                                            className='h-fit w-fit absolute bottom-[10px] right-[32%] p-0 rounded-full hover:shadow-none sm:right-[14px] sm:bottom-[16px] sm:bg-background sm:h-[35px] sm:w-[35px] '>
                                                            <div>
                                                                {
                                                                    topicLoading ?
                                                                        <ReactLoading type={'spin'} color={'#2E4057'} height={28} width={28} /> :
                                                                        <MdEdit className='lg:hover:text-[43px] mac:hover:text-[43px] text-[40px] sm:text-[25px] ' />
                                                                }
                                                            </div>
                                                        </button>
                                                        : typed &&
                                                        <button
                                                            aria-label="edit topic"
                                                            type="button"
                                                            onClick={async () => {
                                                                changeCcurrentId(await SelectTopic(values.topic));
                                                            }}
                                                            style={generatedTopic ? { backgroundColor: '#2E4057' } : { backgroundColor: '#d5d7db' }}
                                                            className='h-[50px] w-[50px] absolute bottom-[10px] righ-[32%] rounded-full sm:right-[8px] sm:h-[30px] sm:w-[30px] '>
                                                            <Popover placement="topLeft" content={'Please check your topic'} open={!endTyping}>
                                                                {
                                                                    topicLoading ?
                                                                        <ReactLoading type={'spin'} color={'#2E4057'} height={isMobile ? 20 : 28} width={isMobile ? 20 : 28} />
                                                                        : generatedTopic ?
                                                                            <MdCheck className='lg:hover:text-[43px] mac:hover:text-[43px] text-[40px] sm:text-[25px] ' color="#d5d7db" />
                                                                            :
                                                                            <MdCheck className='lg:hover:text-[43px] mac:hover:text-[43px] text-[40px] sm:text-[25px] ' color="#2E4057" />
                                                                }
                                                            </Popover>
                                                        </button>
                                                    }

                                                </div>}

                            <div className='mt-[8px] text-blackText text-left text-[20px] font-light ml-[45px] leading-[26px] flex flex-row justify-between pr-[40px] mac:text-[16px] sm:text-[16px] sm:ml-[8px] sm:pr-0 '>
                                {
                                    type === 'academic_task_1' ?
                                        'Summarise the information by selecting and reporting the main features, and make comparisons where relevant.' :
                                        type === 'general_task_2' &&
                                        'Give reasons for your answer and include any relevant examples from your own knowledge or experience.'
                                }
                            </div>

                            <div style={{ lineHeight: 'unset' }} className='mt-[8px] text-blackText text-left text-[20px] font-light ml-[45px] leading-[26px] flex flex-row justify-between pr-[40px] mac:text-[16px] sm:text-[16px] sm:ml-[8px] sm:pr-0 '>
                                Write at least {type === 'general_task_2' ? 250 : 150} words.
                                {
                                    changeInput && type !== 'academic_task_1' &&
                                    <div className='ml-[45px] mt-[8px] sm:ml-auto sm:mt-0 '>
                                        {CountWords(values.body, type === 'general_task_2' ? 250 : 150)}
                                    </div>
                                }
                            </div>
                            <AnimatePresence>
                                {
                                    type === 'academic_task_1' &&
                                    <div className={styles.imagesContainer + ' flex ml-[45px] mt-[48px] mb-[50px] flex-wrap col-12'}>

                                        {
                                            topic && topic.visuals && topic.visuals?.length > 0 ?
                                                topic.visuals.map((item, index) =>
                                                    <motion.div
                                                        style={{ opacity: 0 }}
                                                        key={index}
                                                        onClick={() => setIsBig(!isBig)}
                                                        animate={isBig ? { width: 1200, height: 'fit-content', opacity: 1 } : { width: 600, height: 'fit-content', opacity: 1 }}
                                                        transition={{ type: 'spring', duration: 1 }}
                                                    >
                                                        <Image
                                                            src={item.url}
                                                            alt="academic task topic image"
                                                            width="0"
                                                            height="0"
                                                            sizes="100vw"
                                                            loading="eager"
                                                            priority
                                                        />
                                                    </motion.div>
                                                )
                                                : generatedTopic && generatedTopic.visuals && generatedTopic.visuals?.length > 0 ?
                                                    generatedTopic.visuals.map((item, index) =>
                                                        <motion.div
                                                            style={{ opacity: 0 }}
                                                            key={index}
                                                            onClick={() => setIsBig(!isBig)}
                                                            animate={isBig ? { width: 1000, height: 'fit-content', opacity: 1 } : { width: 600, height: 'fit-content', opacity: 1 }}
                                                            transition={{ type: 'spring', duration: 1 }}
                                                        >
                                                            <Image
                                                                src={item.url}
                                                                alt="academic task topic image"
                                                                width="0"
                                                                height="0"
                                                                sizes="100vw"
                                                                loading="eager"
                                                                priority
                                                            />
                                                        </motion.div>
                                                    )
                                                    : <div className='w-[66%] h-[360px] flex items-center justify-center rounded-[8px] border-[1px] border-seccondaryColor sm:w-full '>
                                                        <IoMdImage fontSize={70} />
                                                    </div>
                                        }
                                    </div>
                                }
                            </AnimatePresence>
                            {
                                changeInput && type === 'academic_task_1' &&
                                <div style={{ marginLeft: 'auto', width: 'fit-content', paddingRight: 45 }} className='ml-[45px] mt-[8px] sm:ml-auto sm:mt-0 '>
                                    {CountWords(values.body, 150)}
                                </div>
                            }

                            <div
                                className='flex flex-col h-fit mr-[40px] ml-[45px] sm:m-0 '
                                style={!endTyping ? { opacity: 0.5 } : {}} id='essayScrollDiv'>
                                <Input
                                    style={errors.body ? { borderColoe: 'red' } : {}}
                                    disable={!endTyping}
                                    className={styles.topicInput + ' mt-[26px] rounded-b-0 rounded-t-[8px] overflow-hidden sm:w-full sm:mt-[7px] sm:mb-[17px] ' + styles.essayInput}
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
                                    <EssayProcessBar type={type} changeInput={changeInput} loading={addEssayLoading}
                                        disable={!endTyping || !CheckCountWords(values.body, type === 'general_task_2' ? 349 : 249)}
                                        error={errors.body && touched.body || !CheckCountWords(values.body, type === 'general_task_2' ? 349 : 249) ? true : false} />
                                    {
                                        !CheckCountWords(values.body, type === 'general_task_2' ? 349 : 249) &&
                                        <div className='text-red text-[20px] not-italic font-medium leading-[24.5px] mt-[14px] '>
                                            {'Text is too long!'}
                                        </div>
                                    }
                                </Input>

                            </div>


                        </div>
                }
                <div id="scrollDiv">
                    {
                        deleteLoading ?
                            <Loading style={{ height: 100, minHeight: 0 }} />
                            : endAnimation &&
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={() => GetUserEssaies(currentId)}
                                hasMore={MoreEssaies}
                                loader={<Loading style={{ height: 100, minHeight: 0 }} key={1} />}
                                useWindow={false}
                                key={0}
                            >
                                {
                                    essaies.map((essay) =>
                                        <EssayCard type={type} key={essay.id} essay={essay} setFieldValue={setFieldValue} GetScores={GetScores} OnEditEssay={OnEditEssay}
                                            divRef={divRef} handleDelete={DeleteEssay} loading={essayLoading} setEssaies={setEssaies} essaies={essaies}
                                            topic={topic ? topic.body : values.topic} />)
                                }
                            </InfiniteScroll>
                    }
                </div>

            </form >
        )}
    </Formik >;
};