import React, { MutableRefObject, lazy } from "react";
import { Formik } from 'formik';
import * as Yup from 'yup';
import client from '@/config/applloAuthorizedClient';
import { Modal } from 'antd';
import InfiniteScroll from 'react-infinite-scroller';
import Typewriter from 'typewriter-effect';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';

//---------------------------------styles
import styles from '../../../../styles/task.module.css';

//--------------------------------------components
import {
    ADD_ESSAY, DELETE_ESSAY, GET_OVERAL_SCORE, GET_RANDOM_GENERAL_TASK1_WRITING,
    GET_RANDOM_GENERAL_TASK2_WRITING, SCORE_COHERENCE, SCORE_GRAMMATICAL,
    SCORE_LEXICAL, SCORE_TASK_RESPONSE, SELECT_TOPIC
} from "@/config/graphql";
import Loading from "@/components/loading/loading";
import EssayCard from "@/components/essayCard/essayCard";
const Input = lazy(() => import('@/components/input/input'));
const SelectComponents = lazy(() => import('@/components/customSelect/customSelect'));
import { CountWords, SplitText } from "@/components/Untitled";
const Text = lazy(() => import("@/components/text/text"));
const Timer = lazy(() => import("@/components/timer/timer"));

//--------------------------------------icons
import { Reload } from "../../../../../public";
import { MdEdit } from 'react-icons/md';

//--------------------------------------types
import { Essay } from '../../../../../types/essay';

type topic = {
    id: string,
    body: string,
    type: string
}

type _props = {
    changeTabBarLoc: any
    changeEndAnimation: any,
    endAnimation: boolean,
    topic?: topic,
    essaies: Essay[],
    GetUserEssaies: any,
    MoreEssaies: boolean,
    changeMoreEssaies: any,
    setEssaies: any,
    handleNewTopic: any,
    divRef?: any,
    targetRef: any
}

const GeneralTask1: React.FC<_props> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef, targetRef }) => {

    return <>

    </>
};

export default GeneralTask1;