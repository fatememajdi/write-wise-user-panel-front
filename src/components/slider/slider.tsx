import React from "react";
import CircularSlider from 'react-circular-slider-bar';

//--------------------------------styles 
import styles from './slider.module.css';

interface _props {
    value: number
    total: number
}

const Slider: React.FC<_props> = ({ value, total }) => {
    return <div className={styles.sliderCard}>
        <CircularSlider
            r={80}
            trackWidth={5}
            trackColor={'#2E4057'}
            thumbWidth={0}
            thumbColor={'#2E4057'}
            arcColor={'#FFF'}
            value={(100 / total) * value}
            // onChange={(value: any) => console.log(value)}
        />
        <div className={styles.sliderProgress}>{value}</div>
    </div>
};

export default Slider;