'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import { Modal } from 'antd';
import client from '@/config/applloAuthorizedClient';
import { useMediaQuery } from 'react-responsive';
import { Drawer } from 'antd';

//-------------------------------------------styles
import styles from './landingHeader.module.css';

//-------------------------------------------components
import { GET_CURRENCIES, GET_PACKAGES } from "@/config/graphql";
import { StartLoader } from "../Untitled";

//-------------------------------------------icons
import { MdOutlineMenu } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

//-------------------------------------------type
import { Package } from "../../../types/package";

const headerItems = [
    {
        title: 'Home',
        route: '#home'
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
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [disablePopup, setDisablePopup] = React.useState<boolean>(false);
    const [selectedDrawerItem, setSelectedDrawerItem] = React.useState<number>();
    const isMac = useMediaQuery({ query: "(max-width: 1680px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const { data: session, status } = useSession({
        required: true, onUnauthenticated() {
            return;
        }
    });
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
        await client.query({
            query: GET_CURRENCIES,
            fetchPolicy: "no-cache",
        }).then(async (res) => {
            await client.query({
                query: GET_PACKAGES,
                fetchPolicy: "no-cache",
                variables: {
                    currency: res.data.getCurrencies[0].code.toLowerCase(),
                    userToken: ''
                }
            }).then((res) => {
                setPackages(res.data.getPackages);
            })
        });
    };

    const SetShowDrawer = () => {
        setShowDrawer(true);
    };

    const onCloseDrawer = () => {
        setShowDrawer(false);
    };

    React.useEffect(() => {
        GetPackage();
    }, []);


    if (typeof document != 'undefined')
        window.addEventListener("scroll", function (e: any) {
            if (!showPopup)
                changeShowPopup(true);
        });

    return (<div className={'col-12 ' + styles.headerContainer + ' ' + styles.blackShadow}>
        {/* ---------------------------------------------------------------------mobile header */}
        <div
            onClick={() => SetShowDrawer()}
            className={styles.responsiveMenuIcon}>
            <MdOutlineMenu />
        </div>

        <Image
            className={styles.responsiveLogo}
            src="/logo3.svg"
            alt="Logo"
            width={81}
            height={17}
            priority
            loading="eager"
        />

        <div className={'col-12 ' + styles.headerCard}>
            <div className={styles.headerItemsContainer}>
                {
                    isMac ?
                        <Image
                            className={styles.headerLogo}
                            src={"/logoIcon.svg"}
                            alt="Logo"
                            width="0"
                            height="0"
                            sizes="100vw"
                            loading="eager"
                            priority
                        />
                        :
                        <Image
                            className={styles.headerLogo}
                            src={"/logoWithIcon.svg"}
                            alt="Logo"
                            width="0"
                            height="0"
                            sizes="100vw"
                            loading="eager"
                            priority
                        />

                }
                {
                    headerItems.map(
                        (item, index) => <Link className={styles.headerItem} onClick={() => { if (pathname === '/') handleScroll; else router.push('/' + item.route); handleScroll }}
                        key={index} href={pathname === '/' ? item.route : '/' + item.route}>{item.title}</Link>
                    )
                }
                {
                    logedIn ?
                        <a
                            onClick={() => {
                                router.push('/ielts');
                                StartLoader();
                            }}
                            className={styles.headerItem}>Dashboard</a>
                        :
                        <div onClick={() => {
                            router.push('/signIn');
                            StartLoader();
                        }} className={styles.headerItem}>Signup</div>
                }

            </div>
        </div>
        <AnimatePresence>
            {
                showPopup && !disablePopup &&
                <motion.div
                    animate={{ height: showPopup ? isMac ? 49 : isMobile ? 54 : 54 : 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className={styles.popup}>
                    <div className={styles.popupTitle}>Limited Time Offer!</div>
                    <button
                        onClick={showModal}
                        className={styles.popupButton}>
                        Start Now
                    </button>

                    <AiOutlineClose
                        className={styles.popupCloseButton}
                        onClick={() => {
                            changeShowPopup(false);
                            setDisablePopup(true);
                        }}
                    />
                </motion.div>
            }
        </AnimatePresence>


        <Modal
            style={{ top: 10 }}
            footer={null}
            open={isModalOpen}
            onCancel={handleCancel}
            width={isMac ? 500 : isMobile ? '100%' : 772}
            className={styles.modalContainer}
        >

            <div className={styles.modalCard}>
                <Image
                    className={styles.banner}
                    src="/landing/banner.svg"
                    alt="banner"
                    width={isMac ? 278 : isMobile ? 178 : 478}
                    height={isMac ? 114 : isMobile ? 54 : 314}
                    priority
                    loading="eager"
                />
                <div className={styles.bannerTitle}>
                    Claim Your First Essay Assessment for Just {packages?.find(item => item.isPopup === true)?.showingPriceWithDiscount}
                </div>
                <div className={styles.bannerDescription}>
                    Unlock AI-driven personalized feedback, insights, and expert recommendations.
                </div>
                <button
                    onClick={() => router.push('/signIn')}
                    className={styles.bannerButton}>
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
                headerItems.map((item, index) => <p key={index} style={selectedDrawerItem === index ? { backgroundColor: '#172E4A' } : {}}>
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
                            style={pathname === '/ielts' ? { backgroundColor: '#172E4A' } : {}}
                            onClick={() => {
                                router.push('/ielts');
                                setSelectedDrawerItem(4);
                                StartLoader();
                                onCloseDrawer();
                            }}
                            className={styles.headerItem}>Dashboard</p>
                        <p
                            style={pathname === '/profile' ? { backgroundColor: '#172E4A' } : {}}
                            onClick={() => {
                                router.push('/profile');
                                setSelectedDrawerItem(5);
                                StartLoader();
                                onCloseDrawer();
                            }}
                            className={styles.headerItem}>Profile</p>
                        <p
                            style={pathname === '/wallet' ? { backgroundColor: '#172E4A' } : {}}
                            onClick={() => {
                                router.push('/wallet');
                                setSelectedDrawerItem(6);
                                StartLoader();
                                onCloseDrawer();
                            }}
                            className={styles.headerItem}>Wallet</p>
                    </>
                    :
                    <p
                        style={selectedDrawerItem === 7 ? { backgroundColor: '#172E4A' } : {}}
                        onClick={() => {
                            router.push('/signIn');
                            setSelectedDrawerItem(6);
                            StartLoader();
                        }} className={styles.headerItem}>Signup</p>
            }

        </Drawer>

    </div >
    )
};

export default LandingHeader;