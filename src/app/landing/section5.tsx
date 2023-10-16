import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

//------------------------------------------components
const Section5Background = dynamic(() => import('@/components/backgrounds/section5Background/section5Background'));

//------------------------------------------styles
import styles from './landingSection5.module.css';

//------------------------------------------icons
import { MdKeyboardArrowRight } from 'react-icons/md';

const steps = [
    { title: 'Prompt Generation', description: 'Dive deeper into your IELTS learning with a structured plan designed for optimal essay flow. If you have your own approach in mind, you can still integrate our AI-driven insights to enhance your preparation.' },
    { title: 'Customized Writing Plan', description: 'Dive deeper into your IELTS learning with a structured plan designed for optimal essay flow. If you have your own approach in mind, you can still integrate our AI-driven insights to enhance your preparation.' },
    { title: 'Insights and Tutoring', description: 'Dive deeper into your IELTS learning with a structured plan designed for optimal essay flow. If you have your own approach in mind, you can still integrate our AI-driven insights to enhance your preparation.' }
];

const Section5: React.FC = () => {

    const [scroll, setScroll] = React.useState<boolean>(true);
    const [selectedItem, setSelectedItem] = React.useState<number>(0);
    const [watchedItems, changeWatchedItems] = React.useState<boolean>(false);

    function lockScroll() {
        if (document)
            !watchedItems ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
        setTimeout(() => {
            if (!watchedItems) {
                if (selectedItem < 2)
                    setSelectedItem(selectedItem + 1);
                if (selectedItem === 2)
                    changeWatchedItems(true);
            }
        }, 1000);

    }

    // document.body.addEventListener("mousewheel", function () {
    //     console.log('df')
    // });

    // document.body.addEventListener("DOMMouseScroll", function () {
    //     console.log('df')
    // });


    return <Section5Background>
        <div onWheel={() => lockScroll()} className={'col-12 ' + styles.section5}>
            <div className={styles.title}>
                <span className={styles.text1}>Experience </span>
                <span className={styles.text2}>WiseSensei</span>
                <br />
                <span className={styles.text3}>Your Path to IELTS Writing Mastery</span>
            </div>
            <div className={styles.description}>Experience a transformative IELTS preparation <br />journey tailored for every stage of your essay writing.</div>

            <div className={styles.mainCard}>
                <AnimatePresence>
                    <motion.div
                        animate={{ paddingBottom: selectedItem === 0 ? 0 : selectedItem === 1 ? 55 : 160, paddingTop: selectedItem === 0 ? 100 : 0 }}
                        transition={{ type: "spring", duration: 3 }}
                        className={styles.leftCard}>
                        {
                            steps.map((item, index) => <motion.div

                                onClick={() => { setSelectedItem(index); changeWatchedItems(true); console.log(selectedItem) }}
                                animate={selectedItem === index ?
                                    { color: '#252525', borderBottomColor: '#000', borderBottomWidth: 1 }
                                    : {
                                        background: 'linear-gradient(345deg, rgba(110, 110, 110, 0.77) 14.41%, rgba(37, 37, 37, 0.00) 93.5%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                transition={{ type: "spring", duration: 3 }}
                                className={styles.stepTitle}
                                key={index}>
                                <span>{'0' + (index + 1)}   </span>{item.title}
                            </motion.div>)
                        }
                    </motion.div>

                    <div className={styles.rightCard}>
                        {steps[selectedItem].description}
                    </div>
                </AnimatePresence>
            </div>

            {/* <button onClick={() => setScroll(!scroll)} className={styles.button}>
                <span>Start Your IELTS Tutoring Journey</span> <MdKeyboardArrowRight fontSize={30} />
            </button> */}
        </div>
    </Section5Background >
};

export default Section5;