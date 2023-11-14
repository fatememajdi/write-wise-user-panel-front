/* eslint-disable react/jsx-key */
'use client';
import React from "react";
import { Formik } from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dynamic from "next/dynamic";

//-------------------------------------styles
import styles from './profile.module.css';

//-------------------------------------icons
import { CloseButton, MobileCloseButton } from '../../../public';
import { HiCheck } from 'react-icons/hi';

//-------------------------------------components
import ProfileCardBackground from "@/components/backgrounds/profileCardBackground/profileCardBackground";
const Input = dynamic(() => import("@/components/input/input"), { ssr: false });

//-------------------------------------types
import { UserProfile } from "../../../types/profile";

const EditUserCard: React.FC<{ goTo: any, UpdateProfile: any, user?: UserProfile }> = ({ goTo, UpdateProfile, user }) => {

    return <Formik
        initialValues={{
            name: '',
            age: '',
            gender: ''
        }}
        enableReinitialize
        onSubmit={async (values) => {
            await UpdateProfile(values);
        }}>{({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            handleChange
        }) => (
            <form
                className={styles.userInformationCard}
                onSubmit={handleSubmit}>
                <ProfileCardBackground>
                    <Input
                        className={styles.input}
                        onChange={handleChange}
                        input
                        placeHolder="Name"
                        inputtype='name'
                        input_name='name'
                        input_value={values.name}
                        input_error={errors.name && touched.name && errors.name}
                    />
                    <div className={styles.editUserJoinDate}>Member since: June 2022</div>
                    <Input
                        className={styles.input}
                        onChange={handleChange}
                        input
                        placeHolder="Age"
                        inputtype='age'
                        input_name='age'
                        input_value={values.age}
                        input_error={errors.age && touched.age && errors.age}
                    />
                    <Select
                        value={values.gender}
                        onChange={(e) => setFieldValue('gender', e.target.value)}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                        className={styles.select}
                    >
                        <MenuItem value={''} disabled>Gender</MenuItem>
                        <MenuItem value={'male'}>Male</MenuItem>
                        <MenuItem value={'female'}>Female</MenuItem>
                        <MenuItem value={'other'}>Other</MenuItem>
                    </Select>
                    <div className={styles.username}>Username:{user?.email}</div>

                    <button
                        type="submit"
                        aria-label="edit profile button"
                        className={styles.editButton}>
                        <div><HiCheck className={styles.checkIcon} /></div>
                    </button>
                    <button
                        type='button'
                        aria-label="cancle button"
                        onClick={() => goTo(0)}
                        className={styles.closeButton}
                    >
                        <CloseButton className={styles.closeIcon} />
                        <MobileCloseButton className={styles.mobileCloseIcon} />
                    </button>
                </ProfileCardBackground>
            </form>
        )}
    </Formik>
};

export default EditUserCard;