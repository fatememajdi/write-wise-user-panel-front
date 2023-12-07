import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';

//--------------------------------------components
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------styles
import styles from './essayCard.module.css';

//----------------------------------------------types
import { Essay } from "../../../types/essay";


const EssayAnalysis: React.FC<{ essay: Essay, GetScores: any }> = ({ essay, GetScores }) => {
    const [reloadStatus, setReloadStatus] = React.useState<boolean>(essay.taskAchievementSummery === '' || essay.coherenceAndCohesionSummery === ''
        || essay.lexicalResourceSummery === '' || essay.grammaticalRangeAndAccuracySummery === ''
    )
    return <div style={reloadStatus ? { padding: 0 } : {}} className={styles.writingScoreCard}>
        {
            essay.taskAchievementSummery === undefined ?
                <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
                : reloadStatus ?
                    <RetryCard GetScores={GetScores} />
                    : <div className={styles.writingScoresContainer}>
                        <div>
                            <ScoreSummeryCard key={0} title="Task Achievement" summery={essay?.taskAchievementSummery} />
                            <ScoreSummeryCard key={1} title="Coherence & Cohesion" summery={essay?.coherenceAndCohesionSummery} />
                            <ScoreSummeryCard key={2} title="Lexical resource" summery={essay?.lexicalResourceSummery} />
                            <ScoreSummeryCard key={3} title="Grammatical Range and accuracy" summery={essay?.grammaticalRangeAndAccuracySummery} />
                        </div>
                    </div>

        }
    </div>

};


const ScoreSummeryCard: React.FC<{ title: string, summery?: string }> = ({ title, summery }) => {
    return <div className={styles.writingScoreSummeryItemCard}>
        {title}: <br /><span>
            {summery}
        </span>
    </div>
};

export default EssayAnalysis;