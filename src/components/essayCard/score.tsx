import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';

//--------------------------------------components
const Slider = dynamic(() => import("@/components/slider/slider"));
const RetryCard = dynamic(() => import("./retryCard"));

//----------------------------------------------styles
import styles from './essayCard.module.css';

//----------------------------------------------types
import { Essay, JOBSTATUS } from "../../../types/essay";


const EssayScore: React.FC<{ essay: Essay, GetScores: any }> = ({ essay, GetScores }) => {

    return <div style={!essay.overallBandScore || essay.overallBandScore <= 0 && essay.scoreJobStatus === JOBSTATUS[4] ? { padding: 0 } : {}}
        className={styles.writingScoreCard}>
        {
            !essay.overallBandScore || essay.overallBandScore <= 0 ? essay.scoreJobStatus !== JOBSTATUS[4] ?
                <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#2E4057'} height={100} width={100} /></div>
                : <><RetryCard GetScores={GetScores} /></>
                : <>
                    <div style={{ marginTop: 90 }} className={styles.writingScoresContainer}>
                        <div>
                            <ScoreCard key={0} title="Task Achievement" score={essay?.taskAchievementScore} />
                            <ScoreCard key={1} title="Coherence & Cohesion" score={essay?.coherenceAndCohesionScore} />
                            <ScoreCard key={2} title="Lexical resource" score={essay?.lexicalResourceScore} />
                            <ScoreCard key={3} title="Grammatical Range and accuracy" score={essay?.grammaticalRangeAndAccuracyScore} />
                        </div>

                        <div className={styles.sliderContainer}>
                            <Slider value={essay?.overallBandScore} total={9} />
                        </div>
                    </div>
                </>
        }
    </div>
};

export default EssayScore;

const ScoreCard: React.FC<{ title: string, score?: number }> = ({ title, score }) => {
    return <div className={styles.writingScoreItemCard}>
        {title}:<span>&nbsp;{score}</span>
    </div>
};