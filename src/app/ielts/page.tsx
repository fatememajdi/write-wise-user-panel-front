/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
'use client';
import React from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import ReactLoading from 'react-loading';
import { signOut } from 'next-auth/react';
import { useMediaQuery } from 'react-responsive';
import { Socket, io } from 'socket.io-client';
import { DefaultEventsMap } from "@socket.io/component-emitter";
import toast from "react-hot-toast";

//-----------------------------------------------------styles
import styles from './ielts.module.css';

//-----------------------------------------------------components
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
const Loading = dynamic(() => import("@/components/loading/loading"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const DashboardPopOver = dynamic(() => import("@/components/dashboardPopOver/dashboardPopOver"));
const ChooseType = dynamic(() => import("./essay/chooseType/chooseType"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Task = dynamic(() => import("./essay/task/task"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const TopicsList = dynamic(() => import("@/components/topicsList/topicsList"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Modal = dynamic(() => import("@/components/modal/modal"));
import { SCORE_ESSAY } from "@/config/graphql";
const ProfileCard = dynamic(() => import("@/components/profileCard/profileCard"));
import { StopLoader } from "@/components/Untitled";
const TokenErrorCard = dynamic(() => import("@/components/tokenErrorCard/tokenErrorCard"));

//----------------------------------------------------icons
import { Lock } from '../../../public/dashboard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { TfiMenu } from 'react-icons/tfi';
import { FiMoreVertical } from 'react-icons/fi';

//---------------------------------------------------types
import { Essay, JOBSTATUS } from "../../../types/essay";
import { Topic } from "../../../types/topic";
import { UserProfile } from "../../../types/profile";
import { GetEsseies, GetTopics, GetUserProfile } from "@/hooks/fetchData";
import { DeleteTopics } from "@/hooks/actions";
import { useMutation } from "@apollo/client";

type topic = {
    id: string,
    body: string,
    type: string,
    subType?: string,
    visuals?: {
        id: string,
        url: string,
        image: string
    }[]
};

const Tabs = [
    { label: 'GT Task 1', value: 'general_task_1' },
    { label: 'AC Task 1', value: 'academic_task_1' },
    { label: 'Task 2', value: 'general_task_2' },
];

export default function Page() {
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });
    const targetRef = React.useRef();
    let divRef: any;
    if (typeof document !== 'undefined')
        divRef = document.getElementById('scrollableDiv');
    const [anchorEl, setAnchorEl] = React.useState<boolean>(false);
    const [endAnimation, changeEndAnimation] = React.useState<boolean>(false);
    const [tabBarLoc, changeTabBarLoc] = React.useState<boolean>(false);
    const { data: session, status } = useSession({
        required: true, onUnauthenticated() {
            if (localStorage.getItem('user'))
                return
            else
                router.push('/signIn');
        }
    });
    const [pageLoading, setLoading] = React.useState<boolean>(true);
    const [profile, setProfile] = React.useState<UserProfile>();
    const [essay, setEssay] = React.useState<string>('');
    const [isOpen, setIsOpen] = React.useState<boolean>(!isMobile);
    const [MoreEssaies, changeMoreEssaies] = React.useState<boolean>(true);
    const [MoreTopics, changeMoreTopics] = React.useState<boolean>(true);
    const [showProfileModal, changeShowProfileModal] = React.useState<boolean>(false);
    const [topicsLoading, changeTopicsLoading] = React.useState<boolean>(true);
    const [topics, changeTopics] = React.useState<Topic[]>([]);
    const [topicsType, setTopicsType] = React.useState('general_task_1');
    const [type, setType] = React.useState('');
    const [essaies, setEssaies] = React.useState<Essay[]>([]);
    const router = useRouter();
    const [essayTopic, changeTopic] = React.useState<topic | null>();
    const [socket, setSocket] = React.useState<Socket<DefaultEventsMap, DefaultEventsMap>>(null);
    const [showImage, changeShowImage] = React.useState<boolean>(false);
    const handleShowImageModal = () => changeShowImage(true);
    const handleCancelImageModal = (state?: boolean) => changeShowImage(false);
    const { step, goTo, currentStepIndex } = useMultiStepForm([
        <ChooseType changeType={ChangeType} />,
        <Task
            targetRef={targetRef} GetScores={GetScores}
            setEssaies={setEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} handleNewTopic={handleNewTopic}
            essaies={essaies} GetUserEssaies={GetUserEssaies} changeTabBarLoc={changeTabBarLoc} divRef={divRef} type={type} essay={essay}
            changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={essayTopic != null ? essayTopic : undefined} handleShowError={handleShowImageModal} />
    ]);

    const [scoreEssay] = useMutation(SCORE_ESSAY);

    const tabBarItems = [
        {
            title: type === 'academic_task_1' ? 'Report' : type === 'general_task_1' ? 'Letter/Email' : 'Essay',
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
            title: 'Insights',
            active: true
        },
        {
            title: 'Recommendations',
            active: true
        },
    ];

    async function ChangeType(type: string) {
        if (!socket)
            await socketInitializer();
        setType(type);
        if (topicsType !== type)
            SelectType(type);
        goTo(1);
    };

    async function SelectTopic(topic: topic, essay?: string) {
        ChangeType(topic.type);
        changeTabBarLoc(true);
        changeEndAnimation(true);
        setEssaies([]);
        changeTopic(topic);
        if (essay) {
            setEssay(essay);
            changeMoreEssaies(false);
        } else {
            setEssay('');
            changeMoreEssaies(true);
        }
        if (divRef)
            divRef.scrollTop = divRef.offsetTop;
        goTo(1);
        if (isMobile)
            setIsOpen(false);
    };

    async function UpdateTopicsList(id: string) {
        await changeTopics(topics.filter(item => item.id !== id));
        changeTabBarLoc(false);
        changeEndAnimation(false);
        setEssaies([]);
        changeMoreEssaies(true);
        changeTopic(null);
        goTo(0);
        toast.success('Topic deleted.');
    };

    async function DeleteTopic(id: string) { await DeleteTopics(id, UpdateTopicsList); };

    //----------------------------------------------------------------get user essaies
    async function GetUserEssaies(id: string) {
        if (id !== null) {
            let Essaies: Essay[] = await GetEsseies(id, essaies.length);
            if (Essaies.length > 0)
                await setEssaies([...essaies, ...Essaies]);
            else
                changeMoreEssaies(false);
            if (Essaies.length % 10 !== 0)
                changeMoreEssaies(false);
        }
    };

    //----------------------------------------------------------------get topics list
    async function GetTopicsList(type?: string) {
        let Topics: Topic[] = await GetTopics(type ? type : topicsType, topics.length);
        if (Topics.length > 0)
            await changeTopics([...topics, ...Topics]);
        else
            changeMoreTopics(false);
        if (Topics.length % 10 !== 0)
            changeMoreTopics(false);
    };

    async function GetFirstPageOfTopics(type: string) {
        let Topics: Topic[] = await GetTopics(type, 0);
        if (Topics.length > 0)
            await changeTopics(Topics);
        else
            changeMoreTopics(false);
        if (Topics.length % 10 !== 0)
            changeMoreTopics(false);
    };

    async function SelectType(type: string) {
        changeTopicsLoading(true);
        await setTopicsType(type);
        changeMoreTopics(true);
        await GetFirstPageOfTopics(type);
        changeTopicsLoading(false);
    };

    async function NewEssay() {
        setEssaies([]);
        changeMoreEssaies(false);
        changeTopic(null)
        changeTabBarLoc(false);
        changeEndAnimation(false);
        changeTopic(null);
        setEssay('');
        setAnchorEl(false);
        goTo(0);
        if (isMobile)
            setIsOpen(false);
    };

    async function GetProfile() { setProfile(await GetUserProfile()) };

    async function GetScores(essaies: Essay[], essay?: Essay) {
        let newEssay: Essay[] = essaies;
        await scoreEssay({
            variables: {
                id: essay ? essay.id : newEssay[0].id,
                test: false
            }
        }).then(async (res) => {
            try {
                if (res.data.scoreEssay.recommendation === true)
                    newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).recommendationJobStatus = JOBSTATUS[3];
                else if (!newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).essayRecommendations)
                    newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).recommendationJobStatus = JOBSTATUS[4];
                if (res.data.scoreEssay.insight === true)
                    newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).insightJobStatus = JOBSTATUS[3];
                else if (!newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).essayInsights)
                    newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).insightJobStatus = JOBSTATUS[4];
                if (res.data.scoreEssay.score === true)
                    newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).scoreJobStatus = JOBSTATUS[3];
                else if (!newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).overallBandScore)
                    newEssay.find(item => item.id === (essay ? essay.id : newEssay[0].id)).scoreJobStatus = JOBSTATUS[4];
            } finally {
                setEssaies(newEssay);
                router.refresh();
            }
        }).catch((err) => {
            toast.error(err.message);
        })
    };

    //-------------------------------------------------------connect to socket
    const socketInitializer = async () => {
        const user = await localStorage.getItem("user");
        if (user)
            await setSocket(io("https://ielts.api.babyyodas.io/events", {
                // autoConnect: false,
                extraHeaders: {
                    authorization: `Bearer ${user}`
                }
            }).connect());
        if (socket) {
            socket.on("connection_error", (err) => {
                console.log(err);
            });
            socket.on("connect", () => {
                console.log('connected');
            });
        }
    };

    const CheckForScores = () => {
        let newEssay: Essay[] = essaies;
        if (socket) {
            socket.on("newMessage", async (data) => {
                let essay: Essay | undefined = essaies.find(item => item.id === data.essayId);
                switch (data.part) {
                    case 'Insight': {
                        if (essay && !essay?.essayInsights) {
                            if (data.data === '') {
                                essay.insightJobStatus = JOBSTATUS[4];
                            } else {
                                essay.essayInsights = data.data;
                                essay.insightJobStatus = JOBSTATUS[0];
                            }
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            await setEssaies(newEssay);
                            router.refresh();
                        }
                        break;
                    }
                    case 'Recommendation': {
                        if (essay && !essay?.essayRecommendations) {
                            if (data.data === '') {
                                essay.recommendationJobStatus = JOBSTATUS[4];
                            } else {
                                essay.essayRecommendations = data.data;
                                essay.recommendationJobStatus = JOBSTATUS[0];
                            }
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                            router.refresh();
                        }
                        break;
                    }
                    case 'Grammatical': {
                        if (essay && !essay?.grammaticalRangeAndAccuracyScore) {
                            essay.grammaticalRangeAndAccuracyScore = data.data as number;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'Grammatical Summary': {
                        if (essay && !essay?.grammaticalRangeAndAccuracySummery) {
                            essay.grammaticalRangeAndAccuracySummery = data.data;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'Coherence': {
                        if (essay && !essay?.coherenceAndCohesionScore) {
                            essay.coherenceAndCohesionScore = data.data as number;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'Coherence Summary': {
                        if (essay && !essay?.coherenceAndCohesionSummery) {
                            essay.coherenceAndCohesionSummery = data.data;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'Lexical': {
                        if (essay && !essay?.lexicalResourceScore) {
                            essay.lexicalResourceScore = data.data as number;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'Lexical Summary': {
                        if (essay && !essay?.lexicalResourceSummery) {
                            essay.lexicalResourceSummery = data.data;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'Task Achievement': {
                        if (essay && !essay?.taskAchievementScore) {
                            essay.taskAchievementScore = data.data as number;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'Task Achievement Summary': {
                        if (essay && !essay?.taskAchievementSummery) {
                            essay.taskAchievementSummery = data.data;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'overalScore': {
                        if (essay && !essay?.overallBandScore || essay?.overallBandScore <= 0) {
                            if (data.data === '') {
                                essay.scoreJobStatus = JOBSTATUS[4];
                            } else {
                                essay.overallBandScore = data.data as number;
                                essay.scoreJobStatus = JOBSTATUS[0];
                                let newTopics: Topic[] = topics;
                                newTopics[topics.findIndex(item => item.id === essay.topicId)].overallBandScore = data.data;
                                changeTopics(newTopics);
                            }
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
                            router.refresh();

                        }
                        break;
                    }

                }
                if (essay) {
                    newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                    await setEssaies(newEssay);
                    router.refresh();
                    return;
                }
                return;
            });
        }
    };

    //------------------------------------------------------------------check user loged in
    // eslint-disable-next-line react-hooks/exhaustive-deps
    React.useEffect(() => {
        if (!localStorage.getItem('user')) {
            if (status != "loading") {
                if (status === 'authenticated' && session.user.token !== undefined) {
                    localStorage.setItem('user', session.user.token as string);
                    setLoading(false);
                }
                else {
                    router.push('/signIn');
                }
            }
        } else {
            setLoading(false);
        };

        CheckForScores();
    });

    function FirstFetch() {
        if (MoreTopics) {
            changeTopicsLoading(true);
            GetTopicsList();
            changeTopicsLoading(false);
        }
        GetProfile();
    };

    React.useEffect(() => {
        StopLoader();
        if (localStorage.getItem('user')) {
            FirstFetch();
        } else {
            setTimeout(() => {
                FirstFetch();
            }, 1000);
        }
    }, []);

    const handlePopOverClose = () => { setAnchorEl(false); };

    async function LogOut() {
        setLoading(true);
        localStorage.clear();
        if (status === 'authenticated')
            signOut();
    };

    async function handleNewTopic(topic: Topic) {
        try {
            if (topic) {
                await changeTopics([topic, ...topics]);
                changeTopic({
                    id: topic.id ? topic.id : "",
                    body: topic.topic ? topic.topic : "",
                    type: topic.type ? topic.type : "",
                    visuals: topic.visuals ? topic.visuals : undefined
                });
            }
            else {
                changeTopicsLoading(true);
                await GetFirstPageOfTopics(topicsType);
                changeTopicsLoading(false);
            };
        } finally {
            setEssay('');
        }

    };

    function ShowProfile() {
        if (isMobile)
            setIsOpen(false);
        changeShowProfileModal(true);
    };

    const showAnimation = {
        hidden: {
            width: 0,
            opacity: 0,
            transition: {
                duration: 0.5,
            }
        },
        show: {
            width: 'auto',
            opacity: 1,
            transition: {
                duration: 0.2,
            }
        }
    };

    if (pageLoading)
        return <Loading />
    else
        return <div className="flex flex-row relative ">
            <motion.div animate={{
                width: isOpen && isMac ? '268px'
                    : isOpen && isMobile ? '270px'
                        : isOpen && !isMac && !isMobile ? '380px'
                            : !isOpen && !isMobile ? '83px' : '0px',
                transition: {
                    duration: 0.5,
                    type: 'spring',
                    damping: 15
                },
                position: isMobile ? 'absolute' : 'inherit',
                zIndex: 10
            }} className='block fixed '>

                {/* //--------------------------------------------------------------drawer content */}
                <AnimatePresence>

                    {
                        isOpen ?
                            <motion.div
                                variants={showAnimation}
                                initial='hidden'
                                animate='show'
                                exit='hidden'
                                transition={{ type: 'spring' }}
                                className='bg-seccondaryColor flex flex-col h-screen relative sm:h-screen '>
                                <a
                                //href="javascript:void(Tawk_API.showWidget())"
                                >

                                    <Image
                                        onClick={() => router.replace('/')}
                                        className='my-[32px] mx-auto cursor-pointer h-auto w-auto mac:my-[17px] mac:mx-auto sm:hidden '
                                        src="/logo3.svg"
                                        alt="Logo"
                                        width={isMac ? 108 : 175}
                                        height={isMac ? 23 : 17}
                                        loading="eager"
                                        priority
                                    />
                                </a>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1, type: 'spring' }}
                                    className='col-12 flex flex-col border-t-[1px] border-t-grayColor border-b-[1px] border-b-grayColor py-0 px-[5px] sm:p-0 '>
                                    <div className='col-12 flex flex-row items-center justify-between pt-[20px] pb-[18px] mac:py-[15px] mac:px-0 sm:pt-[10px] sm:pr-[5px] sm:pb-[7px] sm:pl-[5px] sm:border-b-[1px] sm:border-b-grayColor sm:mb-[7px] '>
                                        <button
                                            onClick={async () => NewEssay()}
                                            className='bg-grayColor flex lg:mac:flex-row items-center text-whiteText text-[24px] font-normal leading-[28px] mr-[8px] ml-[13px] flex-1 h-[52px] rounded-[8px] py-[16px] px-[10px] cursor-pointer hover:bg-primaryColor mac:text-[16px] mac:p-0 mac:mr-[8px] mac:py-0 mac:ml-0 mac:h-[48px] sm:text-[14px] sm:font-bold sm:h-[40px] sm:flex-row-reverse sm:px-0 sm:ml-[7px] '>
                                            <AiOutlinePlus className='ml-[16px] text-whiteText text-[30px] font-bold mr-[13px] mac:text-[25px] mac:mr-[5px] ' />
                                            {'New IELTS Writing'}
                                        </button>
                                        <button
                                            aria-label="close drawer button"
                                            onClick={() => { setIsOpen(false); setAnchorEl(false) }}
                                            className='hover:bg-primaryColor h-[52px] w-[55px] bg-grayColor mac:h-[48px] mac:w-[40px] sm:w-[45px] sm:h-[45px] '>
                                            <div><IoIosArrowBack className='text-whiteText text-[30px] font-bold ' /></div>
                                        </button>
                                    </div>

                                    <div className='col-12 flex flex-row justify-between h-fit mt-[10px] items-end mac:mt-0 sm:px-[7px] ' >
                                        {
                                            Tabs.map((tab, index) => <button
                                                key={index}
                                                aria-label="task type button"
                                                onClick={() => SelectType(tab.value)}
                                                className={" text-whiteText text-center text-[18px] font-medium leading-normal p-0 rounded-t-[8px] w-[32%] rounded-b-[0px] hover:shadow-none hover:bg-primaryColor mac:text-[12px] sm:text-[13px] sm:w-[80px] " + (topicsType === tab.value ? 'bg-primaryColor lg:h-[42px] mac:h-[38px] sm:h-[28px] ' : 'bg-grayColor lg:h-[40px] mac:h-[38px] sm:h-[28px] ')}>
                                                {tab.label}</button>)
                                        }
                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5, type: 'spring' }}
                                    className='col-12 flex flex-1 overflow-hidden sm:pt-[8px] '>
                                    {topicsLoading ?
                                        <Loading style={{ height: '100%', minHeight: 0 }} />
                                        :
                                        <TopicsList Topics={topics} HandleSelect={SelectTopic}
                                            GetTopicsList={GetTopicsList} MoreTopics={MoreTopics}
                                            HandleDelete={DeleteTopic} type={topicsType} selectedTopic={essayTopic ? essayTopic : undefined}
                                        />
                                    }
                                </motion.div>

                                <DashboardPopOver anchorEl={anchorEl} handlePopOverClose={handlePopOverClose}
                                    LogOut={LogOut} showProfile={ShowProfile} />
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className='col-12 border-t-[1px] border-t-grayColor flex flex-row self-end h-[74px] pt-[2px] mac:h-[50px] sm:h-[42px] '>
                                    <button
                                        style={{ backgroundColor: anchorEl === false ? '#2E4057' : '#132740' }}
                                        aria-label="menu button"
                                        onClick={() => setAnchorEl(!anchorEl)}
                                        className='h-full rounded-0 border-r-grayColor border-r-[1px] w-[80px] flex items-center justify-center mac:w-[60px] sm:w-[40px] '>
                                        {
                                            isMobile ?
                                                <FiMoreVertical className='text-whiteText text-[25px] ' />
                                                :
                                                <TfiMenu className='text-whiteText text-[30px] mac:text-[25px] ' />
                                        }
                                    </button>
                                    <div className='h-full flex items-center pl-[20px] text-whiteText text-[20px] font-light leading-[12px] mac:text-[14px] sm:text-[13px] '>
                                        Welcome  {profile ? profile.firstName + ' ' + profile.lastName :
                                            <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}
                                    </div>
                                </motion.div>
                            </motion.div>
                            :
                            <motion.div
                                variants={showAnimation}
                                initial='hidden'
                                animate='show'
                                exit='hidden'
                                className='bg-seccondaryColor w-[80px] h-screen flex flex-col items-center '>
                                <Image
                                    className='h-[69px] w-[19px] my-[12px] mx-0 sm:hidden '
                                    src="/dashboard/W W AI.svg"
                                    alt="Logo"
                                    loading="eager"
                                    width={19}
                                    height={69}
                                    priority
                                />

                                <div className='border-t-[1px] border-t-grayColor w-full py-[12px] px-[13px] flex items-center justify-center sm:hidden '>
                                    <button
                                        aria-label="open drawer button"
                                        onClick={() => setIsOpen(true)}
                                        className='bg-grayColor rounded-[8px] h-[52px] w-[55px] flex items-center justify-center mac:p-[10px] '>
                                        <div>
                                            <IoIosArrowForward className='text-whiteText text-[30px] font-bold ' />
                                        </div>
                                    </button>
                                </div>

                                {/* <div className={'col-12 ' + styles.leftTabBarButton}>
                                    <button
                                        aria-label="menu button"
                                        onClick={() => { setIsOpen(true); setAnchorEl(true) }}
                                        className={isOpen ? styles.menuButton : styles.menuButtonOpen}>
                                        <TfiMenu className={styles.menuIcon} />
                                    </button>
                                </div> */}
                            </motion.div>
                    }

                    {/* //--------------------------------------------------------------drawer content */}
                </AnimatePresence>
            </motion.div >

            <main className={' flex-1 h-screen overflow-hidden block ' + (isOpen && isMobile ? styles.mask : '')}>

                {/* //-------------------------------------------------------------dashboard content */}
                {
                    isMobile &&
                    <div
                        className='flex flex-row items-center justify-between bg-seccondaryColor w-full h-[45px] '>

                        <button
                            aria-label="menu button"
                            onClick={() => setIsOpen(true)}
                            className='py-0 px-[10px] '>
                            <TfiMenu className='text-whiteText text-[25px] ' />
                        </button>

                        <Image
                            className='h-[17px] w-[175px] '
                            src="/logo3.svg"
                            alt="Logo"
                            loading="eager"
                            width={175}
                            height={17}
                            priority
                        />

                        <button
                            aria-label="new essay button"
                            onClick={async () => NewEssay()}
                            className='p-0 h-[35px] w-[35px] items-center justify-center mr-[5px] bg-grayColor '>
                            <AiOutlinePlus className=' text-whiteText text-[24px] ' />
                        </button>

                    </div>
                }
                <div className='flex flex-1 h-screen lg:flex-row mac:flex-row overflow-y-hidden pr-[10px] sm:flex-col sm:pr-0 '>
                    <div
                        id="scrollableDiv"
                        style={!isMobile ? tabBarLoc ? { paddingTop: 40 } : { paddingTop: 150 } : {}}
                        className='flex lg:flex-col mac:flex-col flex-1 h-full relative overflow-y-auto items-start justify-start sm:pt-0 '>

                        {!isMobile &&
                            !endAnimation && currentStepIndex !== 0 &&
                            <motion.div
                                className='lg:flex mac:flex absolute lg:flex-col mac:flex-col top-[16px] pt-[30px] pr-[95px] pb-0 pl-[90px] h-[100px] w-full overflow-hidden z-[2] mac:pt-[28px] mac:pr-[22px] mac:pb-0 mac:pl-[22px] sm:hidden sm:h-0 '
                                animate={{ y: tabBarLoc ? type === 'general_task_1' ? 814 : type === 'academic_task_1' ? 1319 : 714 : 0 }}
                                transition={{ type: "spring", duration: 2 }}
                            >
                                <div className='h-[64px] lg:flex mac:flex bg-seccondaryColor w-full rounded-[8px] overflow-hidden mac:h-[50px] mac:p-0  sm:hidden'>
                                    {
                                        tabBarItems.map((item, index) =>
                                            <div
                                                style={{ cursor: 'context-menu' }}
                                                className={'flex flex-1 items-center justify-center text-whiteText text-center text-[20px] font-medium leading-normal cursor-pointer py-0 px-[40px] rounded-[8px] h-[64px] mac:h-[50px] mac:text-[16px] ' + (0 === index && !tabBarLoc ? 'bg-primaryColor' : '')}
                                                key={index} >
                                                <span
                                                    className={0 === index && !tabBarLoc ? "underline " : ''}
                                                    style={!item.active ? { opacity: 0.5, cursor: 'context-menu' } : {}}>{item.title}</span>
                                                {!item.active && <Lock className='text-whiteText ml-5px' />}
                                            </div>
                                        )
                                    }
                                </div>
                            </motion.div>
                        }
                        <div
                            className='col-12 flex flex-1 flex-col pb-[100px] sm:pb-0 min-h-full '>
                            {step}
                        </div>
                    </div>

                </div>
                {/* //-------------------------------------------------------------dashboard content */}

            </main >

            <Modal isOpen={showProfileModal} setIsOpen={changeShowProfileModal} key={0}>
                <ProfileCard profile={profile} closeProfile={changeShowProfileModal} setProfile={setProfile} />
            </Modal>

            <TokenErrorCard showImage={showImage} handleCancelImageModal={handleCancelImageModal} />

        </div >
};