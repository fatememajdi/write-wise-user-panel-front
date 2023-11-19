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
import { Switch } from 'antd';
import { useMediaQuery } from 'react-responsive';
import { signOut } from 'next-auth/react';

//-------------------------------------styles
import styles from './profile.module.css';

//-------------------------------------icons
import { Camera } from '../../../public/icons';
import { IoMdArrowBack, IoMdMenu } from 'react-icons/io';
import { AiOutlineUserDelete } from 'react-icons/ai';

//-------------------------------------components
import { GET_PROFILE, UPDATE_USER, UPLOAD_PROFILE_FILE } from "@/config/graphql";
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
import { StopLoader, StartLoader } from "@/components/Untitled";
const Loading = dynamic(() => import("@/components/loading/loading"), { ssr: false });
const DialogComponent = dynamic(() => import("@/components/dialog/dialog"), { ssr: false });
const UserInformationCard = dynamic(() => import("./userInformationCard"));
const EditUserCard = dynamic(() => import("./editUserCard"));
const LandingHeader = dynamic(() => import("@/components/landingHeader/landingHeader"));
const DashboardPopOver = dynamic(() => import("@/components/dashboardPopOver/dashboardPopOver"));

//-------------------------------------types
import { UserProfile } from "../../../types/profile";

const Page: React.FC = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const [open, setOpen] = React.useState<boolean>(false);
    const [profile, setprofile] = React.useState<UserProfile>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [developer, setDeveloper] = React.useState<boolean>();
    const [modalContent, changeModalContent] = React.useState<string>('Tr again!');
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
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
        let dev = localStorage.getItem('devMode');
        if (dev)
            setDeveloper(JSON.parse(dev));
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

    const handlePopOverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

    const onChangeSwitch = (checked: boolean) => {
        setDeveloper(checked);
        localStorage.setItem('devMode', JSON.stringify(checked));
    };

    return <div className={'col-12 ' + styles.profile}>

        {
            isMobile ?
                <LandingHeader logedIn />
                :
                <div className={styles.leftNavBardCard}>
                    <Image
                        className={styles.navBarLogo}
                        src="/dashboard/W W AI.svg"
                        alt="Logo"
                        loading="eager"
                        width={19}
                        height={69}
                        priority
                    />

                    <Image
                        className={styles.NavBaresponsiveLogo}
                        src="/logo3.svg"
                        alt="Logo"
                        width={81}
                        height={17}
                        priority
                        loading="eager"
                    />

                    <button
                        onClick={() => {
                            StartLoader();
                            router.push('/ielts');
                        }
                        }
                        className={styles.backButton}
                        aria-label="back button"
                    >
                        <IoMdArrowBack />
                    </button>

                    <button
                        onClick={handlePopOverOpen}
                        className={styles.menuButton}
                        aria-label="menu button"
                    >
                        <IoMdMenu />
                    </button>
                </div>
        }
        <div className={styles.profileContainer}>
            {/* ------------------------------------------------------------------------desktop header */}
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

                <button
                    // onClick={() => setOpen(true)}
                    className={styles.logOutButton}
                    aria-label="logout button"
                >
                    <AiOutlineUserDelete className={styles.exitIcon} /> Delete account
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
                        <div style={{ marginTop: 20, padding: 10, backgroundColor: 'rgb(206, 208, 215)', borderRadius: 6, width: 'fit-content' }}>
                            {'developer '} <Switch onChange={onChangeSwitch} checked={developer} /></div>
                        {step}
                    </div>
            }

            <button
                // onClick={() => setOpen(true)}
                className={styles.responsiveLogOutButton}
                aria-label="logout button"
            >
                <AiOutlineUserDelete className={styles.exitIcon} />
                Delete account
            </button>

            <DialogComponent open={open} handleClose={handleClose} handleDelete={handleDelete}
                title="Log out" dialog="Are you sure you want to log out?" deleteButton='Log out' />

            <Modal
                footer={null}
                title={"Update profile error"} open={isModalOpen} onCancel={handleCancel}>
                <div className={styles.modalCard}> {modalContent}</div>
            </Modal>
        </div>
        <DashboardPopOver
            page='/profile' anchorEl={anchorEl}
            handlePopOverClose={handlePopOverClose} LogOut={LogOut} />
    </div>
};

export default Page;
