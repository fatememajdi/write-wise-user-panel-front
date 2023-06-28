'use client';
import React from 'react';
import Image from 'next/image';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';

//---------------------------------------styles
import styles from './chooseType.module.css';

//---------------------------------------icons
import { MdOutlineArrowBackIosNew } from 'react-icons/md';
import { GiHamburgerMenu } from 'react-icons/gi';

//---------------------------------------components
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';

const ChooseType: React.FC = () => {

    const { next, back, currentStepIndex, step } = useMultiStepForm([<ChooseFirstTaskType />, <ChooseSecondTaskType />])
    const router = useRouter();

    return <div className={'col-12 ' + styles.chooseTypeContainer}>
        <div className={'col-12 ' + styles.header}>
            <a
                onClick={() => {
                    if (currentStepIndex > 0) back();
                    else router.back();
                }}
                className={styles.backcard}>
                <MdOutlineArrowBackIosNew /> {currentStepIndex > 0 ? 'Back' : 'Dashboard'}
            </a>
            <Image
                className={styles.logo}
                src="/logo.svg"
                alt="Logo"
                width={133}
                height={15}
                priority
            />
            <GiHamburgerMenu className={styles.menuIcon} />
        </div>
        {step}
    </div>
};

export default ChooseType;

export function ChooseFirstTaskType() {
    return <div className={'col-12 ' + styles.stepcontainer}>
        <Image
            className={styles.leftBackground}
            src="/writingType/left.svg"
            alt="background"
            width={427.75}
            height={357}
            priority
        />
        <Image
            className={styles.rightBackground}
            src="/writingType/left.svg"
            alt="background"
            width={427.75}
            height={357}
            priority
        />
    </div>
}

export function ChooseSecondTaskType() {
    return <div></div>
}

