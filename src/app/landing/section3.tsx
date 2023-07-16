/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { useRouter } from 'next/navigation';

//-------------------------------------------styles
import styles from './landingSection3.module.css';

//-------------------------------------------components
import { FeaturesBackground } from "@/components/backgrounds/featuresBackground/featuresBackground";

//-------------------------------------------icons
import { Rate, Rise } from "../../../public";

const Section3: React.FC = () => {
    const router = useRouter();

    return (
        <FeaturesBackground>

            <div className={styles.featuresDescription}>
                Discover the advantages of using WriteWiseAI, a revolutionary platform designed to help you conquer IELTS writing challenges. Our state-of-the-art features and benefits provide the tools and guidance necessary to elevate your essay writing skills and achieve your desired IELTS score. Here's what you can expect when using WriteWiseAI
            </div>
            <div className={'col-lg-12 ' + styles.featuresItemsContainer}>
                <FeaturesItemCard title="AI-Powered Essay Rating"
                    icon={<Rate />}
                    description="Receive objective and accurate essay ratings based on the official IELTS criteria. Our advanced AI technology analyzes your essays to give you a clear understanding of your current writing proficiency." />
                <FeaturesItemCard title="Progress Tracking"
                    icon={<Rise />}
                    description="Monitor your IELTS writing improvement over time with our progress tracking feature. Review your essay history, ratings, and feedback to see your development and stay motivated on your journey to success." />
            </div>
            <button
                aria-label="read more button"
                onClick={() => router.push('/features')}
                className={styles.featuresButton}>
                Read more
            </button>

        </FeaturesBackground>
    )
};

export default Section3;

const FeaturesItemCard: React.FC<{ title: string, description: string, icon: any }> = ({ title, description, icon }) => <div className={'col-lg-5 ' + styles.featuresItemCard}>
    {icon}
    <div className={styles.featuresItemTitle}>
        {title}
    </div>
    <div className={styles.featuresItemDescription}>{description}</div>
</div>;