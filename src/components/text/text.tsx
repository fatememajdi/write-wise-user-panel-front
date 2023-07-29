import React from "react";

const Text: React.FC<{ text: any }> = ({ text }) => {
    return (
        text.split(/[\r\n]/gm).map((item: any, index: any) =>
            <span key={index}>
                {item}
                <br />
            </span>
        )
    )
};

export default Text