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
    selectedTopic?: Topic
};

export default function TopicsList({ Topics, HandleSelect, GetTopicsList, MoreTopics, HandleDelete, type, selectedTopic }: _props) {
    const [open, setOpen] = React.useState<boolean>(false);
    const [temp, setTemp] = React.useState<tempEssay | null>();
    const [tempsList, setTempsList] = React.useState<SelectedTopicTempEssay[]>([]);
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

    async function SetTempEssay() {
        const newTemp: tempEssay = { topic: { id: '', body: '', type: type }, essay: '' };
        let temp: tempEssay[][] = [Array(3).fill(newTemp), Array(3).fill(newTemp)];
        let tempIndex: number = type === 'general_task_1' ? 0 : type === 'academic_task_1' ? 1 : 2;
        if (await localStorage.getItem('tempEssay'))
            temp = JSON.parse(await localStorage.getItem('tempEssay'));
        let selectedTopicsTempList: SelectedTopicTempEssay[] = JSON.parse(await localStorage.getItem('tempsEssayList')) || [];

        if (temp[1][tempIndex].topic.body !== '') {
            setTemp({ topic: temp[1][tempIndex].topic, essay: temp[1][tempIndex].essay });
        }
        else if (temp[0][tempIndex].topic.body !== '') {
            setTemp({ topic: temp[0][tempIndex].topic, essay: temp[0][tempIndex].essay });
        }
        setTempsList(selectedTopicsTempList);
    };

    React.useEffect(() => {
        SetTempEssay();
    }, []);

    console.log(temp);

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
                                                if (type === 'general_task_1') {
                                                    localStorage.removeItem('tempEssay');
                                                    localStorage.removeItem('lastTempEssay');
                                                    setTemp(null);
                                                } else if (type === 'academic_task_1') {
                                                    localStorage.removeItem('tempEssay3');
                                                    localStorage.removeItem('lastTempEssay3');
                                                    setTemp(null);
                                                } else {
                                                    localStorage.removeItem('tempEssay2');
                                                    localStorage.removeItem('lastTempEssay2');
                                                    setTemp(null);
                                                }
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
                                            SetTempEssay();
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