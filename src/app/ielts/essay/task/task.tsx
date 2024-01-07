/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import dynamic from "next/dynamic";

//--------------------------------------components
const TaskForm = dynamic(() => import("../taskForm/taskForm"));

//--------------------------------------types
import { TaskProps } from "../../../../../types/task";

export default function Task({ changeTabBarLoc, changeEndAnimation, endAnimation, topic, essay, GetScores,
    essaies, GetUserEssaies, MoreEssaies, changeMoreEssaies, setEssaies, handleNewTopic, divRef, type, targetRef, handleShowError }: TaskProps) {
    return <>
        {
            topic ?
                <TaskForm key={topic.id} changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={topic}
                    essaies={essaies} GetUserEssaies={GetUserEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} setEssaies={setEssaies}
                    handleNewTopic={handleNewTopic} divRef={divRef} type={type} targetRef={targetRef} essay={essay} GetScores={GetScores} handleShowError={handleShowError} />

                : <TaskForm changeTabBarLoc={changeTabBarLoc} changeEndAnimation={changeEndAnimation} endAnimation={endAnimation} topic={topic}
                    essaies={essaies} GetUserEssaies={GetUserEssaies} MoreEssaies={MoreEssaies} changeMoreEssaies={changeMoreEssaies} setEssaies={setEssaies}
                    handleNewTopic={handleNewTopic} divRef={divRef} type={type} targetRef={targetRef} essay={essay} GetScores={GetScores} handleShowError={handleShowError} />

        }
    </>
};