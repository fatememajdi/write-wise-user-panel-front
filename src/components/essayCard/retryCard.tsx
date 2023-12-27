import React from "react";
import ReactLoading from 'react-loading';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";

//--------------------------------------components
import Loading from "@/components/loading/loading";
const Slider = dynamic(() => import("@/components/slider/slider"));
const SelectComponents = dynamic(() => import('@/components/customSelect/customSelect'));
const Text = dynamic(() => import("@/components/text/text"));
const DialogComponent = dynamic(() => import("@/components/dialog/dialog"));
import { useMultiStepForm } from '@/components/multiStepForm/useMultiStepForm';

//--------------------------------------icons
import { MdEdit } from 'react-icons/md';
import { Lock } from '../../../public/dashboard';
import { AiOutlineDelete } from 'react-icons/ai';
import { LuAlarmClock } from 'react-icons/lu';
import { HiExclamationCircle } from 'react-icons/hi';

//----------------------------------------------styles
import styles from './essayCard.module.css';
import './htmlStyles.css';

//----------------------------------------------types
import { Essay } from "../../../types/essay";

const RetryCard: React.FC<{ GetScores: any, essay?: Essay }> = ({ GetScores, essay }) => {
    const [reload, setReload] = React.useState<boolean>(false);

    const router = useRouter();

    return !reload ? <div className={styles.retryContainer}>
        Sorry, something went wrong please try again !
        <button
            type="button"
            onClick={async () => {
                await setReload(true);
                setTimeout(() => {
                    setReload(false);
                }, 1500);
                await GetScores();
            }}
        >
            Retry
        </button>
    </div>
        :
        <div style={{ margin: 'auto' }}><ReactLoading type={'bubbles'} color={'#D9D9D9'} height={100} width={100} /></div>
};

export default RetryCard;