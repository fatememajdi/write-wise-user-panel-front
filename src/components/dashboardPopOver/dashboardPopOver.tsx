import React from "react";
import Popover from '@mui/material/Popover';
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { signOut } from 'next-auth/react';
import { useSession } from "next-auth/react";

//--------------------------------styles
import styles from './dashboardPopOver.module.css';

//--------------------------------icons
import { User, Wallet, Support } from '../../../public/dashboard';
import { RxExit } from 'react-icons/rx';

//--------------------------------components
import { StartLoader } from "@/components/Untitled";
const DialogComponent = dynamic(() => import("../../components/dialog/dialog"), { ssr: false });

interface _props {
    anchorEl: HTMLButtonElement | null,
    handlePopOverClose: any,
    LogOut: any
}

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
];

const DashboardPopOver: React.FC<_props> = ({ anchorEl, handlePopOverClose, LogOut }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const router = useRouter();
    const Open = Boolean(anchorEl);
    const id = Open ? 'simple-popover' : undefined;

    function handleClose() {
        setOpen(false);
    };

    async function handleDelete() {
        setOpen(false);
        await LogOut();
    }

    return <>
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
                    menuItems.map((item, index) =>
                        <a
                            onClick={() => {
                                router.push(item.route);
                                StartLoader();
                            }}
                            key={index} className={styles.menuItemCard}>
                            <item.icon />
                            <span> {item.title}</span>
                        </a>
                    )
                }
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
    </>
};

export default DashboardPopOver;