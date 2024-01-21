/* eslint-disable react/jsx-no-target-blank */
import React from "react";
// import Popover from '@mui/material/Popover';
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from "next/navigation";

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

        {anchorEl &&
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => handlePopOverClose()}
                className=" bg-blackText/0 p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll overflow-x-hidden sm:p-[1px]"
            >
                <motion.div
                    className='h-0 lg:w-[380px] mac:w-[268px] overflow-hidden absolute z-10 right-0 left-0 bottom-[74px] max-h-fit mac:bottom-[50px] sm:bottom-[42px] sm:w-[268px] '
                    animate={anchorEl ? { height: 'fit-content'} : { height: 0 }}
                    transition={{ duration: 0.5, type: 'spring' }}
                >
                    <div className='flex flex-col bg-navyBlue pt-[4px] rounded-t-[8px] '>
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
                                    key={index}
                                    className='flex flex-row items-center text-whiteText text-[18px] font-normal leading-[28px] py-[16px] pr-[14px] pl-[40px] no-underline cursor-pointer hover:bg-primaryColor sm:text-[16px] sm:py-[10px] sm:px-[15px] sm:min-w-[170px] '>
                                    <item.icon className='text-[25px] mr-[18px] sm:text-[20px] sm:mr-[12px] ' />
                                    <span> {item.title}</span>
                                </a>
                            )
                        }
                        <a target="_blank" href={fromIran ? 'https://www.goftino.com/c/7aFKEK' : 'https://tawk.to/chat/651990a910c0b257248765ee/1hbmfd0ck'} key={3}
                            className='flex flex-row items-center text-whiteText text-[18px] font-normal leading-[28px] py-[16px] pr-[14px] pl-[40px] no-underline cursor-pointer hover:bg-primaryColor sm:text-[16px] sm:py-[10px] sm:px-[15px] sm:min-w-[170px] '>
                            <MdOutlineSupportAgent className='text-[25px] mr-[18px] sm:text-[20px] sm:mr-[12px] ' />
                            <span>Support</span>
                        </a>
                        <button
                            onClick={() => setOpen(true)}
                            className='flex-row justify-start text-whiteText text-[20px] font-medium leading-[28px] py-[16px] pr-[14px] pl-[40px] border-t-[1px] border-t-grayColor hover:bg-primaryColor sm:text-[16px] sm:py-[10px] sm:px-[15px] '
                            aria-label="logout button"
                        >
                            <RxExit className='text-[25px] mr-[18px] sm:text-[20px] sm:mr-[12px] ' /> Log out
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        }
        <DialogComponent open={open} handleClose={handleClose} handleDelete={handleDelete}
            title="Log out" dialog="Are you sure you want to log out?" deleteButton='Log out' />

    </AnimatePresence>
};