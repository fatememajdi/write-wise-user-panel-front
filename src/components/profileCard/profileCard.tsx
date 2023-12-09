import React from "react";
import Image from "next/image";

//---------------------------------------------styles
import styles from './profileCard.module.css';

//---------------------------------------------types
import { UserProfile } from "../../../types/profile";

//---------------------------------------------icons
import { FaUser } from 'react-icons/fa';
import { MdCake, MdFace, MdAlternateEmail } from 'react-icons/md';
import { IoIosArrowRoundBack } from 'react-icons/io';

//---------------------------------------------components
import { CapitalStart } from "../Untitled";

type _props = {
    profile: UserProfile,
    closeProfile: any
};


const ProfileCard: React.FC<_props> = ({ profile, closeProfile }) => {
    return <table className={styles.profileCard}>
        <tr><span><FaUser className={styles.profileItemsIcon} /> Name</span>{CapitalStart(profile.firstName) + ' ' + CapitalStart(profile.lastName)}</tr>
        <tr><span><MdCake className={styles.profileItemsIcon} />Age</span>{profile.age + ' years old'}</tr>
        <tr><span><MdFace className={styles.profileItemsIcon} />Gender</span>{CapitalStart(profile.gender)}</tr>
        <tr><span> <Image
            className={styles.locationIcon}
            src="/icons/location.svg"
            alt="location icon"
            width="0"
            height="0"
            sizes="100vw"
            priority
            loading="eager"
        /> Country</span>{profile.country.commonName}</tr>
        <tr><span><MdAlternateEmail className={styles.profileItemsIcon} />Email</span>{profile.email}</tr>
        <tr>
            <button
                className={styles.editButton}
                aria-label="edite profile button">
                Edit
            </button>

            <button
                className={styles.deleteAcButton}
                aria-label="delete account button">
                Delete Account
            </button>

            <button
                onClick={() => closeProfile(false)}
                className={styles.okButton}
                aria-label="close profile modal button">
                <IoIosArrowRoundBack className={styles.arrowLeftIcon} />  Ok
            </button>
        </tr>
    </table>
};

export default ProfileCard;