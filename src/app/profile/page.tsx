/* eslint-disable react/jsx-key */
'use client';
import React from "react";
import Image from "next/image";
import { Formik } from 'formik';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import client from '@/config/applloAuthorizedClient';
import uploadFileClient from "@/config/appolloUploadFileClient";
import { useRouter } from "next/navigation";
import { Modal } from 'antd';

//-------------------------------------styles
import styles from './profile.module.css';

//-------------------------------------icons
import { MdOutlineArrowBackIosNew, MdModeEditOutline } from 'react-icons/md';
import { Camera, Chat, Chat2, CloseButton, MobileCloseButton } from '../../../public';
import { HiCheck } from 'react-icons/hi';

//-------------------------------------components
import ProfileCardBackground from "@/components/backgrounds/profileCardBackground/profileCardBackground";
import Input from "@/components/input/input";
import { GET_PROFILE, UPDATE_USER, UPLOAD_PROFILE_FILE } from "@/config/graphql";
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
import { StopLoader } from "@/components/Untitled";

//-------------------------------------types
import { UserProfile } from "../../../types/profile";
import Loading from "@/components/loading/loading";

const Profile: React.FC = () => {

    const [profile, setprofile] = React.useState<UserProfile>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalContent, changeModalContent] = React.useState<string>('Tr again!');
    const { step, goTo, currentStepIndex } = useMultiStepForm(
        [<UserInformationCard user={profile} goTo={GoTo} />, <EditUserCard goTo={GoTo} UpdateProfile={UpdateProfile} user={profile} />]);
    const router = useRouter();
    const [inputImage, setInputImage] = React.useState<File>();

    const onChangePic = async (e: any) => {
        await setInputImage(e.target.files[0]);
    }
    function GoTo(step: number) { goTo(step) };

    async function GetProfile() {
        await client.query({
            query: GET_PROFILE
        }).then(async (res) => {
            setprofile(res.data.getUserProfile);
            setLoading(false);
        }).catch((err) => {
            console.log("get user profile error : ", err);
        });
    }

    async function UpdateProfile(values: { age: string, name: string, gender: string }) {
        setLoading(true);
        await client.mutate({
            mutation: UPDATE_USER,
            variables: {
                age: values.age != '' ? parseInt(values.age) : profile?.age,
                firstName: values.name != '' ? values.name : profile?.firstName,
                lastName: '',
                gender: values.gender != '' ? values.gender : profile?.lastName
            }
        }).then(async (res) => {
            await setprofile(res.data.updateUserProfile);
            goTo(0);
            setLoading(false);
        }).catch(async (err) => {
            await changeModalContent(JSON.stringify(err.message));
            setLoading(false);
            showModal();
        });
    }

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    async function UploadProfile() {
        await uploadFileClient.mutate({
            mutation: UPLOAD_PROFILE_FILE,
            variables: {
                file: inputImage
            }
        }).then(async (res) => {
            console.log(res);
        }).catch((err) => {
            console.log("update user profile error : ", err);
        });
    }

    React.useEffect(() => {
        StopLoader();
        GetProfile();
    }, []);

    return <div className={'col-12 ' + styles.profileContainer}>
        {/* ------------------------------------------------------------------------desktop header */}
        <div className={'col-12 ' + styles.profileHeader}>
            <button
                aria-label="chat button"
                className={styles.chatButton}>
                <Chat />
            </button>
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
                    if (currentStepIndex > 0) goTo(currentStepIndex - 1);
                    else router.back();
                }}
                className={styles.backcard}>
                <MdOutlineArrowBackIosNew /> Back
            </a>
        </div>

        {/* ------------------------------------------------------------------------mobile header */}
        <div className={'col-12 ' + styles.responsiveProfileHeader}>
            <a
                onClick={() => {
                    if (currentStepIndex > 0) goTo(currentStepIndex - 1);
                    else router.back();
                }}
                className={styles.responsiveBackcard}>
                <MdOutlineArrowBackIosNew /> Back
            </a>
            <Image
                className={styles.responsiveLogo}
                src="/logo3.svg"
                alt="Logo"
                width={81}
                height={17}
                priority
                loading="eager"
            />
            <button
                aria-label="chat button"
                className={styles.responsiveChatButton}
            >
                <Chat2 />
            </button>
        </div>

        {/* <label className="image-picker flex" id="image-show">
            <input type="file" id="fileupload" style={{ width: '100%', height: '100%' }} className="hide" onChange={onChangePic} />
        </label> */}

        {/* <button onClick={() => UploadProfile()}>
            upload
        </button> */}

        {
            loading ?
                <Loading /> :
                <div className={'col-lg-9 col-md-9 col-12 ' + styles.profilePageContent}>
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
                    {step}
                </div>
        }
        <Modal
            footer={null}
            title={"Update profile error"} open={isModalOpen} onCancel={handleCancel}>
            <div className={styles.modalCard}> {modalContent}</div>
        </Modal>
    </div>
};

export default Profile;

const UserInformationCard: React.FC<{ goTo: any, user?: UserProfile }> = ({ goTo, user }) => <div className={styles.userInformationCard}>
    <ProfileCardBackground>
        <div className={styles.userName}>{user?.firstName + ' ' + user?.lastName}</div>
        <div className={styles.joinDate}>Member since: June 2022</div>
        <div className={styles.age}>{user?.age} years old  </div>
        <div className={styles.gender}>{user?.gender}</div>
        <div className={styles.username}>Username:{user?.email}</div>
        <a
            onClick={() => goTo(1)}
            className={styles.editButton}>
            <MdModeEditOutline className={styles.editIcon} />
        </a>
    </ProfileCardBackground>
</div>;

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