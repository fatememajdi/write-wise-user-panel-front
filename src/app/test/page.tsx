'use client';
import React from "react";
import { motion } from 'framer-motion';
import styles from './test.module.css';

const Test: React.FC = () => {
    const [isOpen, setIsOpen] = React.useState<boolean>(true);
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <motion.div animate={{
                width: isOpen ? '380px' : '83px', transition: {
                    duration: 0.5,
                    type: 'spring',
                    damping: 15
                }
            }} className={styles.sideBard}>
                <div onClick={() => setIsOpen(!isOpen)}>open drawer</div>

            </motion.div>
            <main style={{ color: 'red' }}>
                hii
            </main>
        </div>
    )
};

export default Test;