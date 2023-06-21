'use client';
import React from "react";
import Image from "next/image";
import { Divider } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

//---------------------------------------------------styles
import styles from './signIn.module.css';

//---------------------------------------------------icons
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';
import { GrApple } from 'react-icons/gr';

//---------------------------------------------------components
import Input from "@/components/input/input";
import OtpInput from "@/components/otpIput/otpIput";

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
                        : loginStep === 1 ?
                            <Step2 changeStep={changeLoginStep} />
                            : loginStep === 2 ?
                                <Step3 changeStep={changeLoginStep} />
                                :
                                <Step4 changeStep={changeLoginStep} />
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
    return <div className={'col-12 ' + styles.stepContainer}>
        <div className={styles.title}>Log in/Sign in</div>

        <a className={styles.signInOptionsbutton + ' ' + styles.googleSingInCard}>
            <FcGoogle className={styles.signInOptionsIcon} />Sign in with Google
        </a>
        <a className={styles.signInOptionsbutton + ' ' + styles.faceBookSingInCard}>
            <SiFacebook className={styles.signInOptionsIcon} />Sign in with Facebook
        </a>
        <a className={styles.signInOptionsbutton + ' ' + styles.appleSingInCard}>
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

const Step2: React.FC<{ changeStep: any }> = ({ changeStep }) => {
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
                    onClick={() => changeStep(2)}
                    className={styles.submitEmailButton} type="submit">
                    Log in
                </button>

                <Divider style={{ marginTop: 20 }} plain>or</Divider>

                <a className={styles.signInOptionsbutton + ' ' + styles.googleSingInCard}>
                    <FcGoogle className={styles.signInOptionsIcon} />Sign in with Google
                </a>
                <a className={styles.signInOptionsbutton + ' ' + styles.faceBookSingInCard}>
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


//---------------------------------------------------------------validation
const VerificationCodeValidationSchema = Yup.object().shape({
    code: Yup
        .string()
        .min(6, 'Verification code must be 6 digits')
        .required('Verification code is required!'),
});

const Step3: React.FC<{ changeStep: any }> = ({ changeStep }) => {

    return <Formik
        initialValues={{
            code: ''
        }}
        validationSchema={VerificationCodeValidationSchema}
        enableReinitialize
        onSubmit={async (values) => {
            // await setVerificationCode(values.code)
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


                <div className={'col-12 ' + styles.inputEmailTitle}>Verification code</div>
                <OtpInput
                    valueLength={6}
                    onChange={(e) => setFieldValue('code', e)}
                    input_name='code'
                    value={values.code}
                    input_error={errors.code && touched.code && errors.code}
                />

                <button
                    onClick={() => changeStep(3)}
                    className={styles.submitEmailButton} type="submit">
                    Log in
                </button>

                <div className={styles.footerText}>
                    By login, you agree to our <a>Terms of<br /> Service</a> and <a>Privacy Policy .</a>
                </div>

            </form>
        )}
    </Formik>
}


const Step4: React.FC<{ changeStep: any }> = ({ changeStep }) => {
    return <Formik
        initialValues={{
            code: ''
        }}
        validationSchema={VerificationCodeValidationSchema}
        enableReinitialize
        onSubmit={async (values) => {
            // await setVerificationCode(values.code)
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
                <div className={styles.title}>About you</div>
            </form>
        )}
    </Formik>
}
