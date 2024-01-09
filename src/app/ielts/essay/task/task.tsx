/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import dynamic from "next/dynamic";
import ReactLoading from 'react-loading';

//--------------------------------------components
const TaskForm = dynamic(() => import("../taskForm/taskForm"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});

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