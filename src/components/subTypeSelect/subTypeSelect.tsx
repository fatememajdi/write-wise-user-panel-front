import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

//-----------------------------------------styles
import styles from '../../styles/task.module.css';

type _props = {
    type: string,
    defaultValue: string,
    setFieldValue: any
};

const GeneralTask1 = [
    { title: 'Random', value: '' },
    { title: 'Informal', value: 'Informal' },
    { title: 'Semi-formal', value: 'Semi-formal' },
    { title: 'Formal', value: 'Formal' }
];

const Task2 = [
    { title: 'Random', value: '' },
    { title: 'Opinion', value: 'Opinion' },
    { title: 'Discussion', value: 'Discussion' },
    { title: 'Problem solution', value: 'Problem solution' },
    { title: 'Advantage/disadvantage', value: 'Advantage/disadvantage' },
    { title: 'Two-part/mixed', value: 'Mixed' }
];

const AcademicTask1 = [
    { title: 'Random', value: '' },
    { title: 'Bar Chart', value: 'Bar Chart' },
    { title: 'Line Graph', value: 'Line Graph' },
    { title: 'Table', value: 'Table' },
    { title: 'Pie Chart', value: 'Pie Chart' },
    { title: 'Process Diagram', value: 'Process Diagram' },
    { title: 'Map', value: 'Map' },
    { title: 'Multiple Graphs', value: 'Multiple Graphs' }
];

const SubTypeSelect: React.FC<_props> = ({ defaultValue, setFieldValue, type }) => {
    return <Select
        renderValue={(selected) => {
            if (selected.length === 0) {
                if (defaultValue)
                    return <em>{defaultValue}</em>;
                else
                    return <em>Sub-type</em>;
            }

            return selected;
        }}
        defaultValue="Random"
        value={defaultValue}
        onChange={(e) => setFieldValue('subType', e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'gender select' }}
        className={styles.select}
    >
        {
            type === 'general_task_1' ?
                GeneralTask1.map((item, index) => <MenuItem key={index} className={styles.selectMenuItem} value={item.value}>{item.title}</MenuItem>)
                : type === 'general_task_2' ?
                    Task2.map((item, index) => <MenuItem key={index} className={styles.selectMenuItem} value={item.value}>{item.title}</MenuItem>)
                    :
                    AcademicTask1.map((item, index) => <MenuItem key={index} className={styles.selectMenuItem} value={item.value}>{item.title}</MenuItem>)
        }
    </Select>
};

export default SubTypeSelect;