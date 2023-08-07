'use client';
import React, { use } from "react";
import Image from "next/image";
import { Formik } from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import client from '@/config/applloAuthorizedClient';
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
import { GET_PROFILE, UPDATE_USER } from "@/config/graphql";

//-------------------------------------types
import { UserProfile } from "../../../types/profile";

const Profile: React.FC = () => {

    const [profile, setprofile] = React.useState<UserProfile>();
    const [step, changeStep] = React.useState<number>(1);
    const router = useRouter();

    async function GetProfile() {
        await client.query({
            query: GET_PROFILE
        }).then(async (res) => {
            setprofile(res.data.getUserProfile);
        }).catch((err) => {
            console.log("get user profile error : ", err);
        });
    }

    React.useEffect(() => {
        GetProfile();
    });

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
                        profile?.profile ?
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
                    <UserInformationCard changeStep={changeStep} user={profile} />
                    :
                    <EditUserCard changeStep={changeStep} setprofile={setprofile} />
            }

        </div>
    </div>
};

export default Profile;

const UserInformationCard: React.FC<{ changeStep: any, user?: UserProfile }> = ({ changeStep, user }) => <div className={styles.userInformationCard}>
    <ProfileCardBackground>
        <div className={styles.userName}>{user?.firstName + ' ' + user?.lastName}</div>
        <div className={styles.joinDate}>Member since: June 2022</div>
        <div className={styles.age}>{user?.age} years old  </div>
        <div className={styles.gender}>{user?.gender}</div>
        <div className={styles.username}>Username:{user?.email}</div>
        <a
            onClick={() => changeStep(2)}
            className={styles.editButton}>
            <Edit />
        </a>
    </ProfileCardBackground>
</div>;

const EditUserCard: React.FC<{ changeStep: any, setprofile: any }> = ({ changeStep, setprofile }) => {

    async function UpdateProfile(values: { age: string, name: string, gender: string }) {
        console.log('hi')
        await client.mutate({
            mutation: UPDATE_USER,
            variables: {
                age: values.age != '' ? parseInt(values.age) : null,
                firstName: values.name != '' ? values.name : null,
                gender: values.gender != '' ? values.gender : null
            }
        }).then(async (res) => {
            setprofile(res.data.updateUserProfile);
        }).catch((err) => {
            console.log("update user profile error : ", err);
        });
    }

    return <Formik
        initialValues={{
            name: '',
            age: '',
            gender: ''
        }}
        // validationSchema={EmailValidationSchema}
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
                        <MenuItem value={'other'}>Other</MenuItem>
                    </Select>


                    <button
                        type="submit"
                        aria-label="edit profile button"
                        className={styles.editButton}>
                        <HiCheck className={styles.checkIcon} />
                    </button>
                    <button
                        type='button'
                        aria-label="cancle button"
                        onClick={() => changeStep(1)}
                        className={styles.closeButton}>
                        <CloseButton />
                    </button>
                </ProfileCardBackground>
            </form>
        )}
    </Formik>
};