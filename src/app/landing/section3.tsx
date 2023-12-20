/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';

//-------------------------------------------styles
import styles from './landingSection3.module.css';
import '../../styles/global.css';

//-------------------------------------------components
import { StartLoader } from "@/components/Untitled";

//-------------------------------------------icons
import { Stars, Rise, User, UserMobile, StarsMobile, RiseMobile } from "../../../public/icons";
import { IoIosArrowForward } from 'react-icons/io';

const Section3: React.FC = () => {
    const router = useRouter();
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    return (
        <section className={'col-12 ' + styles.featuresBackground} id='features'>
            <div className={'col-12 ' + styles.section3Container}>

                <div className={'col-lg-7 col-md-6 col-12 ' + styles.leftContainer}>
                    <h2 className={styles.leftTitle}>
                        Unlock IELTS Writing Mastery with <span>WriteWiseAI's</span> Pioneering Features
                    </h2>
                    <h6 className={styles.leftDescription}>
                        Experience a seamless fusion of advanced technology and intuitive design, tailored to elevate every aspect of your IELTS preparation journey, and ensure top-tier IELTS writing results.
                    </h6>

                    <button
                        aria-label="read more button"
                        onClick={() => {
                            router.push('/features');
                            StartLoader();
                        }}
                        className={styles.featuresButton}>
                        Read More  <IoIosArrowForward style={{ marginTop: 5 }} />
                    </button>

                </div>

                <div className={'col-lg-5 col-md-6 col-12 ' + styles.rightContainer}>
                    <FeaturesItemCard icon={isMobile ? <StarsMobile /> : <Stars />} title="AI-Powered Essay Rating" />
                    <FeaturesItemCard icon={isMobile ? <UserMobile /> : <User />} title="Personalized Feedback and Recommendations" />
                    <FeaturesItemCard icon={isMobile ? <RiseMobile /> : <Rise />} title="In-Depth Progress Tracking" />
                </div>

                <button
                    aria-label="read more button"
                    onClick={() => {
                        router.push('/features');
                        StartLoader();
                    }}
                    className={styles.mobileFeaturesButton}>
                    Read More  <IoIosArrowForward style={{ marginTop: 5 }} />
                </button>
            </div>
        </section>
    )
};

export default Section3;

const FeaturesItemCard: React.FC<{ title: string, icon: any, description?: string }> = ({ title, description, icon }) =>
    <div className={styles.featuresItemCard}>
        <div className={styles.featuresItemIcon}>
            {icon}
        </div>
        <h5 className={styles.featuresItemTitle}>
            {title}
        </h5>
        <div className={styles.featuresItemDescription}>{description && description}</div>
    </div>;