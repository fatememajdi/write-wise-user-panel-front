import React from "react";
import { Formik } from 'formik';
import dynamic from "next/dynamic";
import { useMutation } from "@apollo/client";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

//---------------------------------------------styles
import styles from './profileCard.module.css';

//---------------------------------------------types
import { Country, UserProfile } from "../../../types/profile";

//---------------------------------------------icons
import { FaUser } from 'react-icons/fa';
import { MdCake, MdFace, MdAlternateEmail } from 'react-icons/md';
import { IoIosArrowRoundBack } from 'react-icons/io';

//---------------------------------------------components
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';
const Input = dynamic(() => import("@/components/input/input"));
const Loading = dynamic(() => import("../loading/loading"));
import { CapitalStart } from "../Untitled";
import { DELETE_ACCOUNT, UPDATE_USER } from "@/config/graphql";
import { GetCountries } from "@/hooks/fetchData";
const InfiniteScrollSelect = dynamic(() => import("@/components/infiniteScrollSelect/infiniteScrollSelect"));
import { SelectCurrency } from "@/hooks/actions";
const DialogComponent = dynamic(() => import("../../components/dialog/dialog"), { ssr: false });
import { TiArrowSortedDown } from "react-icons/ti";

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
    const [open, setOpen] = React.useState<boolean>(false);
    const [deleteAccount, { loading }] = useMutation(DELETE_ACCOUNT);


    const router = useRouter();
    function handleClose() {
        setOpen(false);
    };

    async function handleDeleteAccount() {
        deleteAccount();
        localStorage.clear();
        localStorage.setItem('cookies', 'true');
        router.replace('/signIn');
    };

    return <table className={styles.profileCard}>
        {
            loading ?
                <Loading style={{ minHeight: 0 }} />
                :
                <>
                    <tr><span><FaUser className={styles.profileItemsIcon} /> Name</span>{profile.firstName === '' && profile.lastName === '' ? 'Please enter your name'
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
                    <tr className={styles.emailText}><span><MdAlternateEmail className={styles.profileItemsIcon} />Email</span>{profile.email}</tr>
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
                            onClick={() => setOpen(true)}
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
                </>
        }

        <DialogComponent open={open} handleClose={handleClose} handleDelete={handleDeleteAccount}
            title="Delete Account" dialog="Are you sure you want to delete your account?" deleteButton='Delete Account' />
    </table>
};

const EditProfile: React.FC<{ profile: UserProfile, back: any, setProfile: any }> = ({ back, profile, setProfile }) => {

    const [updateProfile] = useMutation(UPDATE_USER);
    const [countries, setCountries] = React.useState<Country[]>([]);
    const [selectedItem, setSelectedItem] = React.useState<Country>();
    const [moreCountries, setMoreCountries] = React.useState<boolean>(true);
    const [loading, setLoading] = React.useState<boolean>(false);

    async function UpdateUser(name: string, age: string, gender: string) {
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
            back();
            toast.success('Profile updated');
        }).catch((err) => {
            toast.error(err.message);
        });
        setLoading(false);
    };

    async function UpdateUserProfile(name: string, age: string, gender: string) {
        setLoading(true);
        if (selectedItem) {
            if (await SelectCurrency(selectedItem.id)) {
                UpdateUser(name, age, gender);
            } else {
                setLoading(false);
            }
        } else {
            UpdateUser(name, age, gender);
        }
    };

    async function searchCountry(text: string) {
        if (text.length > 1) {
            GetCountriesList(text);
        }
        else if (text.length === 0) {
            await setCountries([]);
            setMoreCountries(true);
            GetCountriesList('');
        }
    };

    async function GetCountriesList(Filter?: string) {
        setCountries(await GetCountries(Filter ? Filter : ''));
        setMoreCountries(false);
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
                            <tr>
                                <span><MdCake className={styles.profileItemsIcon} />Age</span>
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
                                <GenederSelect value={values.gender} handleSelect={(value: string) => { setFieldValue('gender', value) }} />
                            </tr>

                            <tr>
                                <span>
                                    <Image
                                        className={styles.locationIcon}
                                        src="/icons/location.svg"
                                        alt="location icon"
                                        width="0"
                                        height="0"
                                        sizes="100vw"
                                        priority
                                        loading="eager"
                                    />
                                    Country
                                </span>
                                {profile.country.commonName === '' ?
                                    <InfiniteScrollSelect title="Select country" data={countries} moreData={moreCountries}
                                        GetData={GetCountriesList} changeFilter={searchCountry} selectItem={setSelectedItem} lightTheme />
                                    :
                                    profile.country.commonName

                                }
                            </tr>

                            <tr className={styles.emailText}><span><MdAlternateEmail className={styles.profileItemsIcon} />Email</span>{profile.email}</tr>

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
                                    <IoIosArrowRoundBack className={styles.arrowLeftIcon} />  Back
                                </button>
                            </tr>

                        </table>
                }
            </form >
        )}
    </Formik >
};

const GenederSelect: React.FC<{ value: string, handleSelect: any }> = ({ value, handleSelect }) => {
    const [showMenu, setShowMenu] = React.useState<boolean>(false);
    const [showList, setShowList] = React.useState<boolean>(false);

    const Genders = [
        { label: 'Male', value: 'male' },
        { label: 'Female', value: 'female' },
        { label: 'Other', value: 'other' },
    ];

    return <AnimatePresence>
        <div className={styles.genderSelect}>
            <span style={value === '' ? { opacity: 0.5 } : { opacity: 1 }}>{value === '' ? 'Select gender' : Genders.find(item => item.value === value).label}</span>
            <motion.div
                animate={showMenu ? { transform: 'rotate(180deg)' } : {}}
                transition={{ type: "spring", duration: 0.5 }}
            >
                <TiArrowSortedDown className={styles.arrowIcon} onClick={() => {
                    setShowMenu(!showMenu);
                    if (!showList) {
                        setShowList(true);
                    }
                }} />
            </motion.div>

            <motion.div
                style={{ display: 'none' }}
                animate={{ height: showMenu ? 'fit-content' : 0, display: showMenu ? 'block' : 'none' }}
                transition={{ type: "spring", duration: 0.5 }}
                className={styles.genderSelectItemsCard}
            >

                {
                    Genders.map((item, index) => <div onClick={() => { if (showMenu) { handleSelect(item.value); setShowMenu(!showMenu); } }} className={styles.menuItem} key={index}>{item.label}</div>)
                }

            </motion.div>
        </div>
    </AnimatePresence>
};