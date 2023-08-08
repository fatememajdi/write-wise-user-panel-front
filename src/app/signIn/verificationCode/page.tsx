'use client';
import React, { lazy } from "react";
import Image from "next/image";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from "@apollo/react-hooks";
import { useRouter } from "next/navigation";

//---------------------------------------------------styles
import styles from '../signIn.module.css';

//---------------------------------------------------components
const OtpInput = lazy(() => import("@/components/otpIput/otpIput"));
import { VERIFICATION_CODE } from '../../../config/graphql';
import Loading from "@/components/loading/loading";

//---------------------------------------------------------------validation
const VerificationCodeValidationSchema = Yup.object().shape({
    code: Yup
        .string()
        .min(6, 'Verification code must be 6 digits')
        .required('Verification code is required!'),
});

const VerificationCode: React.FC = () => {

    const router = useRouter();
    const [verificationCode, { error }] = useMutation(VERIFICATION_CODE);
    const [loading, changeLoadig] = React.useState<boolean>(false);

    const handleSignIn = async (values: any) => {
        changeLoadig(true);
        let email = localStorage.getItem('email');
        await verificationCode({
            variables: {
                email: email,
                code: values.code
            },
        }).then(async (data) => {
            localStorage.setItem("user", JSON.stringify(data.data.verifyEmail.token));
            await router.push('/dashboard');
            // setTimeout(() => {
            //     changeLoadig(false);
            // }, 5000);
        }
        ).catch((error) => {
            console.log('verification error : ', error);
            changeLoadig(false);
        });
    };
    if (loading)
        return <Loading />
    else
        return <div className={'col-12 ' + styles.signInPageContainer}>
            <div className={'col-lg-7 ' + styles.signInLeftContainer}>
                <Image
                    className={styles.logo}
                    src="/logo.svg"
                    alt="Logo"
                    width={151}
                    height={16}
                    priority
                    loading="eager"
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
                            className={'col-12 ' + styles.stepContainer}
                            onSubmit={handleSubmit}>

                            <div className={styles.title}>Sign Up/Log in</div>


                            <div className={'col-12 ' + styles.inputEmailTitle}>Code</div>
                            <OtpInput
                                valueLength={6}
                                onChange={(e) => setFieldValue('code', e)}
                                input_name='code'
                                value={values.code}
                                input_error={errors.code && touched.code && errors.code}
                            />

                            <button
                                aria-label="login button"
                                className={styles.submitEmailButton} type="submit">
                                Log in
                            </button>

                            <div className={styles.footerText}>
                                By login, you agree to our <a>Terms of<br /> Service</a> and <a>Privacy Policy .</a>
                            </div>

                        </form>
                    )}
                </Formik>
            </div>

            <div className={'col-lg-5 ' + styles.signInrightContainer}>
                <div className={styles.circle1} />
                <div className={styles.circle2} />
                <div className={styles.circle3} />
                <div className={styles.circle4} />
                <div className={styles.circle5} />
            </div>

        </div>
};

export default VerificationCode;