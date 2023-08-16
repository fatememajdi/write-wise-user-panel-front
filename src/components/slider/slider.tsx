import React from "react";
import ReactLoading from 'react-loading';
import CircularSlider from 'react-circular-slider-bar';

//--------------------------------styles 
import styles from './slider.module.css';

interface _props {
    value?: number
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
            value={value ? (100 / total) * value : 0}
        // onChange={(value: any) => console.log(value)}
        />
        <div className={styles.sliderProgress}>{value && value !== -1 ? value : <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}</div>
    </div>
};

export default Slider;