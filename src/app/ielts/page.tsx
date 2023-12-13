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
const Loading = dynamic(() => import("@/components/loading/loading"));
const DashboardPopOver = dynamic(() => import("@/components/dashboardPopOver/dashboardPopOver"));
const ChooseType = dynamic(() => import("./essay/chooseType/chooseType"));
const Task = dynamic(() => import("./essay/task/task"));
const TopicsList = dynamic(() => import("@/components/topicsList/topicsList"));
const Modal = dynamic(() => import("@/components/modal/modal"));
const ProfileCard = dynamic(() => import("@/components/profileCard/profileCard"));
import { StopLoader } from "@/components/Untitled";

//----------------------------------------------------icons
import { Lock } from '../../../public/dashboard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { TfiMenu } from 'react-icons/tfi';
import { FiMoreVertical } from 'react-icons/fi';

//---------------------------------------------------types
import { Essay } from "../../../types/essay";
import { Topic } from "../../../types/topic";
import { UserProfile } from "../../../types/profile";
import { GetEsseies, GetScore, GetTopics, GetUserProfile } from "@/hooks/fetchData";
import { DeleteTopics } from "@/hooks/actions";

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

const Page: React.FC = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });
    const targetRef = React.useRef();
    let divRef: any;
    if (typeof document !== 'undefined')
        divRef = document.getElementById('scrollableDiv');
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
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
    const { step, goTo, currentStepIndex } = useMultiStepForm([
        <ChooseType changeType={ChangeType} />,
        <Task
            targetRef={targetRef} GetScores={GetScores}
            setEssaies={setEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} handleNewTopic={handleNewTopic}
            essaies={essaies} GetUserEssaies={GetUserEssaies} changeTabBarLoc={changeTabBarLoc} divRef={divRef} type={type} essay={essay}
            changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={essayTopic != null ? essayTopic : undefined} />
    ]);

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
        else
            console.log(socket.id);
        setType(type);
        if (topicsType !== type)
            SelectType(type);
        goTo(1);
    };

    async function SelectTopic(topic?: topic, essay?: string) {

        ChangeType(topic.type);
        changeTabBarLoc(true);
        changeEndAnimation(true);
        setEssaies([]);
        changeTopic(topic);
        // changeMoreEssaies(true);

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
        let Essaies: Essay[] = await GetEsseies(id, essaies.length);
        if (Essaies.length > 0)
            await setEssaies([...essaies, ...Essaies]);
        else
            changeMoreEssaies(false);
        if (Essaies.length % 10 !== 0)
            changeMoreEssaies(false);
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
        goTo(0);
        if (isMobile)
            setIsOpen(false);
    };

    async function GetProfile() { setProfile(await GetUserProfile()) };

    async function GetScores(essaies: Essay[], essay?: Essay) {
        let dev = await localStorage.getItem('devMode');
        let newEssay: Essay[] = essaies;
        await GetScore(essay ? essay.id : newEssay[0].id, dev ? JSON.parse(dev) : true)

    };

    //-------------------------------------------------------connect to socket
    const socketInitializer = async () => {
        const user = await localStorage.getItem("user");
        if (user)
            await setSocket(io("https://ielts.api.babyyodas.io/events", {
                // autoConnect: false,
                extraHeaders: {
                    authorization: `Bearer ${JSON.parse(user)}`
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
                            essay.essayInsights = data.data;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            await setEssaies(newEssay);
                        }
                        break;
                    }
                    case 'Recommendation': {
                        if (essay && !essay?.essayRecommendations) {
                            essay.essayRecommendations = data.data;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            setEssaies(newEssay);
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
                            essay.overallBandScore = data.data as number;
                            newEssay[essaies.findIndex(item => item.id === data.essayId)] = essay;
                            let newTopics: Topic[] = topics;
                            newTopics[topics.findIndex(item => item.id === essay.topicId)].overallBandScore = data.data;
                            changeTopics(newTopics);
                            setEssaies(newEssay);
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
                if (status === 'authenticated') {
                    localStorage.setItem('user', session.user.token);
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

    React.useEffect(() => {
        StopLoader();
        if (localStorage.getItem('user')) {
            if (MoreTopics) {
                changeTopicsLoading(true);
                GetTopicsList();
                changeTopicsLoading(false);
            }
            GetProfile();
        };
    }, []);

    const handlePopOverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

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
        return <div style={{ display: 'flex', flexDirection: 'row', position: 'relative' }}>
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
            }} className={styles.sideBard}>

                {/* //--------------------------------------------------------------drawer content */}
                <AnimatePresence>

                    {
                        isOpen ?
                            <motion.div
                                variants={showAnimation}
                                initial='hidden'
                                animate='show'
                                exit='hidden'
                                className={styles.dashboardLeftCard}>
                                <a
                                    href="javascript:void(Tawk_API.showWidget())">

                                    <Image
                                        onClick={() => router.push('/')}
                                        className={styles.logo}
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
                                    transition={{ duration: 1 }}
                                    className={'col-12 ' + styles.tabsContainer}>
                                    <div className={'col-12 ' + styles.newEssayContainer}>
                                        <button
                                            onClick={async () => NewEssay()}
                                            className={styles.newEssayButton}><AiOutlinePlus className={styles.plusIcon} />New IELTS Writing
                                        </button>
                                        <button
                                            aria-label="close drawer button"
                                            onClick={() => setIsOpen(false)}
                                            className={styles.arrowLeftButton}><div><IoIosArrowBack className={styles.arrowIcon} /></div></button>
                                    </div>

                                    <div className={'col-12 ' + styles.taskTabsContainer}>

                                        <button
                                            aria-label="general task1 button"
                                            onClick={() => SelectType('general_task_1')}
                                            className={topicsType === 'general_task_1' ? styles.activeTaskTabButton : styles.taskTabButton} >
                                            GT Task 1</button>

                                        <button
                                            aria-label="academic task1 button"
                                            onClick={() => SelectType('academic_task_1')}
                                            className={topicsType === 'academic_task_1' ? styles.activeTaskTabButton : styles.taskTabButton} >
                                            AC Task 1</button>

                                        <button
                                            aria-label="task2 button"
                                            onClick={() => SelectType('general_task_2')}
                                            className={topicsType === 'general_task_2' ? styles.activeTaskTabButton : styles.taskTabButton} >
                                            Task 2</button>

                                    </div>
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1.5 }}
                                    className={'col-12 ' + styles.drawerContent}>
                                    {topicsLoading ?
                                        <Loading style={{ height: '100%', minHeight: 0 }} />
                                        :
                                        <TopicsList Topics={topics} HandleSelect={SelectTopic}
                                            GetTopicsList={GetTopicsList} MoreTopics={MoreTopics}
                                            HandleDelete={DeleteTopic} type={topicsType} selectedTopic={essayTopic ? essayTopic : undefined}
                                        />
                                    }
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 1 }}
                                    className={'col-12 ' + styles.drawerFooterContainer}>
                                    <button
                                        style={{ backgroundColor: anchorEl === null ? '#2E4057' : '#132740' }}
                                        aria-label="menu button"
                                        onClick={handlePopOverOpen}
                                        className={styles.menuButton}>
                                        <TfiMenu className={styles.menuIcon} />
                                        <FiMoreVertical className={styles.moreIcon} />
                                    </button>
                                    <div className={styles.drawerFooterText}>
                                        Welcome  {profile ? profile.firstName + ' ' + profile.lastName : <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}
                                    </div>
                                </motion.div>
                            </motion.div>
                            :
                            <motion.div
                                variants={showAnimation}
                                initial='hidden'
                                animate='show'
                                exit='hidden'
                                className={styles.leftTabBar}>
                                <Image
                                    className={styles.briefLogo}
                                    src="/dashboard/W W AI.svg"
                                    alt="Logo"
                                    loading="eager"
                                    width={19}
                                    height={69}
                                    priority
                                />

                                <div className={styles.openDrawerButtonCard}>
                                    <button
                                        aria-label="open drawer button"
                                        onClick={() => setIsOpen(true)}
                                        className={styles.openDrawerButton}>
                                        <div><IoIosArrowForward className={styles.arrowIcon} /></div>
                                    </button>
                                </div>

                                <div className={'col-12 ' + styles.leftTabBarButton}>
                                    <button
                                        aria-label="menu button"
                                        onClick={handlePopOverOpen}
                                        className={isOpen ? styles.menuButton : styles.menuButtonOpen}>
                                        <TfiMenu className={styles.menuIcon} />
                                    </button>
                                </div>
                            </motion.div>
                    }

                    {/* //--------------------------------------------------------------drawer content */}
                </AnimatePresence>
            </motion.div >

            <main style={{ flex: 1, height: '100vh', overflow: 'hidden' }}
                className={isOpen && isMobile ? styles.mask : ''}
            >
                {/* //-------------------------------------------------------------dashboard content */}
                {
                    isMobile &&
                    <div
                        className={styles.topResponsiveTabBar}>

                        <button
                            aria-label="menu button"
                            onClick={() => setIsOpen(true)}
                            className={styles.responsiveMenuButton}>
                            <TfiMenu className={styles.responsiveMenuIcon} />
                        </button>

                        <Image
                            className={styles.responsiveLogo}
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
                            className={styles.responsivePlusButton}>
                            <AiOutlinePlus className={styles.responsivePlusIcon} />
                        </button>

                    </div>
                }
                <div className={styles.dashboardContentContainer}>
                    <div
                        id="scrollableDiv"
                        style={tabBarLoc ? { paddingTop: 40 } : { paddingTop: 150 }}
                        className={styles.dashboardContentRightContainer}>

                        {
                            !endAnimation && currentStepIndex !== 0 &&
                            <motion.div
                                className={styles.topTabBarContainer}
                                animate={{ y: tabBarLoc ? type === 'general_task_1' ? 814 : type === 'academic_task_1' ? 1319 : 714 : 0 }}
                                transition={{ type: "spring", duration: 2 }}
                            >
                                <div className={styles.topTabBarCard}>
                                    {
                                        tabBarItems.map((item, index) =>
                                            <div
                                                style={{ cursor: 'context-menu' }}
                                                className={0 === index && !tabBarLoc ? styles.activeTopTabBarItemCard + ' ' + styles.topTabBarItemCard
                                                    : styles.topTabBarItemCard}
                                                key={index} >
                                                <span
                                                    style={!item.active ? { opacity: 0.5, cursor: 'context-menu' } : {}}>{item.title}</span>
                                                {!item.active && <Lock className={styles.lockIcon} />}
                                            </div>
                                        )
                                    }
                                </div>
                            </motion.div>
                        }
                        <div
                            className={'col-12 ' + styles.essayContainer}>
                            {step}
                        </div>
                    </div>

                </div>
                {/* //-------------------------------------------------------------dashboard content */}

            </main >

            <DashboardPopOver anchorEl={anchorEl} handlePopOverClose={handlePopOverClose}
                LogOut={LogOut} showProfile={changeShowProfileModal} />

            <Modal isOpen={showProfileModal} setIsOpen={changeShowProfileModal} key={0}>
                <ProfileCard profile={profile} closeProfile={changeShowProfileModal} />
            </Modal>

        </div >
};

export default Page;
