/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import { AnimatePresence, motion } from "framer-motion";

//---------------------------------------------------styles
import styles from '../signIn.module.css';

//---------------------------------------------------components
const OtpInput = dynamic(() => import("@/components/otpIput/otpIput"));

//---------------------------------------------------icons
import { IoIosArrowRoundBack } from 'react-icons/io';
import { TbRefresh } from 'react-icons/tb';
import { EmaiSignIn, VerifyCode } from "@/hooks/actions";

//---------------------------------------------------------------validation
const VerificationCodeValidationSchema = Yup.object().shape({
    code: Yup
        .string()
        .required('Verification code is required!'),
});

const VerificationCode: React.FC = () => {

    const router = useRouter();
    const [loading, changeLoadig] = React.useState<boolean>(false);
    const [resendLoading, changeResendLoadig] = React.useState<boolean>(false);
    const [resendCode, changeResendCode] = React.useState<boolean>(false);
    const [seconds, changeSeconds] = React.useState<number>(60);

    let email: string = '';
    if (typeof document !== 'undefined')
        email = localStorage.getItem('email');

    const handleSignIn = async (values: any) => {
        changeLoadig(true);
        let token: string = await VerifyCode(email, values.code);
        if (token) {
            localStorage.setItem("user", JSON.stringify(token));
            router.replace('/ielts');
            localStorage.removeItem('email');
        } else
            changeLoadig(false);
    };

    const handleEmailSignIn = async () => {
        changeResendLoadig(true);
        if (await EmaiSignIn(email)) {
            changeResendCode(false);
            toast.success('An email containing a code has been sent to your email.');
            setTimeout(() => {
                changeResendCode(true);
            }, 60000);
            changeSeconds(60);
        };
        changeResendLoadig(false);
    };

    React.useEffect(() => {
        setTimeout(() => {
            changeResendCode(true);
        }, 60000);

    }, []);

    React.useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => changeSeconds(seconds - 1), 1000);
        }
    });

    return <div className={'col-12 ' + styles.signInPageContainer}>

        <Image
            className={styles.logo}
            src={"/logoWithIcon.svg"}
            alt="Logo"
            width="0"
            height="0"
            sizes="100vw"
            loading="eager"
            priority
        />

        <Formik
            initialValues={{
                code: ''
            }}
            validationSchema={VerificationCodeValidationSchema}
            enableReinitialize
            onSubmit={async (values) => {
                await handleSignIn(values);
            }}>{({
                values,
                errors,
                touched,
                handleSubmit,
                setFieldValue,
                handleChange
            }) => (
                <form
                    className={'col-12 ' + styles.loginForm}
                    onSubmit={handleSubmit}>

                    <h5 className={styles.title}>Sign Up/Log In</h5>

                    <div className={styles.subtitle}>An email containing a code has been sent to:<br /><span>{email}</span></div>

                    <div className={'col-12 ' + styles.verificationInputCard}>
                        <div className={styles.inputEmailTitle}>Code {seconds !== 0 && `${seconds}s`} </div>
                        <OtpInput
                            disable={loading}
                            valueLength={6}
                            onChange={(e) => setFieldValue('code', e)}
                            input_name='code'
                            value={values.code}
                            input_error={errors.code && touched.code && errors.code}
                        />
                        {
                            !errors.code &&
                            <ProgressBar timer={seconds} />
                        }
                    </div>


                    <button
                        disabled={values.code.length < 6}
                        style={values.code.length < 6 ? { opacity: 0.5, marginBottom: 0 } : { opacity: 1, marginBottom: 0 }}
                        aria-label="login button"
                        className={styles.submitEmailButton} type="submit">
                        {
                            loading ?
                                <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} />
                                :
                                'Continue'
                        }
                    </button>

                    <div className={styles.buttonsCard}>
                        <button
                            onClick={() => router.back()}
                            aria-label="login button"
                            className={styles.backButton} type="button">
                            <IoIosArrowRoundBack className={styles.backIcon} /> Back
                        </button>
                        <button
                            disabled={!resendCode}
                            style={resendCode ? { opacity: 1 } : { opacity: 0.5 }}
                            onClick={() => { handleEmailSignIn() }}
                            aria-label="login button"
                            className={styles.resendButton} type="button">
                            {
                                resendLoading ?
                                    <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} />
                                    :
                                    <> <TbRefresh style={{ marginRight: 5 }} /> Resend Code</>
                            }
                        </button>
                    </div>

                </form>
            )}
        </Formik>

    </div>
};

export default VerificationCode;

const ProgressBar: React.FC<{ timer: number }> = ({ timer }) => {
    return <AnimatePresence>
        <div className={styles.progressBar}>
            <motion.div
                animate={{ width: `${(timer / 60) * 100}%` }}
                transition={{ duration: 1, type: 'spring' }}
                className={styles.prossessBar}
            ></motion.div>
        </div>
    </AnimatePresence>
}