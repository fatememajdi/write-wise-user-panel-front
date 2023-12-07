import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';

//--------------------------------------components
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------styles
import styles from './essayCard.module.css';
import './recommendation.css';


const ScoreRecommendationCard: React.FC<{ recommendation: string, GetScores: any }> = ({ recommendation, GetScores }) => {
    const [htmlString, setHtmlString] = React.useState(recommendation);

    const createMarkup = () => {
        return { __html: htmlString };
    };

    return (<div style={recommendation === '' ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            recommendation === '' ?
                <RetryCard GetScores={GetScores} />
                : recommendation === undefined ?
                    <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
                    : <div dangerouslySetInnerHTML={createMarkup()} />
        }
    </div>
    );
};

export default ScoreRecommendationCard;