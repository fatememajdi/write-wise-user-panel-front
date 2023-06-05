import React from 'react';
import Image from "next/image";

//-------------------------------------------------------styles
import '../../styles/headerWithTitle.module.css';

//-------------------------------------------------------images

//-------------------------------------------------------props
interface _props {
    title: string
}

const HeaderWithTitle: React.FC<_props> = ({ title }) => {
    return (
        <div className='col-12 header-container'>

            <div className='logo-card'>
                <Image
                    src="/logo.svg"
                    alt="Next.js Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>

        </div>
    );
};

export default HeaderWithTitle;