/* eslint-disable react-hooks/exhaustive-deps */
import React, { lazy } from "react";

//--------------------------------------components
const Task2 = lazy(() => import("../task2/task2"));
const GeneralTask = lazy(() => import("../generalTask1/generalTask1"));
const AcademicTask = lazy(() => import("../academicTask1/academicTask1"));

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
    type: string,
    targetRef: any,
}

const Task: React.FC<_props> = ({ changeTabBarLoc, changeEndAnimation, endAnimation, topic,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef, type, targetRef }) => {
    return <>
        {
            topic ?
                topic.type === 'general_task_1' ?
                    <GeneralTask key={topic.id} changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={topic}
                        essaies={essaies} GetUserEssaies={GetUserEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} setEssaies={setEssaies}
                        handleNewTopic={handleNewTopic} divRef={divRef} type={type} targetRef={targetRef} />
                    : topic.type === 'academic_task_1' ?
                        <AcademicTask />
                        : <Task2 key={topic.id} changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={topic}
                            essaies={essaies} GetUserEssaies={GetUserEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} setEssaies={setEssaies}
                            handleNewTopic={handleNewTopic} divRef={divRef} type={type} targetRef={targetRef} />
                :
                type === 'academic_task_1' ?
                    <AcademicTask />
                    : type === 'general_task_1' ?
                        <GeneralTask changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={topic}
                            essaies={essaies} GetUserEssaies={GetUserEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} setEssaies={setEssaies}
                            handleNewTopic={handleNewTopic} divRef={divRef} type={type} targetRef={targetRef} />
                        : <Task2 changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={topic}
                            essaies={essaies} GetUserEssaies={GetUserEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} setEssaies={setEssaies}
                            handleNewTopic={handleNewTopic} divRef={divRef} type={type} targetRef={targetRef} />
        }
    </>
};

export default Task;
