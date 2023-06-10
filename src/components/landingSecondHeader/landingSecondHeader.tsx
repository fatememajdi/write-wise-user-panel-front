'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik } from 'formik';

//--------------------------------------------styles
import styles from './landingSecondHeader.module.css';
import SecondStyles from '../landingHeader/landingHeader.module.css';

//-------------------------------------------components
import Input from "../input/input";

const headerItems = [
    {
        title: 'Home',
        route: '/landing'
    },
    {
        title: 'Features',
        route: '/features'
    },
    {
        title: 'Pricing',
        route: '/'
    },
    {
        title: 'Signup',
        route: '/'
    }
];

const LandingSecondHeader: React.FC = () => <div className={styles.headerCard}>
    <div className={SecondStyles.headerItemsContainer}>
        <Image
            className={SecondStyles.headerLogo}
            src="/logo.svg"
            alt="Logo"
            width={133}
            height={15}
            priority
        />
        {
            headerItems.map(
                (item, index) => <Link href={item.route} key={index} className={SecondStyles.headerItem} >{item.title}</Link>)
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
                className={SecondStyles.headerItemsContainer}
                onSubmit={handleSubmit}>
                <Input
                    className={SecondStyles.searchInput}
                    onChange={handleChange}
                    placeHolder='try something...'
                    input
                    inputtype='search'
                    input_name='search'
                    input_value={values.search}
                    input_error={errors.search && touched.search && errors.search} />

                <Image
                    src="/search.svg"
                    alt="Search Icon"
                    width={40}
                    height={40}
                    priority
                />
            </form>

        )}

    </Formik>
</div>;

export default LandingSecondHeader;