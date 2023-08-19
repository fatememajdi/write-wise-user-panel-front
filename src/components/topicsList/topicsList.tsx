import React from "react";
import dynamic from "next/dynamic";
import InfiniteScroll from 'react-infinite-scroller';

//-------------------------------------------styles
import styles from './topicsList.module.css';

//-------------------------------------------types
import { Topic } from "../../../types/topic";

//-------------------------------------------components
const Loading = dynamic(() => import("@/components/loading/loading"));
const DialogComponent = dynamic(() => import("../dialog/dialog"))

//-------------------------------------------icons
import { Empty } from "antd";
import { AiOutlineDelete } from "react-icons/ai";

interface _props {
    Topics: Topic[],
    HandleSelect: any,
    GetTopicsList: any,
    MoreTopics: boolean,
    HandleDelete: any,
    type: string
};

const TopicsList: React.FC<_props> = ({ Topics, HandleSelect, GetTopicsList, MoreTopics, HandleDelete, type }) => {
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
    }

    return <div className={'col-12 ' + styles.tasksContainer}>
        {
            loading ?
                <Loading style={{ height: '100%', minHeight: 0 }} />
                : Topics.length === 0 ?
                    <Empty description={false} style={{ marginTop: '50%' }} />
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
                            Topics.map((item: any, index: any) =>
                                item.type === type &&
                                <div
                                    className={'col-12 ' + styles.taskCard} key={index} >
                                    <div
                                        onClick={() => HandleSelect({ id: item.id, body: item.topic })}
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