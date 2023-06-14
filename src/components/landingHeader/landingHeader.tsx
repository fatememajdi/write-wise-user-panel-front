'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik } from 'formik';

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
    },
    {
        title: 'Signup',
        route: '/'
    }
];

const LandingHeader: React.FC = () => {

    const handleScroll = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const targetId = e.currentTarget.href.replace(/.*\#/, "");
        const elem = document.getElementById(targetId);
        elem?.scrollIntoView({
            behavior: "smooth",
        });
    };

    return (
        <div className={styles.headerCard}>
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
        </div>)
};

export default LandingHeader;