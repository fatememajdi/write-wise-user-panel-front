import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import { useRouter } from 'next/navigation';

//------------------------------------------components
const Section5Background = dynamic(() => import('@/components/backgrounds/section5Background/section5Background'));

//------------------------------------------styles
import styles from './landingSection5.module.css';
import '../../styles/global.css';

//------------------------------------------icons
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const steps = [
    { title: 'Prompt Generation', description: 'Dive deeper into your IELTS learning with a structured plan designed for optimal essay flow. If you have your own approach in mind, you can still integrate our AI-driven insights to enhance your preparation.' },
    { title: 'Customized Writing Plan', description: 'Dive deeper into your IELTS learning with a structured plan designed for optimal essay flow. If you have your own approach in mind, you can still integrate our AI-driven insights to enhance your preparation.' },
    { title: 'Insights and Tutoring', description: 'Dive deeper into your IELTS learning with a structured plan designed for optimal essay flow. If you have your own approach in mind, you can still integrate our AI-driven insights to enhance your preparation.' }
];

export default function Section5() {
    const [selectedItem, setSelectedItem] = React.useState<number>(0);
    const [watchedItems, changeWatchedItems] = React.useState<boolean>(false);
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });
    const router = useRouter();

    async function lockScroll(deltaY: number) {
        if (!isMobile) {
            if (document)
                if (!watchedItems) {
                    await router.push('/#wiseSense');
                    document.body.style.overflow = "hidden";
                    setTimeout(() => {
                        if (!watchedItems) {
                            if (deltaY === 100) {
                                if (selectedItem < 2)
                                    setSelectedItem(selectedItem + 1);
                                if (selectedItem === 2)
                                    changeWatchedItems(true);
                            } else {
                                if (selectedItem > 0)
                                    setSelectedItem(selectedItem - 1);
                                if (selectedItem === 0)
                                    changeWatchedItems(true);
                            }
                        }
                    }, 500);
                } else {
                    document.body.style.overflow = "auto";
                }
        }
    };

    return <Section5Background>
        <div onWheel={(e) => lockScroll(e.deltaY)} className={'col-12 ' + styles.section5}>
            <h2 className={styles.title}>
                <span className={styles.text1}>Experience </span>
                <span className={styles.text2}>WiseSensei</span>
                <br />
                <span className={styles.text3}>Your Path to IELTS Writing Mastery</span>
            </h2>
            <h6 className={styles.description}>Experience a transformative IELTS preparation <br />journey tailored for every stage of your essay writing.</h6>


            <Carousel
                showIndicators={false}
                showThumbs={false}
                renderArrowPrev={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasPrev: any) => {
                    return (
                        <div
                            className={`${hasPrev ? "absolute" : "hidden"
                                } top-0 bottom-0 left-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 ` + styles.arrowCard}
                            onClick={clickHandler}
                        >
                            <div
                                style={{ paddingRight: 5 }}
                                className={styles.arrowContainer}>
                                <IoIosArrowBack className={styles.mobileArrowIcon} />
                            </div>
                        </div>
                    );
                }}
                renderArrowNext={(clickHandler: React.MouseEventHandler<HTMLDivElement> | undefined, hasNext: any) => {
                    return (
                        <div
                            className={`${hasNext ? "absolute" : "hidden"
                                } top-0 bottom-0 right-0 flex justify-center items-center p-3 opacity-30 hover:opacity-100 cursor-pointer z-20 ` + styles.arrowCard}
                            onClick={clickHandler}
                        >
                            <div
                                style={{ paddingLeft: 5 }}
                                className={styles.arrowContainer}>
                                <IoIosArrowForward className={styles.mobileArrowIcon} />
                            </div>

                        </div>
                    );
                }}

                showStatus={false}
                thumbWidth={100}
                className={'col-12 ' + styles.carousel}
                onChange={(index) => setSelectedItem(index)}
            >
                {
                    steps.map((item, index) => <div key={index} className={styles.mobileStepCard}>{'0' + (index + 1) + ' ' + item.title}</div>)
                }
            </Carousel>

            <div className={styles.mobileStepDescription}>{steps[selectedItem].description}</div>

            <div className={styles.mainCard}>
                <AnimatePresence>
                    <motion.div
                        animate={{ paddingTop: selectedItem === 0 ? isMac ? 140 : 130 : selectedItem === 1 ? isMac ? 80 : 70 : isMac ? 30 : 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className={styles.leftCard}>
                        {
                            steps.map((item, index) => <motion.div

                                onClick={() => { setSelectedItem(index); changeWatchedItems(true); }}
                                animate={selectedItem === index ?
                                    { color: '#252525', borderBottomColor: '#000', borderBottomWidth: 1 }
                                    : {
                                        background: 'linear-gradient(345deg, rgba(110, 110, 110, 0.77) 14.41%, rgba(37, 37, 37, 0.00) 93.5%)',
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent'
                                    }}
                                transition={{ type: "spring", duration: 0.5 }}
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

            {
                /* <button onClick={() => setScroll(!scroll)} className={styles.button}>
                    <span>Start Your IELTS Tutoring Journey</span> <MdKeyboardArrowRight fontSize={30} />
                </button> */
            }
        </div>
    </Section5Background >
};
