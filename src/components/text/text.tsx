import React from "react";

const Text: React.FC<{ text: any }> = ({ text }) => {
    return (
        text.split(/[\r\n]/gm).map((item: any, index: any) =>
            <div style={{lineHeight:1.5}} key={index}>{item}</div>
        )
    )
};

export default Text