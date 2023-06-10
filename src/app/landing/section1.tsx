import React from "react";

//------------------------------------------------styles
import styles from './landingSection1.module.css';

//------------------------------------------------icons
import { VscCircleFilled } from 'react-icons/vsc';

const Section1: React.FC = () => <div className={'col-12 ' + styles.section1Container}>

    <div className={'col-lg-6 ' + styles.leftContainer}>
        <div className={styles.leftContainerCircle}></div>
    </div>

    <div className={'col-lg-6 ' + styles.rightContainer}>
        <div className={styles.rightContainerTitle}>
            Boost Your IELTS Writing<br /> Score with AI
        </div>
        <div className={styles.rightContainerDescription}>
            Unlock the power of WriteWiseAI<br />
            Your Personal IELTS Writing Tuto

            <div
                style={{ marginTop: 14 }}
                className={styles.rightContainerDescriptionItem}>
                <VscCircleFilled className={styles.rightContainerDescriptionItemIcon} />
                {'Get your essays rated for '}<span>&nbsp;Free!</span>
            </div>
            <div className={styles.rightContainerDescriptionItem}>
                <VscCircleFilled className={styles.rightContainerDescriptionItemIcon} />
                {'Recieve personalized analysis and feedback for just '}<span> &nbsp;$1&nbsp;</span>{' per essay'}
            </div>

        </div>

        <button className={styles.rightContainerButton}>
            I Want to Write Like a Pro!
        </button>

    </div>

</div>;

export default Section1;