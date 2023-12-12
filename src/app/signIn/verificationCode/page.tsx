/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React, { lazy } from "react";
import Image from "next/image";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import ReactLoading from "react-loading";
import { AnimatePresence, motion } from "framer-motion";

//---------------------------------------------------styles
import styles from '../signIn.module.css';

//---------------------------------------------------components
const OtpInput = lazy(() => import("@/components/otpIput/otpIput"));
import { EMAIL_SIGN_IN, VERIFICATION_CODE } from '../../../config/graphql';
import Loading from "@/components/loading/loading";

//---------------------------------------------------icons
import { IoIosArrowRoundBack } from 'react-icons/io';
import { TbRefresh } from 'react-icons/tb';

//---------------------------------------------------------------validation
const VerificationCodeValidationSchema = Yup.object().shape({
    code: Yup
        .string()
        .required('Verification code is required!'),
});

const VerificationCode: React.FC = () => {

    const router = useRouter();
    const [verificationCode] = useMutation(VERIFICATION_CODE);
    const [loading, changeLoadig] = React.useState<boolean>(false);
    const [resendLoading, changeResendLoadig] = React.useState<boolean>(false);
    const [emailSignIn] = useMutation(EMAIL_SIGN_IN);
    const [resendCode, changeResendCode] = React.useState<boolean>(false);
    const [seconds, changeSeconds] = React.useState<number>(60);

    let email;
    if (typeof document !== 'undefined')
        email = localStorage.getItem('email');

    const handleSignIn = async (values: any) => {
        changeLoadig(true);
        await verificationCode({
            variables: {
                email: email,
                code: values.code
            },
        }).then(async (data) => {
            localStorage.setItem("user", JSON.stringify(data.data.verifyEmail.token));
            await router.push('/ielts');
        }
        ).catch(async (err) => {
            toast.error(err.message);
            changeLoadig(false);
        });
    };

    const handleEmailSignIn = async () => {
        changeResendLoadig(true);
        await emailSignIn({
            variables: {
                email: email,
            },
        }).then(async (res) => {
            changeResendLoadig(false);
            changeResendCode(false);
            toast.success('An email containing a code has been sent to your email.');
            setTimeout(() => {
                changeResendCode(true);
            }, 60000);
            changeSeconds(60);
        }
        ).catch(async (err) => {
            toast.error(err.message);
            changeResendLoadig(false);
        });
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

                    <h5 className={styles.title}>Sign Up/Log in</h5>

                    <div className={styles.subtitle}>An email containing a code has been sent to:<br /><span>{email}</span></div>

                    <div className={'col-12 ' + styles.inputCard}>
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
                            <IoIosArrowRoundBack fontSize={45} /> Back
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

const showAnimation = {
    hidden: {
        width: '100%',
        transition: {
            duration: 0.5,
        }
    },
    show: {
        width: 0,
        transition: {
            duration: 60,
        }
    }
};
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