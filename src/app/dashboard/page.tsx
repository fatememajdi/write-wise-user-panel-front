/* eslint-disable react/jsx-key */
'use client';
import React from "react";
import Image from "next/image";

//-----------------------------------------styles
import styles from './dashboard.module.css';

//-----------------------------------------components
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';

//-----------------------------------------icons
import { AiOutlinePlus } from 'react-icons/ai';
import { IoIosArrowBack } from 'react-icons/io';

const Dashboard: React.FC = () => {
    const { goTo, currentStepIndex, step } = useMultiStepForm([<GeneralTask1 />, <AcademicTask1 />, <Task2 />])

    return <div className={'col-12 ' + styles.dashboardContainer}>
        <div className={'col-lg-3 ' + styles.dashboardLeftCard}>
            <Image
                className={styles.logo}
                src="/logo3.svg"
                alt="Logo"
                width={205}
                height={15}
                priority
            />
            <div className={'col-12 ' + styles.tabsContainer}>
                <div className={'col-12 ' + styles.newEssayContainer}>
                    <button className={styles.newEssayButton}>New essay <AiOutlinePlus className={styles.plusIcon} /></button>
                    <button className={styles.arrowLeftButton}><IoIosArrowBack className={styles.arrowIcon} /></button>
                </div>
                <div></div>
            </div>
        </div>

        <div className={'col-lg-9 ' + styles.dashboardRightCard}>
            bye
        </div>
    </div>
};

export default Dashboard;

const GeneralTask1: React.FC = () => {
    return <></>
};

const AcademicTask1: React.FC = () => {
    return <></>
};


const Task2: React.FC = () => {
    return <></>
};