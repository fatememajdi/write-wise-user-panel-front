/* eslint-disable react/jsx-key */
'use client';
import React from "react";
import Image from "next/image";
import { styled } from '@mui/material/styles';
import { useSession } from "next-auth/react";
import Popover from '@mui/material/Popover';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';

//-----------------------------------------styles
import styles from './dashboard.module.css';

//-----------------------------------------components
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
import Loading from "@/components/loading/loading";
import ChooseType from "./essay/chooseType";
import Writings from "./essay/writings";

//-----------------------------------------icons
import { User, Wallet, Support, Progress, Lock } from '../../../public/dashboard';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { AiOutlinePlus } from 'react-icons/ai';
import { TfiMenu } from 'react-icons/tfi';

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
        route: ''
    },
    {
        title: 'Wallet',
        icon: Wallet,
        route: ''
    },
    {
        title: 'Progress',
        icon: Progress,
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
        active: false
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

const Dashboard: React.FC = () => {
    const { goTo, currentStepIndex, step } = useMultiStepForm([<GeneralTask1 />, <AcademicTask1 />, <Task2 />]);
    const [dashboardContentStep, changeDashboardContentStep] = React.useState<number>(0);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [endAnimation, changeEndAnimation] = React.useState<boolean>(false);
    const [tabBarLoc, changeTabBarLoc] = React.useState<boolean>(false);
    const { data: session, status } = useSession({ required: true });
    const [loading, setLoading] = React.useState<boolean>(true);
    const [type, setType] = React.useState('general_task_1');
    const [open, setOpen] = React.useState<boolean>(true);

    const Open = Boolean(anchorEl);
    const id = Open ? 'simple-popover' : undefined;

    function ChangeType(type: string) {
        setType(type);
        changeDashboardContentStep(1);
    }

    //------------------------------------------------------------------check user loged in
    React.useEffect(() => {
        if (!localStorage.getItem('user')) {
            if (status != "loading") {
                if (status === 'authenticated') {
                    localStorage.setItem('user', session.user.token);
                    setLoading(false);
                }
                else {
                    console.log('please signIn');
                }
            }
        } else
            setLoading(false);
    });

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

    if (loading)
        return <Loading />
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
                        priority
                    />
                    <div className={'col-12 ' + styles.tabsContainer}>
                        <div className={'col-12 ' + styles.newEssayContainer}>
                            <button
                                onClick={async () => {
                                    await changeTabBarLoc(false);
                                    await changeEndAnimation(false);
                                    await changeDashboardContentStep(0);
                                }}
                                className={styles.newEssayButton}>New essay <AiOutlinePlus className={styles.plusIcon} /></button>
                            <button
                                onClick={handleDrawerClose}
                                className={styles.arrowLeftButton}><div><IoIosArrowBack className={styles.arrowIcon} /></div></button>
                        </div>

                        <div className={'col-12 ' + styles.taskTabsContainer}>

                            <button
                                onClick={() => goTo(0)}
                                className={currentStepIndex === 0 ? styles.activeTaskTabButton : styles.taskTabButton} >
                                Gen Task 1</button>

                            <button
                                onClick={() => goTo(1)}
                                className={currentStepIndex === 1 ? styles.activeTaskTabButton : styles.taskTabButton} >
                                Ac Task 1</button>

                            <button
                                onClick={() => goTo(2)}
                                className={currentStepIndex === 2 ? styles.activeTaskTabButton : styles.taskTabButton} >
                                Task 2</button>

                        </div>
                    </div>
                    <div className={'col-12 ' + styles.drawerContent}>
                        {step}
                    </div>
                    <div className={'col-12 ' + styles.drawerFooterContainer}>
                        <button
                            onClick={handlePopOverOpen}
                            className={styles.menuButton}>
                            <TfiMenu className={styles.menuIcon} />
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
                        <div className={styles.leftTabBar}>
                            <Image
                                className={styles.briefLogo}
                                src="/dashboard/W W AI.svg"
                                alt="Logo"
                                width={19}
                                height={69}
                                priority
                            />

                            <div className={styles.openDrawerButtonCard}>
                                <button
                                    onClick={handleDrawerOpen}
                                    className={styles.openDrawerButton}>
                                    <div><IoIosArrowForward className={styles.arrowIcon} /></div>
                                </button>
                            </div>

                            <div className={'col-12 ' + styles.leftTabBarButton}>
                                <button
                                    onClick={handlePopOverOpen}
                                    className={styles.menuButton}>
                                    <TfiMenu className={styles.menuIcon} />
                                </button>
                            </div>
                        </div>
                    }

                    <div
                        style={tabBarLoc ? { paddingTop: 40 } : { paddingTop: 150 }}
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
                            {
                                dashboardContentStep === 0 ?
                                    <ChooseType changeType={ChangeType} /> :
                                    <Writings type={type} changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} />
                            }
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
                            <a key={index} className={styles.menuItemCard}>
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

//----------------------------------------------------fake data
const tasks = [
    {
        title: 'Short name of essay ',
        score: '6',
        date: 'JAN 18'
    },
    {
        title: 'Short name of essay ',
        score: '6',
        date: 'JAN 18'
    },
    {
        title: 'Short name of essay ',
        score: '6',
        date: 'JAN 18'
    },
]

const GeneralTask1: React.FC = () => {
    return <div className={'col-12 ' + styles.tasksContainer}>
        {
            tasks.map((item, index) => <div className={'col-12 ' + styles.taskCard} key={index}>
                <div className={styles.taskCardTitle}>
                    {item.title}
                    <span>{item.date}</span>
                </div>
                <div className={styles.taskCardScore}>
                    {item.score}
                </div>
            </div>)
        }
    </div>
};

const AcademicTask1: React.FC = () => {
    return <div className={'col-12 ' + styles.tasksContainer}>
        {
            tasks.map((item, index) => <div className={'col-12 ' + styles.taskCard} key={index}>
                <div className={styles.taskCardTitle}>
                    {item.title}
                    <span>{item.date}</span>
                </div>
                <div className={styles.taskCardScore}>
                    {item.score}
                </div>
            </div>)
        }
    </div>
};


const Task2: React.FC = () => {
    return <div className={'col-12 ' + styles.tasksContainer}>
        {
            tasks.map((item, index) => <div className={'col-12 ' + styles.taskCard} key={index}>
                <div className={styles.taskCardTitle}>
                    {item.title}
                    <span>{item.date}</span>
                </div>
                <div className={styles.taskCardScore}>
                    {item.score}
                </div>
            </div>)
        }
    </div>
};
