/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import Image from "next/image";

//------------------------------------------------styles
import styles from './featuresDetails.module.css';
import Footer from '@/components/footer/footer';

const featuresItems = [
    {
        icon: '/user.svg',
        title: 'Personalized Feedback and Recommendations'
    },
    {
        icon: '/file.svg',
        title: 'AI-Powered Topic Generator'
    },
    {
        icon: '/step.svg',
        title: 'AI-Powered Step-by-Step Writing Tutor'
    },
    {
        icon: '',
        title: 'Affordable Pricing and Token System'
    },
    {
        icon: '/regularRise.svg',
        title: 'Progress Tracking'
    }
];

const FeaturesDetails: React.FC = () => <div className={'col-12 ' + styles.featuresDetailsContainer}>
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
    </div>
    <Footer />
</div>;

export default FeaturesDetails;

const FeaturesItemCard: React.FC<{ item: { icon: string, title: string } }> = ({ item }) => <div className={'col-lg-6 ' + styles.itemCard}>
    <div className={styles.itemCardContent}>
        <Image
            src={item.icon}
            alt="Icon"
            width={58.33}
            height={46.67}
            priority
        />
        <div className={styles.itemTitle}>{item.title}</div>
    </div>
</div>;