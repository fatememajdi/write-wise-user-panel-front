/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import ReactLoading from 'react-loading';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { AiOutlineClose } from 'react-icons/ai';

//------------------------------------------components
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"));

//---------------------------------------------------types
import { Package } from "../../../types/package";

type _modalFirstStepProps = {
    handleCancel: any,
    loading: boolean,
    packages: Package[],
    changeModalStep: any
};

const ModalFirstStep: React.FC<_modalFirstStepProps> = ({  handleCancel, loading, packages, changeModalStep }) => {

    const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false;
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    return <div className={'col-12 ' + styles.modalCard}>
        <div className={'col-12 ' + styles.modalTopContainer}>
            <AiOutlineClose
                onClick={() => handleCancel()}
                className={styles.closeModalButton} />
        </div>
        <div className={'col-12 ' + styles.packagesContainer}>

            {
                loading && packages.length === 0 ?
                    <ReactLoading className={styles.loading} type={'spin'} color={'#FFF'} height={50} width={50} />
                    :
                    <>
                        {packages.map((item: Package, index: number) => <div
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={() => changeModalStep(item)}>
                            <PackageCard loading={loading} pack={item} key={index} style={isMobile && { width: 298, marginBottom: 13 }} />
                        </div>)}
                    </>
            }
        </div>
    </div>
};

export default ModalFirstStep;