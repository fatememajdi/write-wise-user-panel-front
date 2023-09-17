import React from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from 'react-infinite-scroller';

//-------------------------------------------styles
import styles from './topicsList.module.css';

//-------------------------------------------types
import { Topic } from "../../../types/topic";

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

type tempEssay = {
    topic: {
        id?: string,
        body: string,
        type: string
    },
    essay: string
    currentId?: string
};

const TopicsList: React.FC<_props> = ({ Topics, HandleSelect, GetTopicsList, MoreTopics, HandleDelete, type, selectedTopic }) => {
    const [open, setOpen] = React.useState<boolean>(false);
    const [temp, setTemp] = React.useState<tempEssay | null>();
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
        let Temp = await localStorage.getItem('tempEssay');
        if (Temp && JSON.parse(Temp) !== temp)
            setTemp(JSON.parse(Temp));
    }

    React.useEffect(() => {
        SetTempEssay();
    }, []);

    return <div className={'col-12 ' + styles.tasksContainer}>
        {
            loading ?
                <Loading style={{ height: '100%', minHeight: 0 }} />
                : Topics.length === 0 ?
                    <>
                        <Empty description={false} style={{ marginTop: '50%' }} />
                    </>
                    :
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => GetTopicsList()}
                        hasMore={MoreTopics}
                        loader={<Loading style={{ height: 40, minHeight: 0, marginTop: 5 }} />}
                        useWindow={false}
                        key={0}
                    >
                        {
                            temp && temp?.topic.type === type &&
                            <div
                                style={{ background: '#667085' }}
                                className={'col-12 ' + styles.taskCard} key={-1} >
                                <div
                                    onClick={() => HandleSelect({ id: temp.topic.id, body: temp.topic.body, type: temp.topic.type }, temp.essay)}
                                    className={styles.taskCardTitle}>
                                    <h5>{temp.topic.body}</h5>
                                    {/* <span>
                                        {new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(item.createdAt))) + ' ' + new Date(item.createdAt).getDate()}
                                    </span> */}
                                </div>
                                <div className={styles.taskCardScore}>
                                    {/* {item.overallBandScore} */}
                                    <AiOutlineDelete className={styles.deleteIcon}
                                        onClick={() => {
                                            setOpen(true);
                                            // changeSelectedId(item.id);
                                        }} />
                                </div>
                            </div>
                        }
                        {
                            Topics.map((item: any, index: any) =>
                                item.type === type &&
                                <div
                                    style={item.id === selectedTopic?.id ? { background: '#172E4A' } : {}}
                                    className={'col-12 ' + styles.taskCard} key={index} >
                                    <div
                                        onClick={() => {
                                            HandleSelect({ id: item.id, body: item.topic, type: item.type },'');
                                            SetTempEssay();
                                        }}
                                        className={styles.taskCardTitle}>
                                        <h5>{item.shortName}</h5>
                                        <span>
                                            {new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(item.createdAt))) + ' ' + new Date(item.createdAt).getDate()}
                                        </span>
                                    </div>
                                    <div className={styles.taskCardScore}>
                                        {item.overallBandScore}
                                        <AiOutlineDelete className={styles.deleteIcon}
                                            onClick={() => {
                                                setOpen(true);
                                                changeSelectedId(item.id);
                                            }} />
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

export default TopicsList;