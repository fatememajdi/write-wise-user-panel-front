import React from 'react';

//------------------------------------------styles
import styles from './essay.module.css';

interface chooseTypeProps {
    changeType: any
}

const types = [
    {
        label: 'Gen Task 1',
        value: 'general_task_1'
    },
    {
        label: 'Ac Task 1',
        value: 'academic_task_1'
    },
    {
        label: 'Task 2',
        value: 'general_task_2'
    },
]

const ChooseType: React.FC<chooseTypeProps> = ({ changeType }) => {

    return <div className={'col-12 ' + styles.chooseTypeContainer}>
        <div className={styles.chooseTypeTitle}>
            Choose your essay type:
        </div>
        <div className={styles.typesContainer}>
            {types.map((item, index) =>
                <div
                    onClick={() => changeType(item.value)}
                    className={styles.typeCard}
                    key={index}>{item.label}</div>
            )}
        </div>
    </div>;
};

export default ChooseType;