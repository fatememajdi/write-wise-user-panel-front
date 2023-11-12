/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import dynamic from 'next/dynamic';
import ReactLoading from 'react-loading';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { AiOutlineClose } from 'react-icons/ai';

//------------------------------------------components
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"));

//---------------------------------------------------types
import { Currency } from "../../../types/currency";
import { Package } from "../../../types/package";

type _modalFirstStepProps = {
    currencies: Currency[],
    currencyCode: string,
    changeCurrencyCode: any,
    GetPackage: any,
    handleCancel: any,
    loading: boolean,
    packages: Package[],
    changeModalStep: any
};

const ModalFirstStep: React.FC<_modalFirstStepProps> = ({ currencies, currencyCode, changeCurrencyCode,
    GetPackage, handleCancel, loading, packages, changeModalStep }) => {

    const isMac = typeof window !== 'undefined' ? navigator.platform.toUpperCase().indexOf("MAC") >= 0 : false;

    return <div className={'col-12 ' + styles.modalCard}>
        <div className={'col-12 ' + styles.modalTopContainer}>
            <Select
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>{currencies.length > 0 ? isMac ? currencies[0].icon + ' ' + currencies[0].name : currencies[0].name
                            : <ReactLoading className={styles.loading} type={'bubbles'} color={'#FFF'} height={30} width={30} />}</em>;
                    }

                    return currencies.find(item => item.code === selected).icon + ' ' + currencies.find(item => item.code === selected).name;
                }}
                defaultValue="select currency"
                value={currencyCode}
                onChange={(e) => {
                    changeCurrencyCode(e.target.value);
                    GetPackage(e.target.value);
                }}
                displayEmpty
                inputProps={{ 'aria-label': 'gender select' }}
                className={styles.select}
            >
                {
                    currencies.map((item: Currency, index: number) =>
                        <MenuItem key={index} className={styles.selectItem} value={item.code}>{isMac ? item.icon + ' ' + item.name : item.name}</MenuItem>)
                }

            </Select>
            <AiOutlineClose
                onClick={() => handleCancel()}
                className={styles.closeModalButton} />
        </div>
        <div className={'col-12 ' + styles.packagesContainer}>

            {
                loading && currencies.length === 0 ?
                    <ReactLoading className={styles.loading} type={'spin'} color={'#FFF'} height={50} width={50} />
                    :
                    <>
                        {packages.map((item: Package, index: number) => <div
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={() => changeModalStep(item)}>
                            <PackageCard loading={loading} pack={item} key={index} />
                        </div>)}
                    </>
            }
        </div>
    </div>
};

export default ModalFirstStep;