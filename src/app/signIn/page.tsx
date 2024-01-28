'use client';
import React from "react";
import Image from "next/image";
import { Divider } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { signIn, signOut, useSession } from 'next-auth/react';
import Link from "next/link";
import dynamic from "next/dynamic";
import { Checkbox } from 'antd';
import ReactLoading from "react-loading";
import { motion, useAnimation } from "framer-motion";

//---------------------------------------------------styles
import styles from './signIn.module.css';

//---------------------------------------------------icons
import { FcGoogle } from 'react-icons/fc';
import { SiFacebook } from 'react-icons/si';

//---------------------------------------------------components
const Input = dynamic(() => import("@/components/input/input"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-[60px]">
        <ReactLoading type={'spin'} color={'#929391'} height={30} width={30} /></div>
});
import { StopLoader } from "@/components/Untitled";
import { EmaiSignIn } from "@/hooks/actions";
import toast from "react-hot-toast";

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
    }
};

interface pageProps {
    searchParams: any
};

export default function Page({ searchParams }: pageProps) {

    const controls = useAnimation();
    const router = useRouter();
    const [loading, changeLoading] = React.useState<boolean>(false);
    const [checkTerms, setcheckTerm] = React.useState<boolean>(false);



    React.useEffect(() => {
        localStorage.clear();
        StopLoader();
        setTimeout(() => {
            if (searchParams.error)
                if (window.location.hash === '#_=_') {
                    toast.error('Facebook login service is not available right now. Please try later, choose another login method, or contact support.')
                } else {
                    toast.error('Google login service is not available right now. Please try later, choose another login method, or contact support.');
                }
        }, 500);
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
            let res: string = await EmaiSignIn(values.email);
            if (res) {
                await router.push('/signIn/verificationCode');
                localStorage.setItem('email', res);

            }
        }
    };


    const handeClickGoogle = async () => {
        if (!checkTerms) {
            controls.start("start");
            setTimeout(() => {
                controls.stop();
                controls.set("reset");
            }, 2000);
        } else {
            await signIn('google', { callbackUrl: '/ielts' });
        }
    };

    const handeClickApple = async () => {
        await signIn('apple');
    };

    const handeClickFaceBook = async () => {
        if (!checkTerms) {
            controls.start("start");
            setTimeout(() => {
                controls.stop();
                controls.set("reset");
            }, 2000);
        } else {
            const signInResponse = await signIn('facebook', { callbackUrl: '/ielts' });
            if (signInResponse)
                console.log('google login sign in response : ', signInResponse);
        }
    };

    return (
        <div className='col-12 flex flex-col h-screen overflow-hidden lg:bg-login-pattern mac:bg-login-pattern bg-cover bg-no-repeat items-center justify-center relative sm:bg-login-mobile-pattern sm:h-fit sm:min-h-screen '>

            <Image
                className='w-[183px] h-[24px] absolute top-[66px] left-[70px] sm:right-auto sm:left-auto sm:w-[122px] sm:h-[16px] '
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
                        className='col-12 flex flex-col items-center w-fit '
                        onSubmit={handleSubmit}>
                        <h5 className='leading-[12px] text-seccondaryColor mb-[82px] '>Sign Up/Log In</h5>
                        <div className={'relative h-fit max-w-[360px] w-[360px] '
                            + (errors.email && touched.email && errors.email ? ' border-none ' : 'border-[1px] rounded-[8px] border-primaryColor sm:w-[247px] ')}>
                            <div className=' font-light text-[24px] z-[2] absolute left-[17px] top-[-15px] sm:bg-[#F0E9EA] bg-[#F3F3F3] py-0 px-[2px] sm:text-[16.3px] sm:leading-[8.1px] sm:top-[-5px] '>
                                Email
                            </div>
                            <Input
                                disable={loading}
                                className={' w-[360px] sm:w-[247px] sm:h-[44px] ' + styles.emailInput}
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
                            className='mt-[32px] font-bold text-[24px] leading-[12px] text-whiteText bg-seccondaryColor w-[360px] h-[54px] mb-[32px] sm:w-[247px] sm:h-[37px] sm:text-[16px] sm:leading-[8.1px] ' type="submit">
                            {
                                loading ?
                                    <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} />
                                    :
                                    'Log in'
                            }
                        </button>

                        <Divider className="mt-[32px] text-[20px] font-light " plain>or</Divider>

                        <a
                            onClick={handeClickGoogle}
                            className={'flex flex-row items-center no-underline font-semibold text-[16px] leading-[24px] w-[360px] h-[44px] justify-center mt-[15px] cursor-pointer rounded-[8px] sm:w-[247px] sm:h-[30px] sm:text-[11px] sm:font-semibold sm:leading-[16.5px] border-[1px] border-[#D0D5DD] bg-background '}>
                            <FcGoogle className='mr-[12px] text-[24px] sm:text-[18px] ' />Sign in with Google
                        </a>

                        {
                            process.env.NEXT_PUBLIC_ENV === 'DEVELOPER' &&
                            <a
                                onClick={handeClickFaceBook}
                                className={'flex flex-row items-center no-underline font-semibold text-[16px] leading-[24px] w-[360px] h-[44px] justify-center mt-[15px] cursor-pointer rounded-[8px] sm:w-[247px] sm:h-[30px] sm:text-[11px] sm:font-semibold sm:leading-[16.5px] border-[1px] border-[#1877F2] bg-[#1877F2] text-whiteText'}>
                                <SiFacebook className='mr-[12px] text-[24px] sm:text-[18px] ' />Sign in with Facebook
                            </a>

                        }

                        {/* <Pagination lenght={2} currentPage={1} color="#2E4057" /> */}

                        {/* <Divider style={{ marginTop: 32, fontSize: 20, fontWeight: 300 }} plain>or</Divider>

                    

                        <a
                            // onClick={handeClickApple}
                            className={styles.signInOptionsbutton + ' ' + styles.appleSingInCard}>
                            <GrApple className={styles.signInOptionsIcon} />Sign in with Apple
                        </a> */}

                        <motion.div
                            variants={variants}
                            animate={controls}
                        >
                            <div className='font-light text-[14px] leading-[22px] text-center text-inherit mt-[48px] sm:text-[9.6px] sm:font-light sm:leading-[15.12px] '>
                                <Checkbox className="h-[24px] w-[24px] " onChange={(e) => setcheckTerm(e.target.checked)}>
                                </Checkbox>

                                By login, you agree to our
                                <Link className=" underline font-medium cursor-pointer " href="/termsOfService">Terms of<br /> Service </Link>
                                and <Link className=" underline font-medium cursor-pointer " href="/privacyPolicy">Privacy Policy.</Link>
                            </div>
                        </motion.div>
                    </form>
                )}
            </Formik>

        </div>
    )
};