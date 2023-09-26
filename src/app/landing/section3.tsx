/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useRouter } from 'next/navigation';

//-------------------------------------------styles
import styles from './landingSection3.module.css';

//-------------------------------------------components
import { FeaturesBackground } from "@/components/backgrounds/featuresBackground/featuresBackground";
import { StartLoader } from "@/components/Untitled";

//-------------------------------------------icons
import { File, Rate, Rise, User } from "../../../public";
import { IoIosArrowForward } from 'react-icons/io';

const Section3: React.FC = () => {
    const router = useRouter();

    return (
        <FeaturesBackground>

            <div className={'col-12 ' + styles.section3Container}>

                <div className={'col-lg-6 col-md-6 ' + styles.leftContainer}>
                    <div className={styles.leftTitle}>
                        Unlock IELTS Writing Mastery with<br />
                        WriteWiseAI's Pioneering Features
                    </div>
                    <div className={styles.leftDescription}>
                        Experience a seamless fusion of advanced<br />
                        technology and intuitive design, tailored to <br />
                        elevate every aspect of your IELTS<br />
                        preparation journey, and ensure top-tier <br />
                        IELTS writing results.
                    </div>

                    <button
                        aria-label="read more button"
                        onClick={() => {
                            router.push('/features');
                            StartLoader();
                        }}
                        className={styles.featuresButton}>
                        Dive into IELTS Writing Mastery Now!  <IoIosArrowForward />
                    </button>

                </div>

                <div className={'col-lg-6 col-md-6 ' + styles.rightContainer}>
                    <FeaturesItemCard icon={<Rate />} title="AI-Powered Essay Rating" />
                    <FeaturesItemCard icon={<File />} title="AI-Driven Topic Generator" />
                    <FeaturesItemCard icon={<User />} title="Personalized Feedback and Recommendations" />
                    <FeaturesItemCard icon={<Rise />} title="In-Depth Progress Tracking" />
                </div>

            </div>
        </FeaturesBackground>
    )
};

export default Section3;

const FeaturesItemCard: React.FC<{ title: string, icon: any, description?: string }> = ({ title, description, icon }) =>
    <div className={styles.featuresItemCard}>
        <div className={styles.featuresItemIcon}>
            {icon}
        </div>
        <div className={styles.featuresItemTitle}>
            {title}
        </div>
        <div className={styles.featuresItemDescription}>{description && description}</div>
    </div>;