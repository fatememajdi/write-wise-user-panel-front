import React from "react";
import Popover from '@mui/material/Popover';
import { useRouter } from "next/navigation";

//--------------------------------styles
import styles from './dashboardPopOver.module.css';

//--------------------------------icons
import { User, Wallet, Support } from '../../../public/dashboard';

//--------------------------------components
import { StartLoader } from "@/components/Untitled";

interface _props {
    anchorEl: HTMLButtonElement | null,
    handlePopOverClose: any
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

const DashboardPopOver: React.FC<_props> = ({ anchorEl, handlePopOverClose }) => {

    const router = useRouter();
    const Open = Boolean(anchorEl);
    const id = Open ? 'simple-popover' : undefined;

    return <Popover
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
        </div>
    </Popover>
};

export default DashboardPopOver;