import React from "react";
import { Switch } from 'antd';
import { Formik } from 'formik';
import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
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
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
const Input = dynamic(() => import("@/components/input/input"));
import { CapitalStart } from "../Untitled";
import { UPDATE_USER } from "@/config/graphql";
import Loading from "../loading/loading";

type _props = {
    profile: UserProfile,
    closeProfile: any,
    setProfile: any
};

const ProfileCard: React.FC<_props> = ({ profile, closeProfile, setProfile }) => {
    const { step, next, back } = useMultiStepForm([
        <ProfileData key={0} profile={profile} closeProfile={closeProfile} next={Next} />,
        <EditProfile key={1} profile={profile} back={Back} setProfile={setProfile} />
    ]);
    function Next() { next() };
    function Back() { back() };

    return <>{step}</>
};

export default ProfileCard;

const ProfileData: React.FC<{ profile: UserProfile, closeProfile: any, next: any }> = ({ profile, closeProfile, next }) => {
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
                type="button"
                onClick={() => next()}
                className={styles.editButton}
                aria-label="edit profile button">
                Edit
            </button>

            <button
                type="button"
                className={styles.deleteAcButton}
                aria-label="delete account button">
                Delete Account
            </button>

            <button
                type="button"
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

const EditProfile: React.FC<{ profile: UserProfile, back: any, setProfile: any }> = ({ back, profile, setProfile }) => {

    const [updateProfile, { loading }] = useMutation(UPDATE_USER);

    async function UpdateUserProfile(name: string, age: string, gender: string) {

        await updateProfile({
            variables: {
                firstName: name,
                age: age !== '' ? parseInt(age) : profile.age,
                gender: gender,
                lastName: ''
            },
            fetchPolicy: 'no-cache'
        }).then((res) => {
            setProfile(res.data.updateUserProfile);
            toast.success('Profile updated')
        }).catch((err) => {
            toast.error(err.message);
        })

    };

    return <Formik
        initialValues={{
            name: profile.firstName !== '' ? profile.firstName + ' ' + profile.lastName : '',
            age: profile.age !== -1 ? profile.age.toString() : '',
            gender: profile.gender,
            country: profile.country.commonName,
        }}
        enableReinitialize
        onSubmit={async (values, { resetForm }) => {
            UpdateUserProfile(values.name, values.age, values.gender);
            // resetForm();
        }}>{({
            values,
            errors,
            touched,
            handleSubmit,
            setFieldValue,
            handleChange
        }) => (
            <form
                className={styles.profileCard}
                onSubmit={handleSubmit}>
                {
                    loading ? <Loading style={{ minHeight: 0 }} />
                        : <table>
                            <tr><span><FaUser className={styles.profileItemsIcon} /> Name</span>
                                <Input
                                    className={styles.profileFieldinput}
                                    onChange={handleChange}
                                    input
                                    placeHolder="Name"
                                    inputtype='name'
                                    input_name='name'
                                    input_value={values.name}
                                    input_error={errors.name && touched.name && errors.name}
                                />
                            </tr>
                            <tr><span><MdCake className={styles.profileItemsIcon} />Age</span>
                                <Input
                                    className={styles.profileFieldinput}
                                    onChange={handleChange}
                                    input
                                    placeHolder="Age"
                                    inputtype='age'
                                    input_name='age'
                                    input_value={values.age}
                                    input_error={errors.age && touched.age && errors.age}
                                />
                            </tr>
                            <tr><span><MdFace className={styles.profileItemsIcon} />Gender</span>
                                <Input
                                    className={styles.profileFieldinput}
                                    onChange={handleChange}
                                    input
                                    placeHolder="Gender"
                                    inputtype='gender'
                                    input_name='gender'
                                    input_value={values.gender}
                                    input_error={errors.gender && touched.gender && errors.gender}
                                />
                            </tr>
                            <tr><span> <Image
                                className={styles.locationIcon}
                                src="/icons/location.svg"
                                alt="location icon"
                                width="0"
                                height="0"
                                sizes="100vw"
                                priority
                                loading="eager"
                            /> Country</span>
                                {profile.country.commonName === '' ? 'Please select your country' : profile.country.commonName}
                                {/* <Input
                            className={styles.profileFieldinput}
                            onChange={handleChange}
                            input
                            placeHolder="Country"
                            inputtype='country'
                            input_name='country'
                            input_value={values.country}
                            input_error={errors.country && touched.country && errors.country}
                        /> */}
                            </tr>
                            <tr><span><MdAlternateEmail className={styles.profileItemsIcon} />Email</span>{profile.email}</tr>

                            <tr>

                                <button
                                    type="submit"
                                    className={styles.saveButton}
                                    aria-label="edit profile submit button">
                                    Save
                                </button>

                                <button
                                    type="button"
                                    onClick={() => back()}
                                    className={styles.okButton}
                                    aria-label="close profile modal button">
                                    <IoIosArrowRoundBack className={styles.arrowLeftIcon} />  Ok
                                </button>
                            </tr>

                        </table>
                }
            </form >
        )}
    </Formik >
};