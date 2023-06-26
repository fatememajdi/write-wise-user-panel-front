'use client';
import React from "react";
import Image from "next/image";

//-------------------------------------styles
import styles from './profile.module.css';

//-------------------------------------icons
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { Camera } from '../../../public';

const Profile: React.FC = () => {

    const [profile, setprofile] = React.useState<boolean>(true);

    return <div className={'col-12 ' + styles.profileContainer}>
        <div className={'col-12 ' + styles.profileHeader}>
            <Image
                className={styles.logo}
                src="/logo.svg"
                alt="Logo"
                width={133}
                height={15}
                priority
            />
            <div className={styles.backcard}>
                <MdOutlineArrowBackIosNew /> Back
            </div>
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
                            />
                            :
                            <Camera />
                    }
                </div>
                <div className={styles.rightDivider} />
            </div>

            <div className={styles.userInformationCard}>hi</div>

        </div>
    </div>
};

export default Profile;