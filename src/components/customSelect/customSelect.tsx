'use client';
import React from 'react';

//------------------------------------------------------styles
import styles from './customSelect.module.css';
import './animation.css';

//------------------------------------------------------icons
import { IoMdArrowDropdown, IoMdLock } from 'react-icons/io';

interface value {
    title: string
    active: boolean
    lock: boolean
}

interface _props {
    values: value[]
    selectedItem: number
    className?: string
    onChange?: any
}

const SelectComponent: React.FC<_props> = ({ values, selectedItem, className, onChange }) => {

    const [open, setOpen] = React.useState<boolean>(false);
    function myFunction() {
        document.getElementById("list-roll-down")?.classList.toggle("is-active");
    }

    return <div className={'col-12 ' + styles.selectContainer + ' ' + className}>
        <div
            className={'col-12 ' + styles.selectTitle}
            onClick={() => setOpen(!open)}
        >{values[selectedItem].title} <IoMdArrowDropdown style={{ fontSize: 30 }} /></div>
        {open &&
            <div
                // id="list-roll-down"
                className={styles.selectItemsContainer}
            >
                {values.map((item, index) => {
                    if (selectedItem != index)
                        return <div
                            onClick={() => {
                                if (item.active)
                                    onChange(index)
                                setOpen(false);
                            }}
                            style={!item.active ? { opacity: 0.5 } : {}} className={styles.selectItemCard}>
                            {item.title}
                            {
                                item.lock && <span><IoMdLock fontSize={18} /></span>
                            }
                        </div>
                })}
            </div>
        }
    </div >
};

export default SelectComponent;