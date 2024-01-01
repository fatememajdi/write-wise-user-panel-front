import React from 'react';
import Typewriter from 'typewriter-effect';

//--------------------------------styles
import styles from './writer.module.css';

//--------------------------------components
import { SplitText } from '../Untitled';

type _props = {
    type: string,
    topic: string,
    changeEndTyping: any
};

export default function Writer({ type, topic, changeEndTyping }: _props) {
    return <div
        style={{ height: 209 }}
        className={styles.generatedWritingCard}>

        <Typewriter
            options={{
                delay: 0,
                wrapperClassName: styles.writerClassname,
                cursor: null
            }}
            onInit={(typewriter) => {
                JSON.stringify(SplitText(topic + '         ')).slice(1, JSON.stringify(topic + '         ').length + 1).split(/(\s)/).map((str: any, index: number) => {
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