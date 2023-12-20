/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
'use client';
import React, { lazy } from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
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
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

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
                            <div key={index}>
                                <motion.div onClick={() => changeSelectedItem(index)}
                                    animate={selectedItem === index ?
                                        { color: '#2E4057', opacity: 1, marginLeft: isMobile ? 0 : 81, fontSize: isMobile ? 16 : 48 }
                                        : { color: '#252525', opacity: 0.5, marginLeft: 0, fontSize: isMobile ? 16 : 32 }}
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
                                </motion.div>

                                <motion.div
                                    animate={{ height: selectedItem === index ? 'fit-content' : 0, opacity: selectedItem === index ? 1 : 0 }}
                                    transition={{ type: "spring", duration: 1 }}
                                    className={styles.mobileDescription}>
                                    <h6>{item.description}</h6>
                                </motion.div>
                            </div>
                        )
                    }

                </div>
                <h6 className={styles.rightCard}>
                    {selectedItem !== -1 && featuresItems[selectedItem].description}
                </h6>
            </AnimatePresence>
        </div>
        <Footer />
    </div>
};

export default Features;
