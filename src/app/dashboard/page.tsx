/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/jsx-key */
'use client';
import React, { lazy } from "react";
import Image from "next/image";
import { styled } from '@mui/material/styles';
import { useSession } from "next-auth/react";
import Popover from '@mui/material/Popover';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import client from '@/config/applloAuthorizedClient';
import InfiniteScroll from 'react-infinite-scroller';

//-----------------------------------------styles
import styles from './dashboard.module.css';

//-----------------------------------------components
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
import { GET_USER_ESSAY, GET_USER_TOPICS } from "@/config/graphql";
const Loading = dynamic(() => import("@/components/loading/loading"));
const ChooseType = lazy(() => import("./essay/chooseType"));
const GeneralTask1 = lazy(() => import("./essay/generalTask1"));
const AcademicTask1 = lazy(() => import("./essay/academicTaks1"));
const Task2 = lazy(() => import("./essay/task2"));

//-----------------------------------------icons
import { User, Wallet, Support, Lock } from '../../../public/dashboard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { TfiMenu } from 'react-icons/tfi';
import { FiMoreVertical } from 'react-icons/fi';

//----------------------------------------types
import { Essay } from "../../../types/essay";
import { Topic } from "../../../types/topic";

const drawerWidth = 380;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    }),
}));

const menuItems = [
    {
        title: 'Profile',
        icon: User,
        route: '/profile'
    },
    {
        title: 'Wallet',
        icon: Wallet,
        route: ''
    },
    {
        title: 'Support',
        icon: Support,
        route: ''
    }
]

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

interface topic {
    id: string,
    body: string
}

const Dashboard: React.FC = () => {
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
    const [MoreEssaies, changeMoreEssaies] = React.useState<boolean>(true);
    const [MoreTopics, changeMoreTopics] = React.useState<boolean>(true);
    const [topics, changeTopics] = React.useState<Topic[]>([]);
    const [topicsType, setTopicsType] = React.useState('general_task_1');
    const [essaies, setEssaies] = React.useState<Essay[]>([]);
    const [open, setOpen] = React.useState<boolean>(true);
    const router = useRouter();
    const [essayTopic, changeTopic] = React.useState<topic | null>();
    const { step, goTo } = useMultiStepForm([<ChooseType changeType={ChangeType} />,
    <GeneralTask1
        setEssaies={setEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} handleNewTopic={handleNewTopic}
        essaies={essaies} GetUserEssaies={GetUserEssaies} changeTabBarLoc={changeTabBarLoc}
        changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={essayTopic != null ? essayTopic : undefined} />,
    <AcademicTask1 changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} />,
    <Task2 changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} />
    ])
    const Open = Boolean(anchorEl);
    const id = Open ? 'simple-popover' : undefined;

    function ChangeType(type: string, index: number) {
        goTo(index)
    }

    async function SelectTopic(topic: topic) {
        setEssaies([]);
        // changeEssayPage(1);
        changeMoreEssaies(true);
        changeTopic(topic);
        if (topicsType === 'general_task_1')
            goTo(1);
        else if (topicsType === 'academic_task_1')
            goTo(2)
        else
            goTo(3)
    }

    //----------------------------------------------------------------get user essaies
    async function GetUserEssaies(id: string) {
        await client.query({
            query: GET_USER_ESSAY,
            variables: {
                id: id,
                page: essaies.length + 1,
                pageSize: 1
            }
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
                page: Math.floor(topics.length / 6) + 1,
                pageSize: 6
            },
        }).then(async (res) => {
            if (res.data.getUserTopics.userTopics.length != 0) {
                await changeTopics([...topics, ...res.data.getUserTopics.userTopics])
                // changePage(page + 1);
            } else {
                changeMoreTopics(false);
            }
        }).catch((err) => {
            console.log("get user topics error : ", err);
        });
    };

    async function SelectType(type: string) {
        changeTopics([]);
        changeMoreTopics(true);
        setTopicsType(type);
        await GetTopicsList(type);
    };

    async function NewEssay() {
        setEssaies([]);
        changeMoreEssaies(false);
        changeTopic(null)
        changeTabBarLoc(false);
        changeEndAnimation(false);
        changeTopic(null);
        goTo(0);
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
        if (localStorage.getItem('user'))
            GetTopicsList();
    }, []);

    const handlePopOverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    async function handleNewTopic(topic: Topic) {
        await changeTopics([topic, ...topics]);
    }

    if (pageLoading)
        return <div
            style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        ><Loading /></div>
    else
        return <Box sx={{ display: 'flex' }}>
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}
            >
                {/* //--------------------------------------------------------------drawer content */}
                <div className={'col-12 ' + styles.dashboardLeftCard}>
                    <Image
                        className={styles.logo}
                        src="/logo3.svg"
                        alt="Logo"
                        width={175}
                        height={17}
                        loading="eager"
                        priority
                    />
                    <div className={'col-12 ' + styles.tabsContainer}>
                        <div className={'col-12 ' + styles.newEssayContainer}>
                            <button
                                aria-label="new essay button"
                                onClick={async () => NewEssay()}
                                className={styles.newEssayButton}>New essay <AiOutlinePlus className={styles.plusIcon} /></button>
                            <button
                                aria-label="close drawer button"
                                onClick={handleDrawerClose}
                                className={styles.arrowLeftButton}><div><IoIosArrowBack className={styles.arrowIcon} /></div></button>
                        </div>

                        <div className={'col-12 ' + styles.taskTabsContainer}>

                            <button
                                aria-label="general task1 button"
                                onClick={() => SelectType('general_task_1')}
                                className={topicsType === 'general_task_1' ? styles.activeTaskTabButton : styles.taskTabButton} >
                                Gen Task 1</button>

                            <button
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
                    </div>
                    <div className={'col-12 ' + styles.drawerContent}>
                        <UserTopicsList topics={topics} SelectTopic={SelectTopic} GetTopicsList={GetTopicsList} MoreTopics={MoreTopics} />
                    </div>
                    <div className={'col-12 ' + styles.drawerFooterContainer}>
                        <button
                            aria-label="menu button"
                            onClick={handlePopOverOpen}
                            className={styles.menuButton}>
                            <TfiMenu className={styles.menuIcon} />
                            <FiMoreVertical className={styles.moreIcon} />
                        </button>
                        <div className={styles.drawerFooterText}>
                            Welcome  user name
                        </div>
                    </div>
                </div>
                {/* //--------------------------------------------------------------drawer content */}

            </Drawer>

            <Main open={open} style={{ padding: 0 }}>
                {/* //-------------------------------------------------------------dashboard content */}
                <div className={styles.dashboardContentContainer}>
                    {!open &&
                        <>
                            <div className={styles.leftTabBar}>
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
                                        onClick={handleDrawerOpen}
                                        className={styles.openDrawerButton}>
                                        <div><IoIosArrowForward className={styles.arrowIcon} /></div>
                                    </button>
                                </div>

                                <div className={'col-12 ' + styles.leftTabBarButton}>
                                    <button
                                        aria-label="menu button"
                                        onClick={handlePopOverOpen}
                                        className={styles.menuButton}>
                                        <TfiMenu className={styles.menuIcon} />
                                    </button>
                                </div>
                            </div>
                            <div className={styles.topResponsiveTabBar}>

                                <button
                                    aria-label="menu button"
                                    onClick={handleDrawerOpen}
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
                        </>
                    }

                    <div style={tabBarLoc ? { paddingTop: 40 } : { paddingTop: 150 }}
                        className={styles.dashboardContentRightContainer}>

                        <div
                            style={endAnimation ? { display: 'none' } : { display: 'flex' }}
                            className={tabBarLoc ? styles.topTabBarContainerAnimation : styles.topTabBarContainer}>
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

                        </div>

                        <div className={'col-12 ' + styles.essayContainer}>
                            {step}
                        </div>

                    </div>

                </div>
                {/* //-------------------------------------------------------------dashboard content */}

            </Main>

            {/* -------------------------------------------------------------------popover menu card */}
            <Popover
                id={id}
                open={Open}
                anchorEl={anchorEl}
                onClose={handlePopOverClose}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <div className={styles.popOverCard}>
                    {
                        menuItems.map((item, index) =>
                            <a
                                onClick={() => router.push(item.route)}
                                key={index} className={styles.menuItemCard}>
                                <item.icon />
                                <span> {item.title}</span>
                            </a>
                        )
                    }
                </div>
            </Popover>
            {/* -------------------------------------------------------------------popover menu card */}

        </Box>
};

export default Dashboard;

//----------------------------------------------------------------------------------drawer data card
const UserTopicsList: React.FC<{ topics: any, SelectTopic: any, GetTopicsList: any, MoreTopics: boolean }> = ({ topics, SelectTopic, GetTopicsList, MoreTopics }) => {
    return <div className={'col-12 ' + styles.tasksContainer}>
        <InfiniteScroll
            pageStart={0}
            loadMore={() => GetTopicsList()}
            hasMore={MoreTopics}
            loader={<Loading style={{ height: 50, minHeight: 0 }} />}
            useWindow={false}
            key={0}
        >
            {
                topics.map((item: any, index: any) =>
                    <div
                        onClick={() => SelectTopic({ id: item.id, body: item.topic })}
                        className={'col-12 ' + styles.taskCard} key={index}>
                        <div className={styles.taskCardTitle}>
                            {item.shortName}
                            <span>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(item.createdAt))) + ' ' + new Date(item.createdAt).getDate()}</span>
                        </div>
                        <div className={styles.taskCardScore}>
                            {item.overallBandScore}
                        </div>
                    </div>)
            }
        </InfiniteScroll>
    </div>
};