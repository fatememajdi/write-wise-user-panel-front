import React from "react";

//--------------------------------styles 
import styles from './slider.module.css';

interface _props {
    value: number
    total: number
}

const Slider: React.FC<_props> = ({ value, total }) => {
    return <div className={styles.sliderCard}>
        <div className={styles.sliderProgress}>
            {value}
        </div>
    </div>
};

export default Slider;