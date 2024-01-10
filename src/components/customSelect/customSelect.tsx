'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

//------------------------------------------------------icons
import { TiArrowSortedDown } from 'react-icons/ti';


interface value {
    title: string
    active: boolean
};

interface _props {
    values: value[]
    selectedItem: number
    className?: string
    onChange?: any
};

export default function SelectComponent({ values, selectedItem, className, onChange }: _props) {

    const [open, setOpen] = React.useState<boolean>(false);

    return <AnimatePresence>
        <div className={'col-12 h-fit relative z-[3] ' + className}>
            <div
                style={open ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}}
                className='col-12 bg-seccondaryColor h-[40px] flex flex-row items-center justify-between rounded-[8px] px-[11px] text-whiteText text-[16px] font-medium leading-normal underline sm:text-[13px] '
                onClick={() => setOpen(!open)}
            >{values[selectedItem].title}

                <motion.div
                    animate={open ? { transform: 'rotate(180deg)' } : {}}
                    transition={{ type: "spring", duration: 0.5 }}
                >
                    <TiArrowSortedDown fontSize={25}
                        onClick={() => setOpen(!open)} />
                </motion.div>

            </div>

            <motion.div
                style={{ opacity: 0 }}
                animate={{ height: open ? 'fit-content' : 0, opacity: open ? 1 : 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className='bg-seccondaryColor rounded-b-[8px] w-full overflow-hidden text-whiteText absolute top-[40px] right-0 left-0 z-[2] '
            >
                {values.map((item, index) => {
                    if (selectedItem != index)
                        return <div
                            key={index}
                            onClick={() => {
                                if (item.active)
                                    onChange(index)
                                setOpen(false);
                            }}
                            style={!item.active ? { opacity: 0.5 } : {}}
                            className='p-[11px] text-whiteText text-[13px] font-medium leading-normal border-b-[1px] border-b-grayColor flex flex-row '>
                            {item.title}
                        </div>
                })}
            </motion.div>
        </div>
    </AnimatePresence>
};