/* eslint-disable react/jsx-key */
'use client';
import React from "react";
import dynamic from "next/dynamic";

//-------------------------------------styles
import styles from './profile.module.css';

//-------------------------------------icons
import { MdModeEditOutline } from 'react-icons/md';

//-------------------------------------components
import ProfileCardBackground from "@/components/backgrounds/profileCardBackground/profileCardBackground";

//-------------------------------------types
import { UserProfile } from "../../../types/profile";

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

export default UserInformationCard;