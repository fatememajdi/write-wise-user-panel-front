/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { lazy } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import Image from "next/image";

//------------------------------------------------styles
import styles from './features.module.css';

//------------------------------------------------components
const LandingHeader = React.lazy(() => import("@/components/landingHeader/landingHeader"));

const Footer = lazy(() => import("@/components/footer/footer"));
import { StopLoader } from "@/components/Untitled";

const featuresItems = [
    {
        icon: 'stars.svg',
        title: 'AI-Powered Essay Rating and Analysis',
        description: 'WriteWiseAI\'s AI-powered essay rating and analysis goes beyond basic grammar checks to emulate the nuanced evaluation of a human examiner. Leveraging the latest in AI technology, it scrutinizes essays for structural coherence, argument strength, vocabulary range, and task response. The system simulates an IELTS examiner\'s approach, providing a comprehensive assessment that prepares users for the actual exam conditions.'
    },
    {
        icon: 'user.svg',
        title: 'Human-Equivalent Precision in Rating',
        description: 'WriteWiseAI offers a cutting-edge rating system meticulously calibrated to match the precision of a human rater, boasting an impressively minimal inter-rater difference of just 0.5. This exceptional accuracy is achieved by adhering to the most recent IELTS Organization assessment criteria, ensuring that users receive evaluations that are as close as possible to the actual IELTS scoring standards. With WriteWiseAI, students can trust in a rating system that mirrors the discernment and high standards of experienced IELTS examiners.'
    },
    {
        icon: 'check.svg',
        title: 'Personalized Feedback, Insights and Recommendations',
        description: 'Each user\'s writing is unique, and WriteWiseAI recognizes this by providing personalized feedback. It offers detailed insights into individual writing patterns, pinpointing strengths and areas for improvement. The platform generates customized recommendations to guide learners on how to refine their writing skills, enhance their style, and avoid common pitfalls, effectively making each learning experience as unique as the user\'s own writing.'
    },
    {
        icon: 'rise.svg',
        title: 'In-Depth Smart Progress Tracking',
        description: 'With WriteWiseAI, progress is quantifiable and insights are actionable. The platform\'s in-depth smart progress tracking feature allows users to see their improvements over time across various parameters such as lexical resource, grammatical range, and coherence.This intelligent tracking system helps learners identify trends in their learning, adjust their study focus, and maintain a clear path towards achieving their IELTS score goals.'
    },
    {
        icon: 'lock.svg',
        title: 'Password less Signup/Login',
        description: 'WriteWiseAI streamlines the start of your IELTS writing journey with a passwordless signup/login feature. This modern approach simplifies access, allowing users to set up their personal accounts quickly and securely without the hassle of remembering another password. Begin your IELTS writing preparation with ease and focus on what truly matters—your learning.'
    },
    {
        icon: 'money.svg',
        title: 'Affordable Pricing',
        description: 'WriteWiseAI\'s affordable pricing model is designed with the user\'s financial ease in mind. The pay-as-you-go system ensures you only invest in what you need, NO MONTHLY COMMITMENT needed! This flexible approach to pricing democratizes IELTS preparation, making it accessible to a broader range of learners.'
    },
    {
        icon: 'quality.svg',
        title: 'Intuitive User Experience',
        description: 'The intuitive user experience at WriteWiseAI is at the heart of its design philosophy. The platform\'s interface is crafted to be user- centric, ensuring a seamless and straightforward experience throughout your IELTS preparation journey.Engage with your learning material effortlessly, with all the tools you need arranged logically and accessibly.'
    }
];

const Features: React.FC = () => {
    const [logedIn, changeLogedIn] = React.useState<boolean>(false);
    const [selectedItem, changeSelectedItem] = React.useState<number>(-1);

    React.useEffect(() => {
        const item = localStorage.getItem('user');
        if (item)
            changeLogedIn(true);
        else
            changeLogedIn(false);
        StopLoader();
    }, []);

    return <div className={'col-12 ' + styles.featuresContainer}>
        <LandingHeader logedIn={logedIn} shadow />
        <div className={'col-12 ' + styles.mainContainer}>
            <AnimatePresence>
                <div className={styles.leftCard}>
                    {
                        featuresItems.map((item, index) =>
                            <motion.div key={index} onClick={() => changeSelectedItem(index)}
                                animate={selectedItem === index ?
                                    { color: '#2E4057', opacity: 1, marginLeft: 81, fontSize: 48 }
                                    : { color: '#252525', opacity: 0.5, marginLeft: 0, fontSize: 32 }}
                                transition={{ type: "spring", duration: 1 }}
                                className={selectedItem === index ? styles.activeTitleCard + ' ' + styles.titleCard : styles.titleCard}>
                                <Image
                                    className={selectedItem === index ? styles.activeTitleIcon : styles.titleIcon}
                                    src={"/features/" + item.icon}
                                    alt="Logo"
                                    width="0"
                                    height="0"
                                    sizes="100vw"
                                    loading="eager"
                                    priority
                                />
                                {item.title}
                            </motion.div>)
                    }
                </div>
                <div className={styles.rightCard}>
                    {selectedItem !== -1 && featuresItems[selectedItem].description}
                </div>
            </AnimatePresence>
        </div>
        <Footer />
    </div>
};

export default Features;
