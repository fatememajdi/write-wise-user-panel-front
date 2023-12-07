import React from "react";
import dynamic from 'next/dynamic';

//--------------------------------------components
const Text = dynamic(() => import("@/components/text/text"));

//--------------------------------------icons
import { MdEdit } from 'react-icons/md';
import { AiOutlineDelete } from 'react-icons/ai';
import { LuAlarmClock } from 'react-icons/lu';

//----------------------------------------------styles
import styles from './essayCard.module.css';

//----------------------------------------------types
import { Essay } from "../../../types/essay";

const EssayBody: React.FC<{ essay: Essay, setFieldValue: any, handleDelete: any, divRef?: any, setOpen: any, topic: string, OnEditEssay: any }>
    = ({ essay, setFieldValue, divRef, setOpen, topic, OnEditEssay }) => {
        return <div className={styles.writingEssayCard}>

            <div className={styles.writingTimeCard}>
                <LuAlarmClock className={styles.clockIcon} />
                {essay.durationMillisecond && Math.round(essay.durationMillisecond / 60000) + ' minutes'}
                <span>{new Intl.DateTimeFormat('en-US').format((new Date(essay?.date)))}</span>
                <span>{essay.shortId}</span>
            </div>
            <div className={styles.writingEssayTopic}>
                <Text text={topic} />
            </div>

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
                        OnEditEssay();
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

export default EssayBody;