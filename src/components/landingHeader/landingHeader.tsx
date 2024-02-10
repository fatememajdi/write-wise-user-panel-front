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
    const isTablet = useMediaQuery({ query: "(max-width: 1281px)" });
    const isMiniTablet = useMediaQuery({ query: "(max-width: 815px)" });
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
        console.log('hi')
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
                if (document.documentElement.scrollTop <= (isMiniTablet ? 2 : 10)) {
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
        open: { backgroundColor: isMobile ? '#2E4057' : 'transparent', boxShadow: 'none', height: isMobile ? 45 : isMiniTablet ? 63 : isTablet ? 62 : isMac ? 89 : 105, borderBottomWidth: 0.5, borderBottomColor: '#a4a4a5' },
        closed: { backgroundColor: isMobile ? '#2E4057' : '#FFF', boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)", height: isMobile ? 45 : isMiniTablet ? 63 : isTablet ? 62 : isMac ? 89 : 112 },
    };

    return (<AnimatePresence>
        <motion.nav
            animate={!isMobile && topHeader ? 'open' : 'closed'}
            variants={variants}
            className={'col-12 fixed top-0 z-[10] items-center w-full max-w-[1920px] mac:max-w-[1680px] sm:flex-row sm:justify-between sm:flex sm:py-0 sm:px-14 sm:h-[45px] sm:bg-seccondaryColor ' + styles.headerContainer}>

            {/* ---------------------------------------------------------------------mobile header */}
            <div
                onClick={() => SetShowDrawer()}
                className="hidden z-[1000] sm:flex mini-tablet:flex mini-tablet:absolute mini-tablet:top-[15px] mini-tablet:bottom-auto mini-tablet:left-[44px] sm:absolute sm:top-auto sm:bottom-auto sm:left-[15px]">
                <MdOutlineMenu className="text-[30px]" color={isMobile ? "#FFF" : "#252525"} />
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

            <div className={'col-12 flex h-full mac:h-[89px] flex-row items-center justify-between flex-1 z-10 pr-[97px] pl-[164px] mini-tablet:px-0 tablet:pl-[90px] mac:pr-[71px] mac:pl-[107px] relative sm:hidden ' + styles.headerCard}>
                <div className="flex flex-row w-fit h-full items-center mini-tablet:mx-auto "  >

                    <Link style={{ cursor: 'pointer' }} onClick={() => { if (pathname === '/') handleScroll; }}
                        href={pathname === '/' ? '#hero-section' : '/#hero-section'}>
                        <Image
                            className="mr-[114px] mini-tablet:mr-0 mac:mr-[57px] w-[183px] h-[25px] mac:w-[150px] mac:h-[20px] tablet:w-[116px] tablet:h-[17px] mini-tablet:w-[116px] mini-tablet:h-[17px] "
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
                            (item, index) => <Link className="text-seccondaryColor no-underline leading-[28px] text-[24px] mac:text-[19px] tablet:text-[15px] tablet:leading-[22px] mac:leading-[22px] tablet:mr-[26px] font-normal mr-[50px] mac:mr-[37px] cursor-pointer mini-tablet:hidden"
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
                                className='text-seccondaryColor no-underline leading-[28px] text-[24px] tablet:text-[15px] tablet:leading-[22px] tablet:mr-[26px] mac:text-[19px] mac:leading-[22px] font-normal mr-[40px] mac:mr-[37px] cursor-pointer mini-tablet:hidden'>
                                Dashboard</a>
                            :
                            <div onClick={() => {
                                router.push('/signIn');
                                StartLoader();
                            }} className='text-seccondaryColor no-underline leading-[28px] text-[24px] mac:text-[19px] tablet:text-[15px] tablet:leading-[22px] tablet:mr-[26px] mac:leading-[22px] font-normal mr-[40px] mac:mr-[37px] cursor-pointer mini-tablet:hidden'>
                                Signup</div>
                    }

                </div>
            </div>
            {
                showPopup && !disablePopup &&
                <motion.div
                    animate={{ height: showPopup ? isMobile ? 34 : isTablet || isMiniTablet ? 42 : isMac ? 54 : 65 : 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className='bg-red overflow-hidden flex flex-row items-center justify-center pr-[50px] mac:pr-[18px] mini-tablet:pr-[14px] tablet:pr-[36px] mt-0 sm:absolute sm:left-0 sm:right-0 sm:bottom-[-45px]'>
                    <div className='text-whiteText text-[20px] mac:text-[16px] tablet:text-[12px] mini-tablet:text-[12px] mini-tablet:font-semibold mac:font-semibold font-medium leading-[52.8px] ml-auto sm:text-[13px]'>
                        Limited Time Offer!</div>
                    <button
                        onClick={showModal}
                        className="w-[120px] mac:w-[90px] mac:h-[36px] h-[43px] mini-tablet:w-[64px] tablet:w-[64px] mini-tablet:h-[30px] tablet:h-[30px] items-center justify-center rounded-[4px] bg-background text-red text-[20px] mini-tablet:text-[12px] tablet:text-[12px] mac:text-[16px] mac:font-semibold font-normal leading-[40px] ml-[26px] mini-tablet:ml-[16px] tablet:ml-[16px] mac:ml-[20px] sm:w-[95px] sm:h-[22px] sm:text-[14px] sm:font-normal sm:leading-[31.4px]" >
                        Start Now
                    </button>

                    <AiOutlineClose
                        className="sm:text-[20px] tablet:text-[16px] ml-auto text-whiteText text-[27px] mini-tablet:text-[20px] cursor-pointer"
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
                        width={isMobile ? 178 : isMac ? 278 : 478}
                        height={isMobile ? 54 : isMac ? 114 : 314}
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
                width={isMobile ? 216 : 256}
                className={' mini-tablet:pt-[27px] mini-tablet:pl-[35px] ' + styles.drawer}
            >
                {
                    headerItems.map((item, index) => <p className="text-whiteText twxt-[20px] mini-tablet:text-[25px] mini-tablet:leading-[36px] font-normal leading-[28px] mt-[15px] w-full"
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
                                className="text-whiteText twxt-[20px] mini-tablet:text-[25px] mini-tablet:leading-[36px] font-normal leading-[28px] mt-[15px] w-full"
                                style={pathname === '/ielts' ? { backgroundColor: '#172E4A' } : {}}
                                onClick={() => {
                                    router.push('/ielts');
                                    setSelectedDrawerItem(4);
                                    StartLoader();
                                    onCloseDrawer();
                                }}
                            >Dashboard</p>
                            <p
                                className="text-whiteText twxt-[20px] mini-tablet:text-[25px] mini-tablet:leading-[36px] font-normal leading-[28px] mt-[15px] w-full"
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
    </AnimatePresence >
    )
};

export default LandingHeader;