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

//---------------------------------------------------components
const OtpInput = dynamic(() => import("@/components/otpIput/otpIput"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-[60px]">
        <ReactLoading type={'spin'} color={'#929391'} height={30} width={30} /></div>
});

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

export default function VerificationCode() {

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
            localStorage.setItem("user", token as string);
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

    return <div className='col-12 flex flex-col h-screen overflow-hidden lg:bg-login-pattern mac:bg-login-pattern bg-cover bg-no-repeat items-center justify-center relative sm:bg-login-mobile-pattern sm:h-fit sm:min-h-screen '>

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
                    className='col-12 flex flex-col items-center w-fit '
                    onSubmit={handleSubmit}>

                    <h5 className='leading-[12px] text-seccondaryColor mb-[82px] '>Sign Up/Log In</h5>

                    <div className=' text-blackText text-center text-[20px] mb-[38px] font-light sm:w-[247px] sm:text-[13px] '>An email containing a code has been sent to:<br />
                        <span className=" font-bold ">{email}</span></div>

                    <div className='col-12 h-fit relative max-w-[360px] rounded-[8px] '>
                        <div className=' font-light text-[24px] z-[2] absolute left-[17px] top-[-15px] bg-[#F3F3F3] sm:bg-[#F0E9EA] py-0 px-[2px] sm:text-[16.3px] sm:leading-[8.1px] sm:top-[-5px] '>
                            Code {seconds !== 0 && `${seconds}s`}
                        </div>
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
                        className='mt-[32px] font-bold text-[24px] leading-[12px] text-whiteText bg-seccondaryColor w-[360px] h-[54px] mb-[32px] sm:w-[247px] sm:h-[37px] sm:text-[16px] sm:leading-[8.1px] ' type="submit">
                        {
                            loading ?
                                <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} />
                                :
                                'Continue'
                        }
                    </button>

                    <div className='flex flex-row items-center mt-[12px] max-w-[360px] sm:max-w[247px] justify-between w-full '>
                        <button
                            onClick={() => router.back()}
                            aria-label="login button"
                            className='m-0 h-[48px] text-[24px] w-fit sm:w-[89px] text-center bg-seccondaryColor font-semibold items-center justify-center text-whiteText px-[12px] sm:h-[33px] sm:text-[16.6px] ' type="button">
                            <IoIosArrowRoundBack className='text-[45px] sm:text-[25px]' /> Back
                        </button>
                        <button
                            disabled={!resendCode}
                            style={resendCode ? { opacity: 1 } : { opacity: 0.5 }}
                            onClick={() => { handleEmailSignIn() }}
                            aria-label="login button"
                            className='m-0 h-[48px] text-[24px] min-w-[198px] sm:min-w-[138px] w-fit text-center bg-seccondaryColor font-semibold items-center justify-center text-whiteText px-[12px] sm:h-[33px] sm:text-[16.6px] ' type="button">
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

function ProgressBar({ timer }: { timer: number }) {
    return <AnimatePresence>
        <div className='h-[8px] w-full bg-grayColor flex flex-row items-center justify-center rounded-b-[8px] z-10 relative mb-[32px] '>
            <motion.div
                animate={{ width: `${(timer / 60) * 100}%` }}
                transition={{ duration: 1, type: 'spring' }}
                className='h-[8px] bg-primaryColor absolute left-0 top-0 bottom-0 rounded-b-[8px] '
            ></motion.div>
        </div>
    </AnimatePresence>
};