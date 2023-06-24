'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik } from 'formik';
import { useRouter } from "next/navigation";

//-------------------------------------------styles
import styles from './landingHeader.module.css';

//-------------------------------------------components
import Input from "../input/input";

//-------------------------------------------icons
import { Search } from "../../../public";

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

const LandingHeader: React.FC = () => {

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
            />

            <Image
                className={'col-12 ' + styles.headerShadow}
                src='/landing/landing-header-shadow.svg'
                alt="Background"
                width="0"
                height="0"
                sizes="100vw"
                priority
            />

            <div className={'col-12 ' + styles.headerCard}>
                <div className={styles.headerItemsContainer}>
                    <Image
                        className={styles.headerLogo}
                        src="/logo.svg"
                        alt="Logo"
                        width={133}
                        height={15}
                        priority
                    />
                    {
                        headerItems.map(
                            (item, index) => <Link href={item.route} key={index} className={styles.headerItem} onClick={handleScroll} >{item.title}</Link>)
                    }
                    <a onClick={() => router.push('/signIn')} className={styles.headerItem}>Signup</a>
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
        </div>
    )
};

export default LandingHeader;