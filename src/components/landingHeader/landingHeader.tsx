'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from 'framer-motion';
import { useSession } from "next-auth/react";
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

    const [showPopup, changeShowPopup] = React.useState<boolean>(false);
    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });

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
            console.log(e.deltaY);
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
                showPopup &&
                <motion.div
                    animate={{ height: showPopup ? isMac ? 49 : 66 : 0 }}
                    transition={{ type: "spring", duration: 1 }}
                    className={styles.popup}>
                    <div className={styles.popupTitle}>Limited Time Offer!</div>
                    <button className={styles.popupButton}>
                        Start Now
                    </button>

                    <AiOutlineClose
                        className={styles.popupCloseButton}
                        onClick={() => changeShowPopup(false)}
                    />
                </motion.div>
            }
        </AnimatePresence>
    </div >
    )
};

export default LandingHeader;