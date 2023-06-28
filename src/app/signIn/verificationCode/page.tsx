'use client';
import React from "react";
import Image from "next/image";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from "next/navigation";

//---------------------------------------------------styles
import styles from '../signIn.module.css';

//---------------------------------------------------components
import OtpInput from "@/components/otpIput/otpIput";

//---------------------------------------------------------------validation
const VerificationCodeValidationSchema = Yup.object().shape({
    code: Yup
        .string()
        .min(6, 'Verification code must be 6 digits')
        .required('Verification code is required!'),
});

const VerificationCode: React.FC = () => {

    const router = useRouter();

    return <div className={'col-12 ' + styles.signInPageContainer}>
        <div className={'col-lg-7 ' + styles.signInLeftContainer}>
            <Image
                className={styles.logo}
                src="/logo.svg"
                alt="Logo"
                width={151}
                height={16}
                priority
            />
            <Formik
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
                            onClick={() => router.push('/signIn/userInformation')}
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