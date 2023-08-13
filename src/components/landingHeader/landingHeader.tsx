'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik } from 'formik';
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

//-------------------------------------------styles
import styles from './landingHeader.module.css';

//-------------------------------------------components
import Input from "../input/input";
import { StartLoader } from "../Untitled";

//-------------------------------------------icons
import { Chat2, Search } from "../../../public";
import { MdOutlineMenu } from 'react-icons/md';

const headerItems = [
    {
        title: 'Home',
        route: '#section-1'
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

    return (
        <div className={'col-12 ' + styles.headerContainer}>
            <Image
                className={"w-full h-auto " + styles.headerBackground}
                src='/landing/landing-header-background.svg'
                alt="Background"
                // width={2000}
                // height={184}
                width="0"
                height="0"
                sizes="100vw"
                priority
                loading="eager"
            />

            <Image
                className={'col-12 ' + styles.headerShadow}
                src='/landing/landing-header-shadow.svg'
                alt="Background"
                width="0"
                height="0"
                sizes="100vw"
                priority
                loading="eager"
            />

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
                            <div onClick={() => {
                                router.push('/dashboard');
                                StartLoader();
                            }} className={styles.headerItem}>Dashboard</div>
                            :
                            <div onClick={() => {
                                router.push('/signIn');
                                StartLoader();
                            }} className={styles.headerItem}>Signup</div>
                    }

                </div>
                <Formik
                    initialValues={{
                        search: ''
                    }}
                    // validationSchema={WritingValidationSchema}
                    enableReinitialize
                    onSubmit={async (values) => {
                        // await handleSubmit(values);
                    }}

                >
                    {({
                        values,
                        errors,
                        touched,
                        handleSubmit,
                        setFieldValue,
                        handleChange
                    }) => (

                        <form
                            className={styles.headerItemsContainer}
                            onSubmit={handleSubmit}>
                            <Image
                                src="/help.svg"
                                alt="Help Icon"
                                width={33}
                                height={33}
                                priority
                                loading="eager"
                            />
                            <Input
                                className={styles.searchInput}
                                onChange={handleChange}
                                placeHolder='try something...'
                                input
                                inputtype='search'
                                input_name='search'
                                input_value={values.search}
                                input_error={errors.search && touched.search && errors.search} />

                            <Search width={60} />
                        </form>

                    )}

                </Formik>
            </div>
        </div >
    )
};

export default LandingHeader;