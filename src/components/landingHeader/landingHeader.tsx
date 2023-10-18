'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

//-------------------------------------------styles
import styles from './landingHeader.module.css';

//-------------------------------------------components
import { StartLoader } from "../Untitled";

//-------------------------------------------icons
import { Chat2 } from "../../../public";
import { MdOutlineMenu } from 'react-icons/md';

const headerItems = [
    {
        title: 'Home',
        route: '#section-1'
    },
    {
        title: 'How it works',
        route: '#section-5'
    },
    {
        title: 'Features',
        route: '#section-3'
    },
    {
        title: 'Pricing',
        route: '#section-4'
    }
];

const LandingHeader: React.FC<{ logedIn: boolean }> = ({ logedIn }) => {
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

    return (<div className={'col-12 ' + styles.headerContainer}>
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
        <button
            aria-label="chat button"
            className={styles.responsiveChatButton}
        >
            <Chat2 />
        </button>

        <div className={'col-12 ' + styles.headerCard}>
            <div className={styles.headerItemsContainer}>
                <Image
                    className={styles.headerLogo}
                    src="/logo.svg"
                    alt="Logo"
                    width={133}
                    height={15}
                    priority
                    loading="eager"
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
    </div >
    )
};

export default LandingHeader;