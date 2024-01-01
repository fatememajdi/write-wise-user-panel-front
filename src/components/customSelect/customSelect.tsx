'use client';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

//------------------------------------------------------styles
import styles from './customSelect.module.css';
import './animation.css';

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
        <div className={'col-12 ' + styles.selectContainer + ' ' + className}>
            <div
                style={open ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}}
                className={'col-12 ' + styles.selectTitle}
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
                className={styles.selectItemsContainer}
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
                            style={!item.active ? { opacity: 0.5 } : {}} className={styles.selectItemCard}>
                            {item.title}
                        </div>
                })}
            </motion.div>
        </div>
    </AnimatePresence>
};