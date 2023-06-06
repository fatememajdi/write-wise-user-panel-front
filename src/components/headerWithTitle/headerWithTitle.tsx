import React from 'react';
import Image from "next/image";

//-------------------------------------------------------styles
import styles from '../../styles/headerWithTitle.module.css';

//-------------------------------------------------------images

//-------------------------------------------------------props
interface _props {
    title: string
}

const HeaderWithTitle: React.FC<_props> = ({ title }) => {
    return (
        <div className={'col-12 ' + styles.headerContainer}>

            <div className={styles.logoCard}>
                <Image
                    src="/logo.svg"
                    alt="Logo"
                    width={180}
                    height={37}
                    priority
                />
            </div>

            <div className={styles.title}>
                {title}
            </div>

            <div className={styles.profileCard}>
                <Image
                    className={styles.helpIcon}
                    src="/help.svg"
                    alt="Help Icon"
                    width={50}
                    height={50}
                    priority
                />
                {" profile"}
            </div>

        </div>
    );
};

export default HeaderWithTitle;