import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

//---------------------------------------------components
import { CheckStatus } from "../Untitled";
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------types
import { Essay } from "../../../types/essay";

//----------------------------------------------styles
import styles from './essayCard.module.css';
import './insights.css';


const ScoreInsightsCard: React.FC<{ Insight: string, GetScores: any, essay: Essay }> = ({ Insight, GetScores, essay }) => {
    const [htmlString, setHtmlString] = React.useState(Insight);
    const router = useRouter();
    const createMarkup = () => {
        return { __html: htmlString };
    };

    React.useEffect(() => {
        if (Insight !== htmlString) {
            setHtmlString(Insight);
            router.refresh();
        }
    },[Insight]);

    return (<div style={Insight === '' || !Insight ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            CheckStatus(essay.insightJobStatus, 'fail') ?
                <RetryCard GetScores={GetScores} essay={essay} />
                : CheckStatus(essay.insightJobStatus, 'loading') ? <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#2E4057'} height={100} width={100} /></div>
                    : <div className="insight" dangerouslySetInnerHTML={createMarkup()} />
        }
    </div >
    );
};

export default ScoreInsightsCard;