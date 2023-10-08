/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";

//----------------------------------------css
import styles from './timer.module.css';

const Timer: React.FC<{ time: number }> = ({ time }) => {

    const [seconds, setSeconds] = React.useState<number>(time);

    React.useEffect(() => {
        if (seconds > 0) {
            setTimeout(() => setSeconds(seconds - 1), 1000);
        } else {
            setSeconds(0);
        }
    });


    return (
        <div className={styles.timerCard}>{Math.trunc(seconds / 60) < 10 ? '0' + Math.trunc(seconds / 60) : Math.trunc(seconds / 60)} : {seconds % 60 < 10 ? '0' + seconds % 60 : seconds % 60} </div>
    )
};

export default Timer;