import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';

//--------------------------------------components
import { CheckStatus } from "../Untitled";
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------styles
import styles from './essayCard.module.css';

//----------------------------------------------types
import { Essay, JOBSTATUS } from "../../../types/essay";


const EssayAnalysis: React.FC<{ essay: Essay, GetScores: any }> = ({ essay, GetScores }) => {
    return <div style={essay.scoreJobStatus === JOBSTATUS[4] ? { padding: 0 } : {}}
        className={styles.writingScoreCard}>
        {
            CheckStatus(essay.scoreJobStatus, 'loading') ?
                <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#2E4057'} height={100} width={100} /></div>
                : CheckStatus(essay.scoreJobStatus, 'fail') ?
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