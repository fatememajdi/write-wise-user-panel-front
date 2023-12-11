'use client';
import React, { lazy } from "react";
import Image from "next/image";
import { Divider } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useMutation } from "@apollo/react-hooks";
import toast from "react-hot-toast";
import { signIn } from 'next-auth/react';
import Link from "next/link";
import dynamic from "next/dynamic";
import ReactLoading from "react-loading";
import { motion, useAnimation } from "framer-motion";

//---------------------------------------------------styles
import styles from './signIn.module.css';

//---------------------------------------------------icons
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';
import { GrApple } from 'react-icons/gr';

//---------------------------------------------------components
const Input = dynamic(() => import("@/components/input/input"));
import { EMAIL_SIGN_IN } from '../../config/graphql';
import Loading from "@/components/loading/loading";
import { StopLoader } from "@/components/Untitled";
import { Checkbox } from 'antd';

//---------------------------------------------------------------validation
const EmailValidationSchema = Yup.object().shape({
    email: Yup
        .string()
        .email("Invalid email format")
        .required('Username is required!'),
});

const getRandomDelay = () => -(Math.random() * 0.7 + 0.05);

const randomDuration = () => Math.random() * 0.07 + 0.23;

const variants = {
    start: (i) => ({
        rotate: i % 2 === 0 ? [-1, 1.3, 0] : [1, -1.4, 0],
        transition: {
            delay: getRandomDelay(),
            repeat: Infinity,
            duration: randomDuration()
        },
        color: 'red'
    }),
    reset: {
        rotate: 0,
        color: '#2E4057'
    }
};

const Page: React.FC = () => {

    const controls = useAnimation();
    const router = useRouter();
    const [emailSignIn] = useMutation(EMAIL_SIGN_IN);
    const [loading, changeLoading] = React.useState<boolean>(false);
    const [checkTerms, setcheckTerm] = React.useState<boolean>(false);

    React.useEffect(() => {
        StopLoader();
        setTimeout(() => {
            changeLoading(false);
        }, 2000);
    }, []);

    const handleEmailSignIn = async (values: any) => {
        if (!checkTerms) {
            controls.start("start");
            setTimeout(() => {
                controls.stop();
                controls.set("reset");
            }, 2000);
        } else {
            changeLoading(true);
            await emailSignIn({
                variables: {
                    email: values.email,
                },
            }).then(async (res) => {
                await router.push('/signIn/verificationCode');
                setTimeout(() => {
                    changeLoading(false);
                }, 9000);
                localStorage.setItem('email', res.data.emailLogin.email);

            }
            ).catch(async (err) => {
                toast.error(err.message);
                changeLoading(false);
            });
        }
    };

    const handeClickGoogle = async () => {
        const signInResponse = signIn('google');
        if (signInResponse)
            console.log('google login sign in response : ', signInResponse);
    }

    const handeClickApple = async () => {
        const signInResponse = await signIn('apple');
        if (signInResponse)
            console.log('google login sign in response : ', signInResponse);
    }

    const handeClickFaceBook = async () => {
        const signInResponse = await signIn('facebook');
        if (signInResponse)
            console.log('google login sign in response : ', signInResponse);
    }

    return (
        <div className={'col-12 ' + styles.signInPageContainer}>

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
                    email: ''
                }}
                validationSchema={EmailValidationSchema}
                enableReinitialize
                onSubmit={async (values) => {
                    await handleEmailSignIn(values);
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
                        <div className={'col-12 ' + styles.inputCard}>
                            <div className={styles.inputEmailTitle}>Email</div>
                            <Input
                                className={styles.emailInput}
                                onChange={handleChange}
                                input
                                inputtype='email'
                                input_name='email'
                                input_value={values.email}
                                input_error={errors.email && touched.email && errors.email}
                            />
                        </div>
                        <button
                            aria-label="login button"
                            className={styles.submitEmailButton} type="submit">
                            {
                                loading ?
                                    <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} />
                                    :
                                    'Log in'
                            }
                        </button>

                        {/* <Pagination lenght={2} currentPage={1} color="#2E4057" /> */}

                        <Divider style={{ marginTop: 32, fontSize: 20, fontWeight: 300 }} plain>or</Divider>

                        <a
                            // onClick={handeClickGoogle}
                            className={styles.signInOptionsbutton + ' ' + styles.googleSingInCard}>
                            <FcGoogle className={styles.signInOptionsIcon} />Sign in with Google
                        </a>
                        <a
                            // onClick={handeClickFaceBook}
                            className={styles.signInOptionsbutton + ' ' + styles.faceBookSingInCard}>
                            <SiFacebook className={styles.signInOptionsIcon} />Sign in with Facebook
                        </a>

                        <a
                            // onClick={handeClickApple}
                            className={styles.signInOptionsbutton + ' ' + styles.appleSingInCard}>
                            <GrApple className={styles.signInOptionsIcon} />Sign in with Apple
                        </a>

                        <motion.div
                            variants={variants}
                            animate={controls}
                        >
                            <div className={styles.footerText}>
                                <Checkbox style={{ height: 24, width: 24 }} onChange={(e) => setcheckTerm(e.target.checked)}>
                                </Checkbox>

                                By login, you agree to our <Link href="/termsOfService">Terms of<br /> Service</Link>
                                and <Link href="/privacyPolicy">Privacy Policy .</Link>
                            </div>
                        </motion.div>
                    </form>
                )}
            </Formik>

        </div>
    )
};

export default Page;
