import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

//--------------------------------------components
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------styles
import styles from './essayCard.module.css';
import './recommendation.css';

//---------------------------------------------types
import { Essay } from "../../../types/essay";
import { CheckStatus } from "../Untitled";


const ScoreRecommendationCard: React.FC<{ recommendation: string, essay: Essay, GetScores: any }> = ({ recommendation, GetScores, essay }) => {
    const [htmlString, setHtmlString] = React.useState(recommendation);
    const router = useRouter();
    const createMarkup = () => {
        return { __html: htmlString };
    };

    React.useEffect(() => {
        if (recommendation !== htmlString) {
            setHtmlString(recommendation);
            router.refresh();
        }
    }, [recommendation]);

    return (<div style={recommendation === '' || !recommendation ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            CheckStatus(essay.recommendationJobStatus, 'fail') ?
                <RetryCard GetScores={GetScores} />
                : CheckStatus(essay.recommendationJobStatus, 'loading') ?
                    <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#2E4057'} height={100} width={100} /></div>
                    : <div className="recommendation" dangerouslySetInnerHTML={createMarkup()} />
        }
    </div>
    );
};

export default ScoreRecommendationCard;