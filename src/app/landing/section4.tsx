/* eslint-disable react/no-unescaped-entities */
'use client';
import React from "react";
import { AnimatePresence, motion } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';

//------------------------------------------------styles
import styles from './landingSection4.module.css';

//------------------------------------------------icons
import { MdOutlineFlag, MdKeyboardArrowRight, MdOutlineKeyboardArrowDown } from 'react-icons/md';
import { Flag, Steps } from "../../../public";

const steps = [
    { title: 'Dynamic Visuals', description: 'Dive deep into your IELTS learning journey with interactive charts showing your evolving scores over time. Whether you are just starting out or refining advanced skills, these visuals offer a clear picture of your progress.' },
    { title: 'Unlimited Revisions', description: 'As part of your comprehensive IELTS preparation, refine and resubmit your essays. Each revision brings fresh scores and insights, allowing you to witness your growth and continuously improve English writing skills.' },
    { title: 'Diverse Feedback', description: 'Beyond scores, gain insights across varied IELTS tasks and topics. This holistic feedback is crucial for a well-rounded preparation for the IELTS writing exam' },
    { title: 'Motivation Booster', description: 'Visual feedback is a catalyst for motivation. With our progress recording service, celebrate each leap in your IELTS learning journey, setting and achieving higher milestones.' },
]

const Section4: React.FC = () => {

    const [selectedItem, changeSelectedItem] = React.useState<number>(0);
    // const [animating, changeAnimating] = React.useState<boolean>(false);
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    function selectStep(id: number) {
        if (id === selectedItem)
            changeSelectedItem(0);
        else
            changeSelectedItem(id);
    };

    function DesktopSelectStep(id: number) {
        if (id !== selectedItem) {
            changeSelectedItem(id);
            // if (animating) {
            //     setTimeout(() => {
            //         changeSelectedItem(id);
            //         changeAnimating(true);
            //     }, 1000);
            // } else {
            //     changeSelectedItem(id);
            //     changeAnimating(true);
            // }
        };
        // setTimeout(() => {
        //     changeAnimating(false);
        // }, 1500);
    };

    return <div
        onWheel={() => {
            if (selectedItem === 0 && !isMobile)
                changeSelectedItem(1);
        }} className={styles.section4Container}>
        <div className={styles.title}>Progressive IELTS Learning with WriteWiseAI</div>
        <div className={styles.Divider} />
        <div className={styles.description}>
            Empower your IELTS preparation by tracking and<br /> visualizing your writing improvements.
        </div>

        {/* <button className={styles.button}>
            Boost My IELTS Preparation Now!
        </button> */}

        {/* //-----------------------------------------------------------------------------mobile mode steps */}
        <AnimatePresence>
            <div className={'col-12 ' + styles.responsiveStepsContainer}>
                {
                    steps.map((item, index) => <div key={index} className={styles.responsiveStepCard}>
                        <motion.div
                            animate={{ opacity: selectedItem !== (index + 1) && selectedItem !== 0 ? 0.5 : 1 }}
                            transition={{ type: "spring", duration: 2 }}
                            onClick={() => selectStep(index + 1)}
                            className={styles.responsiveStepTitle}>
                            {
                                selectedItem === (index + 1) ?
                                    <MdOutlineKeyboardArrowDown fontSize={20} />
                                    :
                                    <MdKeyboardArrowRight fontSize={20} />
                            }
                            {' 0' + (index + 1) + ' ' + item.title}
                        </motion.div>
                        <motion.div
                            animate={{ height: selectedItem === (index + 1) ? 'fit-content' : 0 }}
                            transition={{ type: "spring", duration: 2 }}
                            className={styles.responsiveStepDescription}
                        >
                            {selectedItem === (index + 1) &&
                                item.description
                            }
                        </motion.div>
                    </div>)
                }
            </div>
        </AnimatePresence>

        <motion.div
            animate={{ opacity: selectedItem !== 0 ? 0.5 : 1 }}
            transition={{ type: "spring", duration: 2 }}
            className={styles.stepsImage}>
            <Flag className={styles.flagIcon} />
            <Steps />
        </motion.div>

        {/* //-----------------------------------------------------------------------------desktop mode steps */}

        <AnimatePresence>
            <div className={styles.bottomContainer}>
                <div
                    style={{ opacity: selectedItem === 1 || selectedItem === 0 ? 1 : 0.5 }}
                    className={styles.step6}></div>
                <motion.div
                    animate={{ height: selectedItem === 1 ? '36vh' : '22vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 1 || selectedItem === 0 ? 1 : 0.5 }}
                    className={styles.step5}>
                    <motion.div
                        animate={{ height: selectedItem === 1 ? '14vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className={styles.step2TopCard}>
                        <motion.div animate={{ height: selectedItem === 1 ? '7vh' : 0 }}
                            transition={{ type: "spring", duration: 1.5 }} className={styles.activeStepCard} />
                        <motion.div
                            animate={{ opacity: selectedItem === 1 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            Dive deep into your IELTS learning journey with interactive charts showing your evolving scores over time. Whether you're just starting out or refining advanced skills, these visuals offer a clear picture of your progress.
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(1)}
                        className={styles.stepTitle}><span>01</span> Dynamic Visuals</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 2 ? '39vh' : '29vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 2 || selectedItem === 0 ? 1 : 0.5 }}
                    className={styles.step4}>
                    <motion.div animate={{ height: selectedItem === 2 ? '3vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }} className={styles.activeStepCard} />
                    <motion.div
                        animate={{ height: selectedItem === 2 ? '17vh' : selectedItem === 1 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className={styles.step2TopCard}>
                        <motion.div
                            animate={{ opacity: selectedItem === 2 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            As part of your comprehensive IELTS preparation, refine and resubmit your essays. Each revision brings fresh scores and insights, allowing you to witness your growth and continuously improve English writing skills.
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(2)}
                        className={styles.stepTitle}><span>02</span> Unlimited Revisions</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 3 ? '50vh' : '36vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 3 || selectedItem === 0 ? 1 : 0.5 }}
                    className={styles.step3}>
                    <motion.div
                        animate={{ height: selectedItem === 3 ? '21vh' : selectedItem === 2 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className={styles.step2TopCard}>
                        <motion.div animate={{ height: selectedItem === 3 ? '7vh' : 0 }}
                            transition={{ type: "spring", duration: 1.5 }} className={styles.activeStepCard} />
                        <motion.div
                            animate={{ opacity: selectedItem === 3 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            Beyond scores, gain insights across varied IELTS tasks and topics. This holistic feedback is crucial for a well-rounded preparation for the IELTS writing exam
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(3)}
                        className={styles.stepTitle}><span>03</span> Diverse Feedback</div>
                </motion.div>
                <motion.div
                    animate={{ height: selectedItem === 4 ? '57vh' : '43vh' }}
                    transition={{ type: "spring", duration: 1.5 }}
                    style={{ opacity: selectedItem === 4 || selectedItem === 0 ? 1 : 0.5 }}
                    className={styles.step2}>
                    <motion.div animate={{ height: selectedItem === 4 ? '7vh' : 0 }}
                        transition={{ type: "spring", duration: 1.5 }} className={styles.activeStepCard} />
                    <motion.div
                        animate={{ height: selectedItem === 4 ? '21vh' : selectedItem === 3 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }} className={styles.step2TopCard}>
                        <motion.div
                            animate={{ opacity: selectedItem === 4 ? 1 : 0 }}
                            style={{ padding: 10, zIndex: 1 }}
                            transition={{ type: "spring", duration: 1.5 }}>
                            Visual feedback is a catalyst for motivation. With our progress recording service, celebrate each leap in your IELTS learning journey, setting and achieving higher milestones.
                        </motion.div>
                    </motion.div>
                    <div
                        onClick={() => DesktopSelectStep(4)}
                        className={styles.stepTitle}><span>04</span> Motivation Booster</div>
                </motion.div>
                <motion.div
                    style={{ opacity: selectedItem === 4 || selectedItem === 0 ? 1 : 0.5 }}
                    className={styles.step1}>
                    <MdOutlineFlag className={styles.flagIcon} />
                    <motion.div
                        animate={{ height: selectedItem === 4 ? 0 : '7vh' }}
                        transition={{ type: "spring", duration: 1.5 }}
                        className={styles.step2TopCard}>  </motion.div>
                </motion.div>
            </div>
        </AnimatePresence>
    </div>
};

export default Section4;