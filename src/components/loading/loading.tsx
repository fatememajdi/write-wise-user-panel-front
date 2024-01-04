import React from "react";
import ReactLoading from 'react-loading';

const Loading: React.FC<{ style?: any }> = ({ style }) =>
    <div
        role="status"
        style={{ ...style }}
        className="col-12 m-auto flex justify-center self-center items-center h-screen">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} />
    </div>

export default Loading;