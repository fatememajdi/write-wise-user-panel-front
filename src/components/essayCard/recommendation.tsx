import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';

//--------------------------------------components
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------styles
import styles from './essayCard.module.css';
import './recommendation.css';

//---------------------------------------------types
import { Essay, JOBSTATUS } from "../../../types/essay";


const ScoreRecommendationCard: React.FC<{ recommendation: string, essay: Essay, GetScores: any }> = ({ recommendation, GetScores, essay }) => {
    const [htmlString, setHtmlString] = React.useState(recommendation);

    const createMarkup = () => {
        return { __html: htmlString };
    };

    return (<div style={recommendation === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            recommendation === '' || !recommendation ? essay.recommendationJobStatus === JOBSTATUS[4] ?
                <RetryCard GetScores={GetScores} />
                : <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#2E4057'} height={100} width={100} /></div>
                : <div dangerouslySetInnerHTML={createMarkup()} />
        }
    </div>
    );
};

export default ScoreRecommendationCard;