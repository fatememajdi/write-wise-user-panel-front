'use client';
import React from "react";
import Image from "next/image";
import { useRouter } from 'next/navigation';

//-------------------------------------------styles
import styles from './features.module.css';

//-------------------------------------------components
import FeaturesBackground from "@/components/featuresBackground/featuresBackground";
import LandingSecondHeader from "@/components/landingSecondHeader/landingSecondHeader";

const Features: React.FC = () => {
    const router = useRouter();

    return (
        <FeaturesBackground>
            <LandingSecondHeader />
            <div className={styles.featuresDescription}>
                Discover the advantages of using WriteWiseAI, a revolutionary platform designed to help you conquer IELTS writing challenges. Our state-of-the-art features and benefits provide the tools and guidance necessary to elevate your essay writing skills and achieve your desired IELTS score. Here's what you can expect when using WriteWiseAI
            </div>
            <div className={'col-lg-12 ' + styles.featuresItemsContainer}>
                <FeaturesItemCard title="AI-Powered Essay Rating"
                    icon="/rate.svg"
                    description="Receive objective and accurate essay ratings based on the official IELTS criteria. Our advanced AI technology analyzes your essays to give you a clear understanding of your current writing proficiency." />
                <FeaturesItemCard title="Progress Tracking"
                    icon="/rise.svg"
                    description="Monitor your IELTS writing improvement over time with our progress tracking feature. Review your essay history, ratings, and feedback to see your development and stay motivated on your journey to success." />
            </div>
            <button onClick={() => router.push('/featuresDetails')} className={styles.featuresButton}>
                Read more
            </button>
        </FeaturesBackground>)
};

export default Features;

const FeaturesItemCard: React.FC<{ title: string, description: string, icon: string }> = ({ title, description, icon }) => <div className={'col-lg-5 ' + styles.featuresItemCard}>
    <Image
        src={icon}
        alt="Icon"
        width={58.33}
        height={35}
        priority
    />
    <div className={styles.featuresItemTitle}>
        {title}
    </div>
    <div className={styles.featuresItemDescription}>{description}</div>
</div>;