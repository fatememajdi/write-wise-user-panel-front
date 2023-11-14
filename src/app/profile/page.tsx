/* eslint-disable react/jsx-key */
'use client';
import React from "react";
import Image from "next/image";
import client from '@/config/applloAuthorizedClient';
import uploadFileClient from "@/config/appolloUploadFileClient";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { Modal } from 'antd';
import { useSession } from "next-auth/react";
import { signOut } from 'next-auth/react';

//-------------------------------------styles
import styles from './profile.module.css';

//-------------------------------------icons
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Camera, Chat, Chat2 } from '../../../public/icons';
import { RxExit } from 'react-icons/rx';

//-------------------------------------components
import { GET_PROFILE, UPDATE_USER, UPLOAD_PROFILE_FILE } from "@/config/graphql";
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
import { StopLoader } from "@/components/Untitled";
const Loading = dynamic(() => import("@/components/loading/loading"), { ssr: false });
const DialogComponent = dynamic(() => import("@/components/dialog/dialog"), { ssr: false });
const UserInformationCard = dynamic(() => import("./userInformationCard"));
const EditUserCard = dynamic(() => import("./editUserCard"));

//-------------------------------------types
import { UserProfile } from "../../../types/profile";

const Page: React.FC = () => {

    const [open, setOpen] = React.useState<boolean>(false);
    const [profile, setprofile] = React.useState<UserProfile>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [modalContent, changeModalContent] = React.useState<string>('Tr again!');
    const { step, goTo, currentStepIndex } = useMultiStepForm(
        [<UserInformationCard user={profile} goTo={GoTo} />, <EditUserCard goTo={GoTo} UpdateProfile={UpdateProfile} user={profile} />]);
    const router = useRouter();
    const [inputImage, setInputImage] = React.useState<File>();
    const { status } = useSession({
        required: true, onUnauthenticated() {
            if (localStorage.getItem('user'))
                return
            else
                router.push('/signIn');
        },
    });

    const onChangePic = async (e: any) => {
        await setInputImage(e.target.files[0]);
    }
    function GoTo(step: number) { goTo(step) };

    async function GetProfile() {
        await client.query({
            query: GET_PROFILE,
            fetchPolicy: "no-cache"
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

    function handleClose() {
        setOpen(false);
    };

    async function LogOut() {
        setLoading(true);
        localStorage.clear();
        if (status === 'authenticated')
            signOut();
    }

    async function handleDelete() {
        setOpen(false);
        await LogOut();
    }

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
            {/* <a
                onClick={() => {
                    if (currentStepIndex > 0) goTo(currentStepIndex - 1);
                    else router.back();
                }}
                className={styles.backcard}>
                <MdOutlineArrowBackIosNew /> Back
            </a> */}

            <button
                onClick={() => setOpen(true)}
                className={styles.logOutButton}
                aria-label="logout button"
            >
                <RxExit className={styles.exitIcon} /> Log out
            </button>

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

        <DialogComponent open={open} handleClose={handleClose} handleDelete={handleDelete}
            title="Log out" dialog="Are you sure you want to log out?" deleteButton='Log out' />

        <Modal
            footer={null}
            title={"Update profile error"} open={isModalOpen} onCancel={handleCancel}>
            <div className={styles.modalCard}> {modalContent}</div>
        </Modal>
    </div>
};

export default Page;
