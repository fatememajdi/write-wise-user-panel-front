import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';

//---------------------------------------------components
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------types
import { Essay } from "../../../types/essay";

//----------------------------------------------styles
import styles from './essayCard.module.css';
import './insights.css';


const ScoreInsightsCard: React.FC<{ Insight: string, GetScores: any, essay: Essay, goTo: any }> = ({ Insight, GetScores, essay, goTo }) => {
    const [htmlString, setHtmlString] = React.useState(Insight);
    const createMarkup = () => {
        return { __html: htmlString };
    };

    // return (<div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
    //     {
    //         Insight === '' ?
    //             <RetryCard GetScores={GetScores} essay={essay} />
    //             : Insight === undefined ?
    //                 <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
    //                 : <div dangerouslySetInnerHTML={createMarkup()} />
    //     }
    // </div >
    // );

    if (Insight === '') {
        goTo(3);
        return <div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>

            <RetryCard GetScores={GetScores} essay={essay} />
        </div >
    }
    else if (Insight === undefined) {
        goTo(3);

        return <div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
            <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
        </div >
    } else {
        goTo(3);

        return <div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
            <div dangerouslySetInnerHTML={createMarkup()} />
        </div >
    }
};

export default ScoreInsightsCard;