'use client';
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Formik } from 'formik';
import * as Yup from 'yup';

//----------------------------------------------------------------styles 
import styles from './footer.module.css';

//----------------------------------------------------------------components
import Input from "../input/input";

//----------------------------------------------------------------social media items
const socialMediaItems = [
    {
        icon: '/twitter.svg',
        link: 'https://twitter.com'
    },
    {
        icon: '/linkedin.svg',
        link: 'https://www.linkedin.com'
    },
    {
        icon: '/facebook.svg',
        link: 'https://www.facebook.com'
    },
    {
        icon: '/github.svg',
        link: 'https://github.com'
    },
    {
        icon: '/dribbble.svg',
        link: 'https://dribbble.com'
    },
]

//---------------------------------------------------------------validation
const EmailValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email("Invalid email format")
        .required('Username is required!'),
});

const Footer: React.FC = () => <div className={'col-lg-12 ' + styles.footerContainer}>
    <div className={styles.leftContainer}>
        <Image
            className={styles.logo}
            src="/logo2.svg"
            alt="Logo"
            width={133}
            height={15}
            priority
        />
        <Link className={styles.link} href={'/'}>Terms of Service</Link>
        <div>
            <Link className={styles.link} href={'/'}>Privacy Policy</Link>
            <Link className={styles.link} href={'/'}>about us</Link>
        </div>
    </div>
    <Formik
        initialValues={{
            email: ''
        }}
        validationSchema={EmailValidationSchema}
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
                className={styles.rightContainer}
                onSubmit={handleSubmit}>
                <div className={styles.socialMediaContainer}>
                    {
                        socialMediaItems.map((item, index) => <a key={index} href={item.link}>
                            <Image
                                className={styles.socialIcon}
                                src={item.icon}
                                alt="social media"
                                width={24}
                                height={24}
                                priority
                            />
                        </a>)
                    }
                </div>
                <div>
                    <div className={styles.emailCardTiitle}>
                        Stay up to date !
                    </div>
                    <div className={styles.inputContainer}>
                        <Input
                            className={styles.emailInput}
                            onChange={handleChange}
                            placeHolder='Enter your email'
                            input
                            inputtype='email'
                            input_name='email'
                            input_value={values.email}
                            input_error={errors.email && touched.email && errors.email}
                        />

                        <button type="submit" className={styles.sibscribeButton}>
                            Subscribe
                        </button>
                    </div>

                    <div className={styles.emailCardText}>
                        We care about your data in our <Link className={styles.emailCardText} href={'/'}>privacy policy</Link>
                    </div>

                </div>
            </form>

        )}

    </Formik>
</div>;

export default Footer;