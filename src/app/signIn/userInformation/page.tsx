'use client';
import React, { lazy } from "react";
import Image from "next/image";
import { Divider } from 'antd';
import { Formik } from 'formik';
// import * as Yup from 'yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { DatePicker } from "@mui/x-date-pickers";
import { useRouter } from 'next/navigation';

//---------------------------------------------------styles
import styles from '../signIn.module.css';

//---------------------------------------------------components
const Input = lazy(() => import("@/components/input/input"));
const Pagination = React.lazy(
    () => import("@/components/pagination/pagination").then(module => ({ default: module.Pagination }))
);

const UserInformation: React.FC = () => {
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
                loading="eager"
            />
            <Formik
                initialValues={{
                    name: '',
                    gender: '',
                }}
                // validationSchema={VerificationCodeValidationSchema}
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

                        <Pagination className={styles.pagination} lenght={2} currentPage={2} color="#2E4057" />

                        <div className={styles.title} style={{ marginTop: 30 }}>About you</div>

                        <div className={'col-12 ' + styles.inputEmailTitle}>Name</div>
                        <Input
                            className={styles.nameInput}
                            onChange={handleChange}
                            input
                            inputtype='name'
                            input_name='name'
                            input_value={values.name}
                            input_error={errors.name && touched.name && errors.name}
                        />

                        <div className={'col-lg-12 ' + styles.ageAndGenderContainer}>

                            <div>
                                <div className={'col-12 ' + styles.inputEmailTitle}>Age</div>
                                <DatePicker className={styles.datePicker} />
                            </div>

                            <div>
                                <div className={'col-12 ' + styles.inputEmailTitle}>Gender</div>
                                <Select
                                    defaultValue=""
                                    value={values.gender}
                                    onChange={(e) => setFieldValue('gender', e.target.value)}
                                    displayEmpty
                                    inputProps={{ 'aria-label': 'gender select' }}
                                    className={styles.select}
                                >

                                    <MenuItem value={'male'}>Male</MenuItem>
                                    <MenuItem value={'female'}>Female</MenuItem>
                                </Select>
                            </div>

                        </div>

                        <div className={styles.step4ButtonContainer}>

                            <button
                                onClick={() => router.push('/dashboard')}
                                className={styles.submitEmailButton} type="submit">
                                CTA
                            </button>

                            <Divider style={{ marginTop: 20 }} plain>or</Divider>

                            <button
                                onClick={() => router.push('/dashboard')}
                                className={styles.skipButton} type="submit">
                                skip
                            </button>

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

export default UserInformation;