import React from 'react';

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

    return <div className='col-12 flex flex-1 flex-col items-center justify-center not-italic leading-normal '>
        <div className=' text-blackText items-center text-[24px] font-medium mac:text-[20px] sm:text-[13px] '>
            Choose your writing task type:
        </div>
        <div className='flex flex-row mt-[44px] sm:mt-[33px] '>
            {types.map((item, index) =>
                <button
                    aria-label='choose type button'
                    onClick={() => changeType(item.value)}
                    className='w-[160px] h-[45px] text-whiteText text-center text-[20px] font-medium my-0 mx-[4px] bg-grayColor hover:bg-primaryColor mac:text-[16px] mac:w-[132px] mac:h-[40px] sm:text-[13px] sm:w-[88px] sm:h-[32px] '
                    key={index}>{item.label}</button>
            )}
        </div>
    </div>
};