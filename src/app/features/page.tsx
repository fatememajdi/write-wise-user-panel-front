/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { lazy, useState, useRef, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { motion, useSpring, AnimatePresence } from "framer-motion";

//------------------------------------------------styles
import styles from './features.module.css';

//------------------------------------------------components
const FeaturesDetailsBackground = React.lazy(
    () => import("@/components/backgrounds/featuresBackground/featuresBackground").then(module => ({ default: module.FeaturesDetailsBackground }))
);
const Footer = lazy(() => import("@/components/footer/footer"));
import { StartLoader, StopLoader } from "@/components/Untitled";

//------------------------------------------------icons
import { User, File, Step, Money, RegularRise } from '../../../public';

const featuresItems = [
    {
        icon: User,
        title: 'AI-Powered Essay Rating',
        description: ' text 1 Kickstart your IELTS success by signing up for a WriteWiseAI account. Once registered, choose your IELTS category - General or Academic - ensuring feedback tailored to specific IELTS criteria.'
    },
    {
        icon: File,
        title: 'Personalized Feedback and Recommendations',
        description: 'Enhance your IELTS writing preparation with in-depth feedback tailored to your essays. Our system identifies areas for growth, providing insights and actionable steps to refine your English writing skills.'
    },
    {
        icon: Step,
        title: 'AI-Driven Topic Generator',
        description: 'Stay perpetually inspired with our topic generator, designed to offer a plethora of IELTS-relevant prompts, ensuring you are always ready for any exam topic.'
    },
    {
        icon: Money,
        title: 'Step-by-Step IELTS Writing Tutoring',
        description: 'Transform your approach to IELTS essay writing with our WriteWiseAI Tutor. Receive real-time guidance and feedback as you craft your essay, focusing on structure, vocabulary, coherence, and argument depth, closely resembling the guidance of a personal tutor.'
    },
    {
        icon: RegularRise,
        title: 'In-Depth Progress Tracking',
        description: 'Visualize your IELTS learning growth. With our analytics dashboard, monitor improvements across essays, ensuring thorough preparation for the IELTS writing exam.'
    },
    {
        icon: RegularRise,
        title: 'Flexible Feedback Options',
        description: 'Tailor your feedback experience, from detailed analyses to targeted recommendations. Our token system ensures this premium feature is both efficient and cost-effective.'
    },
    {
        icon: RegularRise,
        title: 'Intuitive User Experience',
        description: 'Navigate with ease. Our user-centric design, from the editor to the analytics dashboard, guarantees a seamless IELTS preparation experience.'
    },
    {
        icon: RegularRise,
        title: 'Affordable Pricing and Token System',
        description: 'Navigate with ease. Our user-centric design, from the editor to the analytics dashboard, guarantees a seamless IELTS preparation experience.'
    },
];

const Features: React.FC = () => {
    const router = useRouter();

    React.useEffect(() => {
        StopLoader();
        router.refresh();
    }, []);

    return <FeaturesDetailsBackground>
        <div className={'col-12 ' + styles.featuresDetailsContent}>
            <div className={'col-12 ' + styles.description}>
                Embrace the power of WriteWiseAI and unlock your full potential in IELTS writing. With our innovative<br />
                features and benefits, you'll be well-equipped to achieve your desired IELTS score and open the door to<br />
                new opportunities:
            </div>
            <div className={'col-12 ' + styles.featuresItemsContainer}>
                <AnimatePresence>
                    {
                        featuresItems.map((item, index) => <FeaturesItemCard item={item} key={index} />)
                    }
                </AnimatePresence>
            </div>
            <div className={'col-12 ' + styles.SignUpTitle}>
                Sign up today and start your journey to IELTS writing mastery
            </div>
            <button
                onClick={() => {
                    router.push('/signIn');
                    StartLoader();
                }}
                className={styles.signUpButton}>
                Sign up
            </button>
        </div>
        <Footer />
    </FeaturesDetailsBackground>
};

export default Features;


const FeaturesItemCard: React.FC<{ item: { icon: any, title: string, description: string } }> = ({ item }) => {

    const [flipping, setFlipping] = React.useState<number>(0);

    function changeCardState() {
        if (flipping === 2) {
            setFlipping(1);
        } else {
            setFlipping(flipping + 1);
        }

    }



    return <div className={styles.itemCardFront}>
        <div
            // onClick={() => changeCardState()}
            className={flipping === 1 ? styles.rotateCard + ' ' + styles.card
                : flipping === 2 ?styles.rotateCard2 + ' ' +  styles.card : styles.card}>

            <div className={styles.cardFront}>
                <item.icon color='#FFF' />
                <span>{item.title}</span>
            </div>

            <div className={styles.cardBack}>{item.description}</div>

        </div>
    </div>
};
