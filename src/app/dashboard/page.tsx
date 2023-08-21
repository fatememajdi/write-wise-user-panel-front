/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
'use client';
import React, { lazy } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import client from '@/config/applloAuthorizedClient';
import { AnimatePresence, motion } from 'framer-motion';
import ReactLoading from 'react-loading';
import { useMediaQuery } from 'react-responsive';

//-----------------------------------------------------styles
import styles from './dashboard.module.css';

//-----------------------------------------------------components
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
import { DELETE_TOPIC, GET_PROFILE, GET_USER_ESSAY, GET_USER_TOPICS } from "@/config/graphql";
const Loading = dynamic(() => import("@/components/loading/loading"));
const DashboardPopOver = dynamic(() => import("@/components/dashboardPopOver/dashboardPopOver"));
const ChooseType = lazy(() => import("./essay/chooseType/chooseType"));
const Task = lazy(() => import("./essay/task/task"));
const TopicsList = lazy(() => import("@/components/topicsList/topicsList"));
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

interface topic {
    id: string,
    body: string
};

const Dashboard: React.FC = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });

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
    const [userName, setuserName] = React.useState<string>();
    const [isOpen, setIsOpen] = React.useState<boolean>(!isMobile);
    const [MoreEssaies, changeMoreEssaies] = React.useState<boolean>(true);
    const [MoreTopics, changeMoreTopics] = React.useState<boolean>(true);
    const [topicsLoading, changeTopicsLoading] = React.useState<boolean>(true);
    const [topics, changeTopics] = React.useState<Topic[]>([]);
    const [topicsType, setTopicsType] = React.useState('general_task_1');
    const [type, setType] = React.useState('');
    const [essaies, setEssaies] = React.useState<Essay[]>([]);
    const router = useRouter();
    const [essayTopic, changeTopic] = React.useState<topic | null>();
    const { step, goTo } = useMultiStepForm([
        <ChooseType changeType={ChangeType} />,
        <Task
            setEssaies={setEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} handleNewTopic={handleNewTopic}
            essaies={essaies} GetUserEssaies={GetUserEssaies} changeTabBarLoc={changeTabBarLoc} divRef={divRef} type={type}
            changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={essayTopic != null ? essayTopic : undefined} />
    ]);

    function ChangeType(type: string) {
        setType(type);
        if (topicsType !== type)
            SelectType(type);
        goTo(1);
    };

    async function SelectTopic(topic?: topic) {
        changeTabBarLoc(true);
        changeEndAnimation(true);
        setEssaies([]);
        changeMoreEssaies(true);
        changeTopic(topic);
        if (divRef)
            divRef.scrollTop = divRef.offsetTop;
        goTo(1);
        if (isMobile)
            setIsOpen(false);
    };

    async function DeleteTopic(id: string) {
        await client.mutate({
            mutation: DELETE_TOPIC,
            variables: {
                id: id
            }
        }).then(async (res) => {
            await changeTopics(topics.filter(item => item.id !== id));
            changeTabBarLoc(false);
            changeEndAnimation(false);
            setEssaies([]);
            changeMoreEssaies(true);
            changeTopic(null);
            goTo(0);
        }).catch((err) => {
            console.log("delete topic error : ", err);
        });
    };

    //----------------------------------------------------------------get user essaies
    async function GetUserEssaies(id: string) {
        await client.query({
            query: GET_USER_ESSAY,
            variables: {
                id: id,
                page: essaies.length + 1,
                pageSize: 1
            },
            fetchPolicy: "no-cache"
        }).then(async (res) => {
            if (res.data.getUserEssay.essaies.length != 0) {
                await setEssaies([...essaies, ...res.data.getUserEssay.essaies]);
                // changeEssayPage(essayPage + 1);
            } else {
                changeMoreEssaies(false);
            }
        }).catch((err) => {
            console.log('get users essay error : ', err)
        });
    };

    //----------------------------------------------------------------get topics list
    async function GetTopicsList(type?: string) {
        await client.query({
            query: GET_USER_TOPICS,
            variables: {
                type: type ? type : topicsType,
                page: topics.length + 1,
                pageSize: topics.length === 0 ? 6 : 1
            },
            fetchPolicy: "no-cache"
        }).then(async (res) => {
            if (res.data.getUserTopics.userTopics.length != 0) {
                await changeTopics([...topics, ...res.data.getUserTopics.userTopics]);
            } else {
                changeMoreTopics(false);
            }
        }).catch((err) => {
            console.log("get user topics error : ", err);
        });
    };

    async function SelectType(type: string) {
        changeTopicsLoading(true);
        await setTopicsType(type);
        changeMoreTopics(true);
        await client.query({
            query: GET_USER_TOPICS,
            variables: {
                type: type,
                page: 1,
                pageSize: 6
            },
            fetchPolicy: "no-cache"
        }).then(async (res) => {
            console.log(res);
            await changeTopics(res.data.getUserTopics.userTopics);
        }).catch((err) => {
            console.log("get user topics error : ", err);
        });
        changeTopicsLoading(false);
    };

    async function NewEssay() {
        setEssaies([]);
        changeMoreEssaies(false);
        changeTopic(null)
        changeTabBarLoc(false);
        changeEndAnimation(false);
        changeTopic(null);
        goTo(0);
        if (isMobile)
            setIsOpen(false);
    };

    async function GetProfile() {
        await client.query({
            query: GET_PROFILE
        }).then(async (res) => {
            setuserName(res.data.getUserProfile.firstName + ' ' + res.data.getUserProfile.lastName);
        }).catch((err) => {
            console.log("get user profile error : ", err);
        });
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
        }
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
        }
    }, []);

    const handlePopOverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

    async function handleNewTopic(topic: Topic) {
        if (topic)
            await changeTopics([topic, ...topics]);
        else {
            changeTopicsLoading(true);
            await changeTopics([]);
            await GetTopicsList();
            changeTopicsLoading(false);
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
                                <Image
                                    className={styles.logo}
                                    src="/logo3.svg"
                                    alt="Logo"
                                    width={isMac ? 108 : 175}
                                    height={isMac ? 23 : 17}
                                    loading="eager"
                                    priority
                                />

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2.3 }}
                                    className={'col-12 ' + styles.tabsContainer}>
                                    <div className={'col-12 ' + styles.newEssayContainer}>
                                        <button
                                            onClick={async () => NewEssay()}
                                            className={styles.newEssayButton}><AiOutlinePlus className={styles.plusIcon} />New essay
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
                                            Gen Task 1</button>

                                        <button
                                            style={{ cursor: 'unset', opacity: 0.6 }}
                                            disabled={true}
                                            aria-label="academic task1 button"
                                            onClick={() => SelectType('academic_task_1')}
                                            className={topicsType === 'academic_task_1' ? styles.activeTaskTabButton : styles.taskTabButton} >
                                            Ac Task 1</button>

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
                                    transition={{ duration: 2.3 }}
                                    className={'col-12 ' + styles.drawerContent}>
                                    {topicsLoading ?
                                        <Loading style={{ height: '100%', minHeight: 0 }} />
                                        :
                                        <TopicsList Topics={topics} HandleSelect={SelectTopic}
                                            GetTopicsList={GetTopicsList} MoreTopics={MoreTopics}
                                            HandleDelete={DeleteTopic} type={topicsType}
                                        />
                                    }
                                </motion.div>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 2.3 }}
                                    className={'col-12 ' + styles.drawerFooterContainer}>
                                    <button
                                        aria-label="menu button"
                                        onClick={handlePopOverOpen}
                                        className={styles.menuButton}>
                                        <TfiMenu className={styles.menuIcon} />
                                        <FiMoreVertical className={styles.moreIcon} />
                                    </button>
                                    <div className={styles.drawerFooterText}>
                                        Welcome  {userName ? userName : <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}
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
                            !endAnimation &&
                            <motion.div
                                className={styles.topTabBarContainer}
                                animate={{ y: tabBarLoc ? 810 : 0 }}
                                transition={{ type: "spring", duration: 2 }}
                            >
                                {/* <div
                                style={endAnimation ? { display: 'none' } : { display: 'flex' }}
                                className={tabBarLoc ? styles.topTabBarContainerAnimation : styles.topTabBarContainer}> */}
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

                                {/* </div> */}
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

            <DashboardPopOver anchorEl={anchorEl} handlePopOverClose={handlePopOverClose} />

        </div >
};

export default Dashboard;
