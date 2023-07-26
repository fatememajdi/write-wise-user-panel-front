'use client';
import React from "react";
import Image from "next/image";
import { Formik } from 'formik';
// import * as Yup from 'yup';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from "next/navigation";

//-------------------------------------styles
import styles from './profile.module.css';

//-------------------------------------icons
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Camera, CloseButton, Edit } from '../../../public';
import { HiCheck } from 'react-icons/hi';

//-------------------------------------components
import ProfileCardBackground from "@/components/backgrounds/profileCardBackground/profileCardBackground";
import Input from "@/components/input/input";

const Profile: React.FC = () => {

    const [profile, setprofile] = React.useState<boolean>(true);
    const [step, changeStep] = React.useState<number>(1);
    const router = useRouter();

    return <div className={'col-12 ' + styles.profileContainer}>
        <div className={'col-12 ' + styles.profileHeader}>
            <Image
                className={styles.logo}
                src="/logo.svg"
                alt="Logo"
                width={133}
                height={15}
                priority
                loading="eager" 
            />
            <a
                onClick={() => {
                    if (step > 1) changeStep(step - 1);
                    else router.back();
                }}
                className={styles.backcard}>
                <MdOutlineArrowBackIosNew /> Back
            </a>
        </div>

        <div className={'col-lg-10 ' + styles.profilePageContent}>
            <div className={'col-12 ' + styles.profilePictureContainer}>
                <div className={styles.leftDivider} />
                <div className={styles.profileCard}>
                    {
                        profile ?
                            <Image
                                className={styles.profileImage}
                                src="/profile.jpg"
                                alt="profile"
                                width={207}
                                height={207}
                                priority
                                loading="eager" 
                            />
                            :
                            <Camera />
                    }
                </div>
                <div className={styles.rightDivider} />
            </div>

            {
                step == 1 ?
                    <UserInformationCard changeStep={changeStep} />
                    :
                    <EditUserCard changeStep={changeStep} />
            }

        </div>
    </div>
};

export default Profile;

const UserInformationCard: React.FC<{ changeStep: any }> = ({ changeStep }) => <div className={styles.userInformationCard}>
    <ProfileCardBackground>
        <div className={styles.userName}>John Doe</div>
        <div className={styles.joinDate}>Member since: June 2022</div>
        <div className={styles.age}>27 years old  </div>
        <div className={styles.gender}>Male</div>
        <a
            onClick={() => changeStep(2)}
            className={styles.editButton}>
            <Edit />
        </a>
    </ProfileCardBackground>
</div>;

const EditUserCard: React.FC<{ changeStep: any }> = ({ changeStep }) => <Formik
    initialValues={{
        name: '',
        age: '',
        gender: ''
    }}
    // validationSchema={EmailValidationSchema}
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
                    style={{ marginTop: 35 }}
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
                </Select>


                <button
                    className={styles.editButton}>
                    <HiCheck className={styles.checkIcon} />
                </button>
                <button
                    onClick={() => changeStep(1)}
                    className={styles.closeButton}>
                    <CloseButton />
                </button>
            </ProfileCardBackground>
        </form>
    )}
</Formik>;