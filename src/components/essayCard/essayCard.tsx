import React, { lazy } from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';

//--------------------------------------components
import Loading from "@/components/loading/loading";
const Slider = dynamic(() => import("@/components/slider/slider"));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));
const Text = lazy(() => import("@/components/text/text"));

//--------------------------------------icons
import { MdEdit } from 'react-icons/md';
import { Lock } from '../../../public/dashboard';
import { AiOutlineDelete } from 'react-icons/ai';

//----------------------------------------------styles
import styles from './essayCard.module.css';

//----------------------------------------------types
import { Essay } from "../../../types/essay";

//----------------------------------------------components
const DialogComponent = lazy(() => import("@/components/dialog/dialog"));
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';

const tabBarItems = [
    {
        title: 'Essay',
        active: true,
        index: 1,
    },
    {
        title: 'Score',
        active: true,
        index: 0,
    },
    {
        title: 'Analysis',
        active: true,
        index: 2,
    },
    {
        title: 'Recommendations',
        active: false,
        index: 3,
    },
    {
        title: 'WWAI Tutor',
        active: false,
        index: 4,
    },
];

interface _props {
    essay?: Essay,
    setFieldValue?: any,
    divRef?: any,
    handleDelete?: any,
    loading?: boolean
}

const EssayCard: React.FC<_props> = ({ essay, setFieldValue, divRef, handleDelete, loading }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const { step, goTo, currentStepIndex } = useMultiStepForm(
        [<EssayScore essay={essay} goTo={analysisStep} />,
        <EssayBody essay={essay} setFieldValue={setFieldValue} handleDelete={handleDelete} divRef={divRef} setOpen={setOpen} />,
        <EssayAnalysis essay={essay} />]);

    function analysisStep() { goTo(2) };

    return <div className={styles.writingDataCard}>
        <div className={styles.writingDataTabBarCard}>
            {
                tabBarItems.map((item, index) =>
                    <div
                        onClick={() => goTo(item.index)}
                        style={!item.active ? { cursor: 'context-menu' } : {}}
                        className={currentStepIndex === item.index ? styles.activeTopTabBarItemCard + ' ' + styles.topTabBarItemCard
                            : styles.topTabBarItemCard}
                        key={index} >
                        <span
                            style={!item.active ? { opacity: 0.5, cursor: 'context-menu' } : {}}>{item.title}</span>
                        {!item.active && <Lock className={styles.lockIcon} />}
                    </div>
                )
            }
        </div>

        <SelectComponents values={[
            { title: 'Score', active: true, lock: false },
            { title: 'Essay', active: true, lock: false },
            { title: 'Analysis', active: false, lock: true },
            { title: 'Recommendations', active: false, lock: true },
            { title: 'WWAI Tutor', active: false, lock: true }
        ]}
            selectedItem={currentStepIndex} className={styles.writingCardSelect} onChange={goTo} />

        {
            loading === true ?
                <div className={styles.writingEssayCard}>
                    <Loading style={{ height: 390, minHeight: 0 }} />
                </div>
                : step

        }

        <DialogComponent open={open} handleClose={() => setOpen(false)}
            handleDelete={() => {
                setOpen(false);
                handleDelete(essay?.id)
            }}
            title="Delete Essay" dialog="Permanently delete the essay?" />
    </div >
};

export default EssayCard;

const EssayBody: React.FC<{ essay?: Essay, setFieldValue?: any, handleDelete?: any, divRef?: any, setOpen?: any }> = ({ essay, setFieldValue, divRef, setOpen }) => {
    return <div className={styles.writingEssayCard}>
        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
        <div className={styles.writingEssayText}>
            <Text text={essay?.essay} />
        </div>
        <div className={styles.essayButtonContainer}>
            <button
                onClick={() => setOpen(true)}
                type="button"
                aria-label="delete button"
                className={styles.deleteWritingButton}>
                <div className={styles.responsiveEditWritingButton}> <AiOutlineDelete className={styles.deleteWritingButtonIcon} /></div>
            </button>
            <button
                onClick={() => {
                    setFieldValue('body', essay?.essay);
                    if (divRef)
                        divRef.scrollTop = divRef.offsetTop;
                }}
                type="button"
                aria-label="edit button"
                className={styles.editWritingButton}>
                <div className={styles.responsiveEditWritingButton}> <MdEdit className={styles.editWritingButtonIcon} /></div>
            </button>

        </div>
    </div>
};

const EssayScore: React.FC<{ essay?: Essay, goTo: any }> = ({ goTo, essay }) => {
    return <div
        className={styles.writingScoreCard}>
        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
        <div className={styles.writingScoresContainer}>
            <div>
                <div className={styles.writingScoreItemCard}>Task Achievement: {essay?.taskAchievementScore ? essay?.taskAchievementScore
                    : <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}</div>
                <div className={styles.writingScoreItemCard}>Coherence & Cohesion: {essay?.coherenceAndCohesionScore ? essay?.coherenceAndCohesionScore
                    : <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}</div>
                <div className={styles.writingScoreItemCard}>Lexical resource: {essay?.lexicalResourceScore ? essay?.lexicalResourceScore
                    : <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}</div>
                <div className={styles.writingScoreItemCard}>Grammatical Range and accuracy: {essay?.grammaticalRangeAndAccuracyScore ? essay?.grammaticalRangeAndAccuracyScore
                    : <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}</div>
            </div>

            <div className={styles.sliderContainer}>
                <Slider value={essay?.overallBandScore} total={9} />
            </div>
        </div>
        <div className={styles.analusisButtonContainer}>
            <button
                type="button"
                aria-label="anausis button"
                onClick={() => goTo(3)}
                className={styles.analusisButton}>
                Analysis
            </button>
        </div>
    </div>
};

const EssayAnalysis: React.FC<{ essay?: Essay }> = ({ essay }) => {
    return <div
        className={styles.writingScoreCard}>
        <div className={styles.writingScoreDate}>{new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(essay?.date))) + ' ' + new Date(essay?.date).getDate()}</div>
        <div className={styles.writingScoresContainer}>
            <div>
                <div className={styles.writingScoreItemCard}>Task Achievement Summery: <br /><span>{essay?.taskAchievementSummery}</span></div>
                <div className={styles.writingScoreItemCard}>Coherence & Cohesion Summery: <br /><span>{essay?.coherenceAndCohesionSummery}</span></div>
                <div className={styles.writingScoreItemCard}>Lexical resource summery:<br /><span> {essay?.lexicalResourceSummery}</span></div>
                <div className={styles.writingScoreItemCard}>Grammatical Range and accuracy summery:<br /><span> {essay?.grammaticalRangeAndAccuracySummery}</span></div>
            </div>
        </div>
    </div>

};