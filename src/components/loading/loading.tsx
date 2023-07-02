import React from "react";
import ReactLoading from 'react-loading';

//--------------------------------styles
import styles from './loading.module.css';

const Loading: React.FC = () =>
    <div className={'col-12 ' + styles.loading}>
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} />
    </div>

export default Loading;