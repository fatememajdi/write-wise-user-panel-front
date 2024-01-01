/* eslint-disable react/jsx-no-target-blank */
import React from "react";
import Popover from '@mui/material/Popover';
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from "next/navigation";

//--------------------------------styles
import styles from './dashboardPopOver.module.css';

//--------------------------------icons
import { RxExit } from 'react-icons/rx';
import { FaCircleUser } from "react-icons/fa6";
import { IoMdWallet } from "react-icons/io";
import { MdOutlineSupportAgent } from "react-icons/md";

//--------------------------------components
import { StartLoader } from "@/components/Untitled";
import client from "@/config/applloClient";
import { IS_FROM_IRAN } from "@/config/graphql";
const DialogComponent = dynamic(() => import("../../components/dialog/dialog"), { ssr: false });

interface _props {
    anchorEl: boolean,
    handlePopOverClose: any,
    LogOut: any,
    page?: string,
    showProfile: any
};

const menuItems = [
    {
        title: 'Profile',
        icon: FaCircleUser,
        route: '/profile'
    },
    {
        title: 'Wallet',
        icon: IoMdWallet,
        route: '/wallet'
    }
];

export default function DashboardPopOver({ anchorEl, handlePopOverClose, LogOut, page, showProfile }: _props) {
    const [open, setOpen] = React.useState<boolean>(false);
    const router = useRouter();
    const [fromIran, setFromIran] = React.useState<boolean>(false);

    async function CheckCountry() {
        await client.query({
            query: IS_FROM_IRAN,
            fetchPolicy: "no-cache"
        }).then(async (res) => {
            setFromIran(res.data.isFromIran);
        }).catch((err) => {
            console.log("get county error : ", err);
        });
    };

    function handleClose() {
        setOpen(false);
    };

    async function handleDelete() {
        setOpen(false);
        await LogOut();
    };

    React.useEffect(() => {
        CheckCountry();
    }, []);

    return <AnimatePresence>

        <motion.div
            className={styles.popOver}
            animate={anchorEl ? { height: 'fit-content', width: '100%' } : { height: 0 }}
            transition={{ duration: 0.5, type: 'spring' }}
        >
            <div className={styles.popOverCard}>
                {
                    menuItems.filter(item => item.route !== page).map((item, index) =>
                        <a
                            onClick={() => {
                                if (item.title === 'Profile') {
                                    handlePopOverClose();
                                    showProfile(true);
                                } else {
                                    router.push(item.route);
                                    StartLoader();
                                }
                            }}
                            key={index} className={styles.menuItemCard}>
                            <item.icon className={styles.exitIcon} />
                            <span> {item.title}</span>
                        </a>
                    )
                }
                <a target="_blank" href={fromIran ? 'https://www.goftino.com/c/7aFKEK' : 'https://tawk.to/chat/651990a910c0b257248765ee/1hbmfd0ck'} key={3} className={styles.menuItemCard}>
                    <MdOutlineSupportAgent className={styles.exitIcon} />
                    <span>Support</span>
                </a>
                <button
                    onClick={() => setOpen(true)}
                    className={styles.logOutButton}
                    aria-label="logout button"
                >
                    <RxExit className={styles.exitIcon} /> Log out
                </button>
            </div>
        </motion.div>

        <DialogComponent open={open} handleClose={handleClose} handleDelete={handleDelete}
            title="Log out" dialog="Are you sure you want to log out?" deleteButton='Log out' />

    </AnimatePresence>
};

{/* <>
        <Popover
            id={id}
            open={Open}
            anchorEl={anchorEl}
            onClose={handlePopOverClose}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'left',
            }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
        >
            <div className={styles.popOverCard}>
                {
                    menuItems.filter(item => item.route !== page).map((item, index) =>
                        <a
                            onClick={() => {
                                if (item.title === 'Profile') {
                                    handlePopOverClose();
                                    showProfile(true);
                                } else {
                                    router.push(item.route);
                                    StartLoader();
                                }
                            }}
                            key={index} className={styles.menuItemCard}>
                            <item.icon className={styles.exitIcon} />
                            <span> {item.title}</span>
                        </a>
                    )
                }
                <a target="_blank" href={fromIran ? 'https://www.goftino.com/c/7aFKEK' : 'https://tawk.to/chat/651990a910c0b257248765ee/1hbmfd0ck'} key={3} className={styles.menuItemCard}>
                    <MdOutlineSupportAgent className={styles.exitIcon} />
                    <span>Support</span>
                </a>
                <button
                    onClick={() => setOpen(true)}
                    className={styles.logOutButton}
                    aria-label="logout button"
                >
                    <RxExit className={styles.exitIcon} /> Log out
                </button>
            </div>
        </Popover>

        <DialogComponent open={open} handleClose={handleClose} handleDelete={handleDelete}
            title="Log out" dialog="Are you sure you want to log out?" deleteButton='Log out' />
    </> */}