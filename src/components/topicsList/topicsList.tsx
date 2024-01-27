/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from 'react-infinite-scroller';

//-------------------------------------------styles
import styles from './topicsList.module.css';

//-------------------------------------------types
import { Topic } from "../../../types/topic";
import { SelectedTopicTempEssay, tempEssay } from "../../../types/essay";

//-------------------------------------------components
const Loading = dynamic(() => import("@/components/loading/loading"));
const DialogComponent = dynamic(() => import("../dialog/dialog"));

//-------------------------------------------icons
import { Empty } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

type _props = {
    Topics: Topic[],
    HandleSelect: any,
    GetTopicsList: any,
    MoreTopics: boolean,
    HandleDelete: any,
    type: string,
    selectedTopic?: Topic,
    temp?: tempEssay,
    tempsList?: SelectedTopicTempEssay[],
    CheckTempEssay: any
};

export default function TopicsList({ Topics, HandleSelect, GetTopicsList, CheckTempEssay,
    MoreTopics, HandleDelete, type, selectedTopic, temp, tempsList }: _props) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [loading, setLoading] = React.useState<boolean>(false);
    const [selectedId, changeSelectedId] = React.useState<string>('');

    function handleClose() {
        setOpen(false);
    };

    async function handleDelete() {
        setOpen(false);
        setLoading(true);
        await HandleDelete(selectedId);
        setLoading(false);
    };

    return <div className={'col-12 ' + styles.tasksContainer}>
        {
            loading ?
                <Loading style={{ height: '100%', minHeight: 0 }} />
                : Topics.filter(item => item.type === type).length === 0 ?
                    <>
                        <Empty description={false} style={{ marginTop: '50%' }} />
                    </>
                    :
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => GetTopicsList()}
                        hasMore={MoreTopics}
                        loader={<Loading style={{ height: 40, minHeight: 0, marginTop: 5 }} key={1} />}
                        useWindow={false}
                        key={0}
                    >
                        {
                            temp &&
                            <div
                                style={temp.topic.id === selectedTopic?.id ? { background: '#172E4A' } : {}}
                                className={'col-12 ' + styles.taskCard} key={-1} >
                                <div
                                    onClick={() => HandleSelect({ id: temp.topic.id, body: temp.topic.body, type: temp.topic.type, visuals: temp.visuals }, temp.essay)}
                                    className={styles.taskCardTitle}>
                                    <div className={styles.shortNameText}>{temp.topic.body}</div>
                                    {/* <span>
                                        {new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(item.createdAt))) + ' ' + new Date(item.createdAt).getDate()}
                                    </span> */}
                                </div>
                                <div className={styles.taskCardScore}>
                                    <div>
                                        <div className={styles.tempScore} style={{ fontSize: 26 }}>
                                            ?
                                        </div>
                                        <AiOutlineDelete className={styles.deleteIcon}
                                            onClick={() => {
                                                localStorage.removeItem(type === 'general_task_1' ? 'tempEssay' : type === 'academic_task_1' ? 'tempEssay3' : 'tempEssay2');
                                                localStorage.removeItem(type === 'general_task_1' ? 'lastTempEssay' : type === 'academic_task_1' ? 'lastTempEssay3' : 'lastTempEssay2');
                                                CheckTempEssay(type);
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                        {
                            Topics.filter(item => item.type === type).map((item: any, index: any) =>
                                <div
                                    style={item.id === selectedTopic?.id ? { background: '#172E4A' } : {}}
                                    className={'col-12 ' + styles.taskCard} key={index} >
                                    <div
                                        onClick={() => {
                                            HandleSelect({ id: item.id, body: item.topic, type: item.type, visuals: item.visuals, subType: item.subType },
                                                tempsList.findIndex(tempItem => tempItem.id === item.id) === -1 ? ''
                                                    : tempsList[tempsList.findIndex(tempItem => tempItem.id === item.id)].essay);
                                            CheckTempEssay(type);
                                        }}
                                        className={styles.taskCardTitle}>
                                        <div className={styles.shortNameText}>{item.shortName}</div>
                                        <span>
                                            {item.shortId}
                                        </span>
                                    </div>
                                    <div className={styles.taskCardScore}>
                                        <div>
                                            {item.overallBandScore}
                                            <AiOutlineDelete className={styles.deleteIcon}
                                                onClick={() => {
                                                    setOpen(true);
                                                    changeSelectedId(item.id);
                                                }} />
                                        </div>
                                        <span>
                                            {new Intl.DateTimeFormat('en-US').format((new Date(item.createdAt)))}
                                        </span>
                                    </div>
                                </div>

                            )
                        }
                    </InfiniteScroll>
        }

        <DialogComponent open={open} handleClose={handleClose} handleDelete={handleDelete}
            title="Delete Topic" dialog="Permanently delete the topic?" />
    </div >
};