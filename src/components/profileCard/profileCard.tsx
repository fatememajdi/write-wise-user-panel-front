import React from "react";
import { Switch } from 'antd';
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
    const [developer, setDeveloper] = React.useState<boolean>(true);
    const onChangeSwitch = (checked: boolean) => {
        setDeveloper(checked);
        localStorage.setItem('devMode', JSON.stringify(checked));
    };

    React.useEffect(() => {
        let dev = localStorage.getItem('devMode');
        if (dev)
            setDeveloper(JSON.parse(dev));
        else
            setDeveloper(true);
    }, []);

    return <table className={styles.profileCard}>
        <tr><span><FaUser className={styles.profileItemsIcon} /> Name</span>{profile.firstName === '' && profile.lastName === '' ? 'Please enter your age'
            : CapitalStart(profile.firstName) + ' ' + CapitalStart(profile.lastName)}</tr>
        <tr><span><MdCake className={styles.profileItemsIcon} />Age</span>{profile.age === -1 ? 'Please enter your age' : profile.age + ' years old'}</tr>
        <tr><span><MdFace className={styles.profileItemsIcon} />Gender</span>{profile.gender === '' ? 'Please select your gender'
            : CapitalStart(profile.gender)}</tr>
        <tr><span> <Image
            className={styles.locationIcon}
            src="/icons/location.svg"
            alt="location icon"
            width="0"
            height="0"
            sizes="100vw"
            priority
            loading="eager"
        /> Country</span>{profile.country.commonName === '' ? 'Please select your country' : profile.country.commonName}</tr>
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
        <div style={{ marginTop: 20, padding: 10, backgroundColor: 'rgb(206, 208, 215)', borderRadius: 6, width: 'fit-content' }}>
            {'developer '} <Switch style={{ width: 20 }} onChange={onChangeSwitch} checked={developer} /></div>
    </table>
};

export default ProfileCard;