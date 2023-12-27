import React, { lazy } from "react";
import ReactLoading from 'react-loading';
import { AnimatePresence, motion } from 'framer-motion';

//--------------------------------styles 
import styles from './essayProcessBar.module.css';

//--------------------------------componnets
const Timer = lazy(() => import("@/components/timer/timer"));

type _props = {
    changeInput: boolean,
    type: string,
    loading: boolean,
    error: boolean,
    disable: boolean
};

const EssayProcessBar: React.FC<_props> = ({ changeInput, type, loading, error, disable }) => {
    const showAnimation = {
        hidden: {
            width: '100%',
            transition: {
                duration: 0.5,
            }
        },
        show: {
            width: 0,
            transition: {
                duration: type === 'general_task_2' ? 2400 : 1200,
            }
        }
    };

    return <AnimatePresence>
        <div style={error ? { backgroundColor: '#DA282E', background: '#DA282E', opacity: disable ? 0.5 : 1 } : { opacity: disable ? 0.5 : 1 }} className={styles.scoreButtonContainer}>
            {
                changeInput &&
                <div className={styles.timer}>
                    <Timer time={type === 'general_task_2' ? 2400 : 1200} />
                </div>
            }
            {
                loading ?
                    <div style={{ zIndex: 10 }}>
                        <ReactLoading type={'spin'} color={'#FFF'} height={30} width={30} />
                    </div>
                    :
                    <button
                        disabled={disable}
                        style={error ? { color: '#DA282E', borderColor: '#DA282E' } : {}}
                        type="submit"
                        className={styles.scoreButton}>
                        <div>
                            Score
                        </div>
                    </button>
            }
            <motion.div
                animate={{ width: changeInput ? 0 : '100%' }}
                transition={{ duration: type === 'general_task_2' ? 2400 : 1200 }}
                variants={showAnimation}
                initial='hidden'
                exit='hidden'
                style={error ? { backgroundColor: '#DA282E' } : {}}
                className={styles.prossessBar}></motion.div>
        </div>
    </AnimatePresence>
};

export default EssayProcessBar;