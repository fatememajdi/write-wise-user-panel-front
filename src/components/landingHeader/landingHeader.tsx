'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik } from 'formik';

//-------------------------------------------styles
import styles from './landingHeader.module.css';

//-------------------------------------------components
import Input from "../input/input";

const headerItems = [
    {
        title: 'Home',
        route: '/'
    },
    {
        title: 'Features',
        route: '/features'
    },
    {
        title: 'Pricing',
        route: '/pricing'
    },
    {
        title: 'Signup',
        route: '/'
    }
];

const LandingHeader: React.FC = () => <div className={'col-12 ' + styles.headerContainer}>
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
                (item, index) => <Link href={item.route} key={index} className={styles.headerItem} >{item.title}</Link>)
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

                <Image
                    src="/search.svg"
                    alt="Help Icon"
                    width={40}
                    height={40}
                    priority
                />
            </form>

        )}

    </Formik>
</div>;

export default LandingHeader;