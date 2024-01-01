import React from 'react';

//------------------------------------------styles
import styles from './chooseType.module.css';

type chooseTypeProps = {
    changeType: any
};

const types = [
    {
        label: 'GT Task 1',
        value: 'general_task_1'
    },
    {
        label: 'AC Task 1',
        value: 'academic_task_1'
    },
    {
        label: 'Task 2',
        value: 'general_task_2'
    },
];

export default function Page({ changeType }: chooseTypeProps) {

    return <div className={'col-12 ' + styles.chooseTypeContainer}>
        <div className={styles.chooseTypeTitle}>
            Choose your writing task type:
        </div>
        <div className={styles.typesContainer}>
            {types.map((item, index) =>
                <button
                    aria-label='choose type button'
                    onClick={() => changeType(item.value)}
                    className={styles.typeCard}
                    key={index}>{item.label}</button>
            )}
        </div>
    </div>
};