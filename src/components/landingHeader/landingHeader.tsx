'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from "next-auth/react";
import { Modal } from 'antd';
import { useMediaQuery } from 'react-responsive';

//-------------------------------------------styles
import styles from './landingHeader.module.css';

//-------------------------------------------components
import { StartLoader } from "../Untitled";

//-------------------------------------------icons
import { MdOutlineMenu } from 'react-icons/md';
import { AiOutlineClose } from 'react-icons/ai';

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

const LandingHeader: React.FC<{ logedIn: boolean, shadow?: boolean }> = ({ logedIn, shadow }) => {

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [showPopup, changeShowPopup] = React.useState<boolean>(false);
    const [disablePopup, setDisablePopup] = React.useState<boolean>(false);
    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });

    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    const { data: session, status } = useSession({
        required: true, onUnauthenticated() {
            return;
        }
    });
    const router = useRouter();

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = e.currentTarget.href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
            behavior: "smooth",
        });
    };

    if (typeof document != 'undefined')
        window.addEventListener("wheel", function (e: any) {
            if (!disablePopup)
                if (e.deltaY > 0)
                    changeShowPopup(true);
                else if (e.deltaY)
                    changeShowPopup(false);
        });

    return (<div className={shadow || showPopup ? 'col-12 ' + styles.headerContainer + ' ' + styles.blackShadow :
        'col-12 ' + styles.headerContainer + ' ' + styles.lightShadow}>
        {/* ---------------------------------------------------------------------mobile header */}
        <div className={styles.responsiveMenuIcon}>
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
                <Image
                    className={styles.headerLogo}
                    src="/logo.svg"
                    alt="Logo"
                    width="0"
                    height="0"
                    sizes="100vw"
                    loading="eager"
                    priority
                />
                {
                    headerItems.map(
                        (item, index) => <Link href={item.route} key={index} className={styles.headerItem} onClick={handleScroll} >{item.title}</Link>)
                }
                {
                    logedIn ?
                        <a
                            onClick={() => {
                                router.push('/ielts');
                                StartLoader();
                            }}
                            // href="https://dash.wwai.ai/"
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
                    animate={{ height: showPopup ? isMac ? 49 : 66 : 0 }}
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
            width={772}
            className={styles.modalContainer}
        >

            <div className={styles.modalCard}>
                <Image
                    className={styles.banner}
                    src="/landing/banner.svg"
                    alt="banner"
                    width={478}
                    height={314}
                    priority
                    loading="eager"
                />
                <div className={styles.bannerTitle}>
                    Claim Your First Essay Assessment for Just $1
                </div>
                <div className={styles.bannerDescription}>
                    Unlock AI-driven personalized feedback, insights, and expert recommendations.
                </div>
                <button className={styles.bannerButton}>
                    Start Now
                </button>
            </div>

        </Modal>

    </div >
    )
};

export default LandingHeader;