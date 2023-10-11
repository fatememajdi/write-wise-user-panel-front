import React from 'react';
import Typewriter from 'typewriter-effect';

//--------------------------------styles
import styles from '../../styles/task.module.css';

//--------------------------------components
import { SplitText } from '../Untitled';

type _props = {
    type: string,
    topic: string,
    changeEndTyping: any
}

const Writer: React.FC<_props> = ({ type, topic, changeEndTyping }) => {
    return <div
        style={{ height: type === 'general_task_1' ? 250 : type === 'general_task_2' ? 200 : 115 }}
        className={styles.generatedWritingCard}>
        <Typewriter
            options={{
                delay: 0,
                wrapperClassName: styles.writerClassname,
                cursor: ' '
            }}
            onInit={(typewriter) => {
                JSON.stringify(SplitText(topic)).slice(1, JSON.stringify(topic).length - 1).split(/(\s)/).map((str: any, index: number) => {
                    if (index % 10 !== 0) {
                        typewriter.typeString(str)
                            .pauseFor(100);
                    } else {
                        typewriter.typeString(str)
                            .pauseFor(1000);
                    }
                    typewriter.start();
                });
                typewriter.callFunction(() => {
                    changeEndTyping(true);
                })
            }}

        />

    </div>
};

export default Writer;