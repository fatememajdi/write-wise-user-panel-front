'use client';
import React from "react";
import Image from "next/image";
import { Divider } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

//---------------------------------------------------styles
import styles from './signIn.module.css';

//---------------------------------------------------icons
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';
import { GrApple } from 'react-icons/gr';

//---------------------------------------------------components
import Input from "@/components/input/input";
import { Pagination } from "@/components/pagination/pagination";

const SignIn: React.FC = () => {
    const [loginStep, changeLoginStep] = React.useState<number>(0);

    return (
        <div className={'col-12 ' + styles.signInPageContainer}>
            <div className={'col-lg-7 ' + styles.signInLeftContainer}>
                <Image
                    className={styles.logo}
                    src="/logo.svg"
                    alt="Logo"
                    width={151}
                    height={16}
                    priority
                />
                {
                    loginStep === 0 ?
                        <Step1 changeStep={changeLoginStep} />
                        :
                        <Step2 />
                }
            </div>

            <div className={'col-lg-5 ' + styles.signInrightContainer}>
                <div className={styles.circle1} />
                <div className={styles.circle2} />
                <div className={styles.circle3} />
                <div className={styles.circle4} />
            </div>
        </div>
    )
};

export default SignIn;

const Step1: React.FC<{ changeStep: any }> = ({ changeStep }) => {


    const router = useRouter();

    const handeClickGoogle = async () => {

        const signInResponse = await signIn('google');
        if (signInResponse && !signInResponse.error) {
            router.push('/dashboard');
        } else {
            console.log('Sign In error : ', signInResponse?.error);
            // toast
        }
    }

    const handeClickFaceBook = async () => {

        const signInResponse = await signIn('facebook');
        console.log('hiii',signInResponse);

        if (signInResponse && !signInResponse.error) {
            // router.push('/dashboard');
            console.log('hiii',signInResponse);
        } else {
            console.log('Sign In error : ', signInResponse?.error);
            // toast
        }
    }

    return <div className={'col-12 ' + styles.stepContainer}>
        <div className={styles.title}>Log in/Sign in</div>

        <a
            onClick={handeClickGoogle}
            className={styles.signInOptionsbutton + ' ' + styles.googleSingInCard}>
            <FcGoogle className={styles.signInOptionsIcon} />Sign in with Google
        </a>
        <a
            onClick={handeClickFaceBook}
            className={styles.signInOptionsbutton + ' ' + styles.faceBookSingInCard}>
            <SiFacebook className={styles.signInOptionsIcon} />Sign in with Facebook
        </a>
        <a
            className={styles.signInOptionsbutton + ' ' + styles.appleSingInCard}>
            <GrApple className={styles.signInOptionsIcon} />Sign in with Apple
        </a>

        <Divider style={{ marginTop: 30 }} plain>or</Divider>

        <button onClick={() => changeStep(1)} className={styles.emailButton}>
            Email
        </button>

        <div className={styles.footerText}>
            By login, you agree to our <a>Terms of<br /> Service</a> and <a>Privacy Policy .</a>
        </div>

    </div>
};

//---------------------------------------------------------------validation
const EmailValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email("Invalid email format")
        .required('Username is required!'),
});

const Step2: React.FC = () => {

    const router = useRouter();

    const handeClickGoogle = async () => {

        const signInResponse = await signIn('google');
        if (signInResponse && !signInResponse.error) {
            // router.push('/dashboard');
            console.log(signInResponse);
        } else {
            console.log('Sign In error : ', signInResponse?.error);
            // toast
        }
    }

    const handeClickFaceBook = async () => {

        const signInResponse = await signIn('facebook');
        if (signInResponse && !signInResponse.error) {
            // router.push('/dashboard');
            console.log(signInResponse);

        } else {
            console.log('Sign In error : ', signInResponse);
            // toast
        }
    }

    return <Formik
        initialValues={{
            email: ''
        }}
        validationSchema={EmailValidationSchema}
        enableReinitialize
        onSubmit={async (values) => {
            // await handleSubmit(values);
        }}>{({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            handleChange
        }) => (
            <form
                className={'col-12 ' + styles.stepContainer}
                onSubmit={handleSubmit}>
                <div className={styles.title}>Log in</div>
                <div className={'col-12 ' + styles.inputEmailTitle}>Email</div>
                <Input
                    className={styles.emailInput}
                    onChange={handleChange}
                    input
                    inputtype='email'
                    input_name='email'
                    input_value={values.email}
                    input_error={errors.email && touched.email && errors.email}
                />

                <button
                    onClick={() => router.push('/signIn/verificationCode')}
                    className={styles.submitEmailButton} type="submit">
                    Log in
                </button>

                <Pagination lenght={2} currentPage={1} color="#2E4057" />

                <Divider style={{ marginTop: 20 }} plain>or</Divider>

                <a
                    onClick={handeClickGoogle}
                    className={styles.signInOptionsbutton + ' ' + styles.googleSingInCard}>
                    <FcGoogle className={styles.signInOptionsIcon} />Sign in with Google
                </a>
                <a
                    onClick={handeClickFaceBook}
                    className={styles.signInOptionsbutton + ' ' + styles.faceBookSingInCard}>
                    <SiFacebook className={styles.signInOptionsIcon} />Sign in with Facebook
                </a>
                <a className={styles.signInOptionsbutton + ' ' + styles.appleSingInCard}>
                    <GrApple className={styles.signInOptionsIcon} />Sign in with Apple
                </a>

                <div className={styles.footerText}>
                    By login, you agree to our <a>Terms of<br /> Service</a> and <a>Privacy Policy .</a>
                </div>
            </form>
        )}
    </Formik>
};
