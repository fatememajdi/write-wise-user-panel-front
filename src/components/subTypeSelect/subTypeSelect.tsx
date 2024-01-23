import React from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

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
    { title: 'Pie Chart', value: 'Pie Chart' },
    { title: 'Table', value: 'Table' },
    { title: 'Diagram', value: 'Diagram' },
];

const SubTypeSelect: React.FC<_props> = ({ defaultValue, setFieldValue, type }) => {
    return <Select
        renderValue={(selected) => {
            if (selected.length === 0) {
                if (defaultValue)
                    return <em className='not-italic'>{defaultValue}</em>;
                else
                    return <em className='not-italic'>Sub-type</em>;
            }

            return selected;
        }}
        defaultValue="Random"
        value={defaultValue}
        onChange={(e) => setFieldValue(e.target.value)}
        displayEmpty
        inputProps={{ 'aria-label': 'gender select' }}
        style={{ borderRadius: 8 }}
        className='rounded-[8px] border-[1px] border-seccondaryColor min-w-[170px] h-[42px] bg-seccondaryColor ml-auto mt-[25px] w-fit sm:h-[25px] sm:min-w-[86px] sm:mt-[20px] '
    >
        {
            type === 'general_task_1' ?
                GeneralTask1.map((item, index) =>
                    <MenuItem style={{ color: '#FFF' }} key={index} className='bg-grayColor m-0 sm:h-[27px] sm:py-0 sm:px-[8px] ' value={item.value}>{item.title}</MenuItem>)
                : type === 'general_task_2' ?
                    Task2.map((item, index) =>
                        <MenuItem style={{ color: '#FFF' }} key={index} className='bg-grayColor m-0 sm:h-[27px] sm:py-0 sm:px-[8px]' value={item.value}>{item.title}</MenuItem>)
                    :
                    AcademicTask1.map((item, index) =>
                        <MenuItem style={{ color: '#FFF' }} key={index} className='bg-grayColor m-0 sm:h-[27px] sm:py-0 sm:px-[8px]' value={item.value}>{item.title}</MenuItem>)
        }
    </Select>
};

export default SubTypeSelect;