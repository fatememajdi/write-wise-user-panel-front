/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { AnimatePresence, motion } from 'framer-motion';

//------------------------------------------------styles
import styles from './landingSection4.module.css';

//------------------------------------------------icons
import { MdOutlineFlag } from 'react-icons/md';


const Section4: React.FC = () => {
    return <div className={styles.section4Container}>
        <div className={styles.title}>Progressive IELTS Learning with WriteWiseAI</div>
        <div className={styles.description}>
            Empower your IELTS preparation by tracking and<br /> visualizing your writing improvements.
        </div>
        <button className={styles.button}>
            Boost My IELTS Preparation Now!
        </button>

        <AnimatePresence>
            <div className={styles.bottomContainer}>
                <div className={styles.step5}>
                    <div className={styles.stepTitle}><span>01</span> Dynamic Visuals</div>
                </div>
                <div className={styles.step4}>
                    <div className={styles.step2TopCard}></div>
                    <div className={styles.stepTitle}><span>02</span> Unlimited Revisions</div>
                </div>
                <div className={styles.step3}>
                    <div className={styles.step2TopCard}></div>
                    <div className={styles.stepTitle}><span>03</span> Diverse Feedback</div>
                </div>
                <div className={styles.step2}>
                    <div className={styles.step2TopCard}>
                        Visual feedback is a catalyst for motivation. With our progress recording service, celebrate each leap in your IELTS learning journey, setting and achieving higher milestones.
                    </div>
                    <div className={styles.stepTitle}><span>04</span> Motivation Booster</div>
                </div>
                <motion.div 
                
                className={styles.step1}>
                    <MdOutlineFlag className={styles.flagIcon} />
                    <div className={styles.step2TopCard}></div>
                </motion.div>
            </div>
        </AnimatePresence>
    </div>
};

export default Section4;