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

//------------------------------------------------data
import featuresItems from '../../../public/data/Features.json';

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

        setTimeout(() => {
            changeSelectedItem(0);
        }, 1500);

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
                <h4 className={styles.rightCard}>
                    {selectedItem !== -1 && featuresItems[selectedItem].description}
                </h4>
            </AnimatePresence>
        </div>
        <Footer />
    </div>
};

export default Features;
