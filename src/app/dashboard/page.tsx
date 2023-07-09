/* eslint-disable react/jsx-key */
'use client';
import React from "react";
import Image from "next/image";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Popover from '@mui/material/Popover';

//-----------------------------------------styles
import styles from './dashboard.module.css';

//-----------------------------------------components
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
import Essay from "./Essay";
import Score from "./score";

//-----------------------------------------icons
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';
import { TfiMenu } from 'react-icons/tfi';
import { User, Wallet, Support, Progress, Lock } from '../../../public/dashboard';

const drawerWidth = 400;

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

const Dashboard: React.FC = () => {
    const { goTo, currentStepIndex, step } = useMultiStepForm([<GeneralTask1 />, <AcademicTask1 />, <Task2 />])
    const [open, setOpen] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const Open = Boolean(anchorEl);
    const id = Open ? 'simple-popover' : undefined;

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
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
            <div className={'col-12 ' + styles.dashboardLeftCard}>
                <Image
                    className={styles.logo}
                    src="/logo3.svg"
                    alt="Logo"
                    width={205}
                    height={15}
                    priority
                />
                <div className={'col-12 ' + styles.tabsContainer}>
                    <div className={'col-12 ' + styles.newEssayContainer}>
                        <button className={styles.newEssayButton}>New essay <AiOutlinePlus className={styles.plusIcon} /></button>
                        <button
                            onClick={handleDrawerClose}
                            className={styles.arrowLeftButton}><IoIosArrowBack className={styles.arrowIcon} /></button>
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
                        onClick={handleClick}
                        className={styles.menuButton}>
                        <TfiMenu className={styles.menuIcon} />
                    </button>
                    <div className={styles.drawerFooterText}>
                        Welcome  user name
                    </div>
                </div>
            </div>
        </Drawer>

        <Main open={open} style={{ padding: 0 }}>

            <DashboardContent drawerOpen={open} handlePopOverOpen={handleClick} handleDrawerOpen={handleDrawerOpen} />

        </Main>

        <Popover
            id={id}
            open={Open}
            anchorEl={anchorEl}
            onClose={handleClose}
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


interface _props {
    drawerOpen: Boolean;
    handleDrawerOpen: any;
    handlePopOverOpen: any;
}

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

const DashboardContent: React.FC<_props> = ({ drawerOpen, handleDrawerOpen, handlePopOverOpen }) => {
    const [tabBarLoc, changeTabBarLoc] = React.useState<boolean>(false);
    const [endAnimation, changeEndAnimation] = React.useState<boolean>(false);
    const [writingCardStep, changeWritingCardStep] = React.useState<number>(0);
    const { goTo, currentStepIndex, step } = useMultiStepForm(
        [<Essay tabBarLoc={tabBarLoc} changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation}/>, <Score />])

    return <div className={styles.dashboardContentContainer}>
        {!drawerOpen &&
            <div className={styles.leftTabBar}>
                <div className={'col-12 ' + styles.leftTabBarButton}>
                    <button
                        onClick={handleDrawerOpen}
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
                                onClick={() => {
                                    if (item.active && !tabBarLoc) goTo(index)
                                    else if (item.active) changeWritingCardStep(index);
                                }}
                                style={!item.active ? { cursor: 'context-menu' } : {}}
                                className={currentStepIndex === index && !tabBarLoc ? styles.activeTopTabBarItemCard + ' ' + styles.topTabBarItemCard
                                    : writingCardStep === index && tabBarLoc ? styles.activeTopTabBarItemCard + ' ' + styles.topTabBarItemCard
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

            {step}

        </div>

    </div>
};
