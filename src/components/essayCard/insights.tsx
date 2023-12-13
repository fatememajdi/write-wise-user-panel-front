import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';

//---------------------------------------------components
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------types
import { Essay, JOBSTATUS } from "../../../types/essay";

//----------------------------------------------styles
import styles from './essayCard.module.css';
import './insights.css';


const ScoreInsightsCard: React.FC<{ Insight: string, GetScores: any, essay: Essay }> = ({ Insight, GetScores, essay }) => {
    const [htmlString, setHtmlString] = React.useState(Insight);
    const createMarkup = () => {
        return { __html: htmlString };
    };

    return (<div style={Insight === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            Insight === '' || !Insight ? essay.insightJobStatus === JOBSTATUS[4] ?
                <RetryCard GetScores={GetScores} essay={essay} />
                : <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#2E4057'} height={100} width={100} /></div>
                : <div dangerouslySetInnerHTML={createMarkup()} />
        }
    </div >
    );
};

export default ScoreInsightsCard;