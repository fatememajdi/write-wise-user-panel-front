/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import { Modal } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { Drawer } from 'antd';

//-------------------------------------------styles
import styles from './landingHeader.module.css';

//-------------------------------------------components
import { StartLoader } from "../Untitled";

//-------------------------------------------icons
import { MdOutlineMenu } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

//-------------------------------------------type
import { Package } from "../../../types/package";
import { GetPackages } from "@/hooks/fetchData";

const headerItems = [
    {
        title: 'Home',
        route: '#hero-section'
    },
    {
        title: 'How it works',
        route: '#how-it-works'
    },
    {
        title: 'Features',
        route: '#features'
    },
    {
        title: 'Pricing',
        route: '#pricing'
    }
];


const LandingHeader: React.FC<{ logedIn: boolean, shadow?: boolean, landing?: boolean }> = ({ logedIn, shadow, landing }) => {

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [showDrawer, setShowDrawer] = React.useState<boolean>(false);
    const [showPopup, changeShowPopup] = React.useState<boolean>(false);
    const [topHeader, changeTopHeader] = React.useState<boolean>(landing);
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [disablePopup, setDisablePopup] = React.useState<boolean>(false);
    const [selectedDrawerItem, setSelectedDrawerItem] = React.useState<number>();
    const isMac = useMediaQuery({ query: "(max-width: 1680px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = e.currentTarget.href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
            behavior: "smooth",
        });
    };

    async function GetPackage() {
        setPackages(await GetPackages());
    };

    const SetShowDrawer = () => {
        setShowDrawer(true);
    };

    const onCloseDrawer = () => {
        setShowDrawer(false);
    };

    React.useEffect(() => {
        GetPackage();
        if (typeof document != 'undefined') {
            if (window.location.hash) {
                let hash = window.location.hash;
                if (hash.length) {
                    router.push(hash);
                }
            }
        }
    }, []);

    React.useEffect(() => {
        if (typeof document !== 'undefined')
            window.addEventListener("scroll", function () {
                if (document.documentElement.scrollTop <= 10) {
                    if (!topHeader && landing)
                        changeTopHeader(true);
                } else {
                    if (topHeader && landing)
                        changeTopHeader(false);
                }
            });

        if (typeof document != 'undefined')
            window.addEventListener("scroll", function (e: any) {
                if (!showPopup && document.documentElement.scrollTop >= 200)
                    changeShowPopup(true);
                else if (showPopup && document.documentElement.scrollTop <= 200)
                    changeShowPopup(false);
            });
    });



    const variants = {
        open: { backgroundColor: isMobile ? '#2E4057' : 'transparent', boxShadow: 'none', height: isMobile ? 45 : isMac ? 89 : 130 },
        closed: { backgroundColor: isMobile ? '#2E4057' : '#FFF', boxShadow: "0px 4px 14.6px 0px rgba(0, 0, 0, 0.25)", height: isMobile ? 45 : isMac ? 90 : 112 },
    }

    return (<AnimatePresence>
        <motion.nav
            animate={!isMobile && topHeader ? 'open' : 'closed'}
            variants={variants}
            className={'col-12 fixed top-0 z-[100] items-center w-full max-w-[1920px] mac:max-w-[1680px] sm:flex-row sm:justify-between sm:flex sm:py-0 sm:px-14 sm:h-[45px] sm:bg-seccondaryColor ' + styles.headerContainer}>

            {/* ---------------------------------------------------------------------mobile header */}
            <div
                onClick={() => SetShowDrawer()}
                className="hidden sm:flex sm:absolute sm:top-auto sm:bottom-auto sm:left-[15px]">
                <MdOutlineMenu className="text-[30px]" color="#FFF" />
            </div>

            <Image
                className="hidden sm:flex sm:my-0 sm:mx-auto"
                src="/mobileLogo.svg"
                alt="Logo"
                width={85}
                height={18}
                priority
                loading="eager"
            />

            <div className={'col-12 flex h-[110px] mac:h-[89px] flex-row items-center justify-between flex-1 z-10 pr-[97px] pl-[203px] mac:pr-[71px] mac:pl-[71px] relative sm:hidden ' + styles.headerCard}>
                <div className="flex flex-row w-fit h-full items-center"  >

                    <Link style={{ cursor: 'pointer' }} onClick={() => { if (pathname === '/') handleScroll; }}
                        href={pathname === '/' ? '#hero-section' : '/#hero-section'}>
                        <Image
                            className="mr-[38px] w-[183px] h-[24px]"
                            src={"/logoWithIcon.svg"}
                            alt="Logo"
                            width="0"
                            height="0"
                            sizes="100vw"
                            loading="eager"
                            priority
                        />
                    </Link>
                    {
                        headerItems.map(
                            (item, index) => <Link className="text-seccondaryColor no-underline leading-[28px] text-[24px] mac:text-[20px] font-normal mr-[40px] cursor-pointer"
                                onClick={() => { if (pathname === '/') handleScroll; }}
                                key={index} href={pathname === '/' ? item.route : '/' + item.route}>{item.title}</Link>
                        )
                    }
                    {
                        logedIn ?
                            <a
                                // href="javascript:void(Tawk_API.hideWidget())"
                                onClick={() => {
                                    router.push('/ielts');
                                    StartLoader();
                                }}
                                className='text-seccondaryColor no-underline leading-[28px] text-[24px] mac:text-[20px] font-normal mr-[40px] cursor-pointer'>
                                Dashboard</a>
                            :
                            <div onClick={() => {
                                router.push('/signIn');
                                StartLoader();
                            }} className='text-seccondaryColor no-underline leading-[28px] text-[24px] mac:text-[20px] font-normal mr-[40px] cursor-pointer'>
                                Signup</div>
                    }

                </div>
            </div>
            {
                showPopup && !disablePopup &&
                <motion.div
                    animate={{ height: showPopup ? isMac ? 49 : isMobile ? 34 : 54 : 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className='bg-red overflow-hidden flex flex-row items-center justify-center pr-[18px] mt-0 sm:absolute sm:left-0 sm:right-0 sm:bottom-[-45px]'>
                    <div className='text-whiteText text-[18px] mac:text-[18px] font-medium leading-[52.8px] ml-auto sm:text-[13px]'>
                        Limited Time Offer!</div>
                    <button
                        onClick={showModal}
                        className="w-[121px] h-[28px] items-center justify-center rounded-[4px] bg-background text-red text-[18px] mac:text-[18px] font-normal leading-[40px] ml-[52px] sm:w-[95px] sm:h-[22px] sm:text-[14px] sm:font-normal sm:leading-[31.4px]" >
                        Start Now
                    </button>

                    <AiOutlineClose
                        className="sm:text-[20px] ml-auto text-whiteText text-[27px] cursor-pointer"
                        onClick={() => {
                            changeShowPopup(false);
                            setDisablePopup(true);
                        }}
                    />
                </motion.div>
            }


            <Modal
                style={{ top: 10 }}
                footer={null}
                open={isModalOpen}
                onCancel={handleCancel}
                width={isMac ? 500 : isMobile ? '100%' : 772}
                className="bg-background p-0"
            >

                <div
                    className="h-full w-[772px] flex flex-col items-center justify-center p-[34px 20px 10px 20px] sm:w-full">
                    <Image
                        src="/landing/banner.svg"
                        alt="banner"
                        width={isMac ? 278 : isMobile ? 178 : 478}
                        height={isMac ? 114 : isMobile ? 54 : 314}
                        priority
                        loading="eager"
                    />
                    <div className="text-primaryColor text-[48px] font-bold leading-[52.8px] mt-[80px] text-center sm:text-[24px] sm:font-semibold sm:leading-normal sm:mt-[50px]">
                        Claim Your First Essay Assessment for Just {packages?.find(item => item.isPopup === true)?.showingPriceWithDiscount}
                    </div>
                    <div className="text-blackText text-[24px] font-bold leading-[31.2px] mt-[30px] text-center mx-[30px] sm:text-[16px] sm:font-semibold sm:leading-normal">
                        Unlock AI-driven personalized feedback, insights, and expert recommendations.
                    </div>
                    <button
                        onClick={() => router.push('/signIn')}
                        className="text-whiteText text-[24px] font-bold leading-[40px] py-[40px] px-[28px] mr-[50px] bg-red sm:py-0 sm:px-[14px] sm:font-semibold">
                        Start Now
                    </button>
                </div>

            </Modal>

            <Drawer
                placement={'left'}
                closable={false}
                onClose={onCloseDrawer}
                open={showDrawer}
                width={216}
                className={styles.drawer}
            >
                {
                    headerItems.map((item, index) => <p className="text-whiteText twxt-[20px] font-normal leading-[28px] mt-[15px] w-full"
                        key={index} style={selectedDrawerItem === index ? { backgroundColor: '#172E4A' } : {}}>
                        {landing ?
                            <Link href={item.route} onClick={() => {
                                handleScroll;
                                onCloseDrawer();
                                setSelectedDrawerItem(index);
                            }} >{item.title}</Link>
                            :
                            <Link href={'/' + item.route} onClick={() => {
                                router.push('/' + item.route);
                                handleScroll;
                                onCloseDrawer();
                                setSelectedDrawerItem(index);
                            }} >{item.title}</Link>
                        }
                    </p>)
                }
                {
                    logedIn ?
                        <>
                            <p
                                className="text-whiteText twxt-[20px] font-normal leading-[28px] mt-[15px] w-full"
                                style={pathname === '/ielts' ? { backgroundColor: '#172E4A' } : {}}
                                onClick={() => {
                                    router.push('/ielts');
                                    setSelectedDrawerItem(4);
                                    StartLoader();
                                    onCloseDrawer();
                                }}
                            >Dashboard</p>
                            <p
                                className="text-whiteText twxt-[20px] font-normal leading-[28px] mt-[15px] w-full"
                                style={pathname === '/wallet' ? { backgroundColor: '#172E4A' } : {}}
                                onClick={() => {
                                    router.push('/wallet');
                                    setSelectedDrawerItem(6);
                                    StartLoader();
                                    onCloseDrawer();
                                }}
                            >Wallet</p>
                        </>
                        :
                        <p
                            className="text-whiteText twxt-[20px] font-normal leading-[28px] mt-[15px] w-full"
                            style={selectedDrawerItem === 7 ? { backgroundColor: '#172E4A' } : {}}
                            onClick={() => {
                                router.push('/signIn');
                                setSelectedDrawerItem(6);
                                StartLoader();
                            }}
                        >Signup</p>
                }

            </Drawer>

        </motion.nav >
    </AnimatePresence>
    )
};

export default LandingHeader;