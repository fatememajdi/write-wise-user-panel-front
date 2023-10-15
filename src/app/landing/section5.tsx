import React from 'react';
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
    // !scroll ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto";
    // document.body.addEventListener("mousewheel", function () {
    //     console.log('df')
    // });

    // document.body.addEventListener("DOMMouseScroll", function () {
    //     console.log('df')
    // });


    return <Section5Background>
        <div onWheel={() => console.log('hi')} className={'col-12 ' + styles.section5}>
            <div className={styles.title}>
                <span className={styles.text1}>Experience </span>
                <span className={styles.text2}>WiseSensei</span>
                <br />
                <span className={styles.text3}>Your Path to IELTS Writing Mastery</span>
            </div>
            <div className={styles.description}>Experience a transformative IELTS preparation <br />journey tailored for every stage of your essay writing.</div>

            <div className={styles.mainCard}>
                dfkjn
            </div>

            <button onClick={() => setScroll(!scroll)} className={styles.button}>
                <span>Start Your IELTS Tutoring Journey</span> <MdKeyboardArrowRight fontSize={30} />
            </button>
        </div>
    </Section5Background>
};

export default Section5;