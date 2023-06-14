/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from "next/image";

//------------------------------------------------styles
import styles from './features.module.css';
import Footer from '@/components/footer/footer';

//------------------------------------------------components
import { FeaturesDetailsBackground } from "@/components/featuresBackground/featuresBackground";

//------------------------------------------------icons
import { User, File, Step, Money, RegularRise } from '../../../public';

const featuresItems = [
    {
        icon: User,
        title: 'Personalized Feedback and Recommendations'
    },
    {
        icon: File,
        title: 'AI-Powered Topic Generator'
    },
    {
        icon: Step,
        title: 'AI-Powered Step-by-Step Writing Tutor'
    },
    {
        icon: Money,
        title: 'Affordable Pricing and Token System'
    },
    {
        icon: RegularRise,
        title: 'Progress Tracking'
    }
];

const Features: React.FC = () => <FeaturesDetailsBackground>
    <div className={'col-12 ' + styles.featuresDetailsContent}>
        <div className={'col-12 ' + styles.description}>
            Embrace the power of WriteWiseAI and unlock your full potential in IELTS writing. With our innovative features and benefits,
            you'll be well-equipped to achieve your desired IELTS score and open the door to new opportunities:
        </div>
        <div className={'col-12 ' + styles.featuresItemsContainer}>
            {
                featuresItems.map((item, index) => <FeaturesItemCard item={item} key={index} />)
            }

            <div className={'col-lg-6 ' + styles.lastItemCard}>
                <div className={styles.lastItemCardContent}>
                    Receive objective and accurate essay ratings based on the official
                    IELTS criteria. Our advanced AI technology analyzes your essays to
                    give you a clear understanding of your current writing proficiency.
                </div>
            </div>
        </div>
        <div className={'col-12 ' + styles.SignUpTitle}>
            Sign up today and start your journey to IELTS writing mastery
        </div>
        <button className={styles.signUpButton}>
            Sign up
        </button>
    </div>
    <Footer />
</FeaturesDetailsBackground>;

export default Features;

const FeaturesItemCard: React.FC<{ item: { icon: any, title: string } }> = ({ item }) => <div className={'col-lg-6 ' + styles.itemCard}>
    <div className={styles.itemCardContent}>
        <item.icon />
        <div className={styles.itemTitle}>{item.title}</div>
    </div>
</div>;