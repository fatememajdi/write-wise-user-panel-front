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
    const [refreshLoading, changeRefreshLoading] = React.useState<boolean>(false);

    return <div className={styles.sliderCard}>
        <CircularSlider
            r={107}
            trackWidth={5}
            trackColor={'rgba(98, 110, 126, 0.32)'}
            thumbWidth={0}
            thumbColor={'rgba(98, 110, 126, 0.32)'}
            arcColor={'#FFF'}
            value={value ? (100 / total) * value : 0}
        // onChange={(value: any) => console.log(value)}
        />
        <div className={styles.sliderProgress}>{!value && refreshLoading ? <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />
            : value && value !== -1 ? <span>{value}</span>
                : value === -1 ? <div style={{ marginLeft: 8, fontSize: 18, color: '#12263E', cursor: 'pointer' }}
                    onClick={async () => {
                        changeRefreshLoading(true);
                        changeRefreshLoading(false);
                    }}>reload!</div>
                    : <ReactLoading type={'bubbles'} color={'#929391'} height={50} width={50} />}</div>
    </div>
};

export default Slider;