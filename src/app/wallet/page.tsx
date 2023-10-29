'use client';
import React from "react";
import { Modal } from 'antd';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import client from '@/config/applloAuthorizedClient';
import dynamic from 'next/dynamic';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { PiPlusBold, PiMinus } from 'react-icons/pi';

//------------------------------------------components
import { StopLoader } from "@/components/Untitled";
import { GET_CURRENCIES, GET_PACKAGES } from "@/config/graphql";
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"));

//---------------------------------------------------types
import { Currency } from "../../../types/currency";
import { Package } from "../../../types/package";

const transactions = [
    { status: 'Forem', amount: '$12', date: 'JAN18 2023', description: ' By Visa cart' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
    { status: 'Forem', amount: '$12', date: 'JAN18 2023', description: ' By Visa cart' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
    { status: 'Forem', amount: '$12', date: 'JAN18 2023', description: ' By Visa cart' },
    { status: 'Analysis', amount: '$12', date: 'JAN18 2023', description: 'short name of essay' },
];

const Wallet: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [currencyCode, changeCurrencyCode] = React.useState<string>('');
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);

    async function GetPackage(code: string) {
        setLoading(true);
        await client.query({
            query: GET_PACKAGES,
            fetchPolicy: "no-cache",
            variables: {
                currency: code.toLowerCase()
            }
        }).then((res) => {
            setPackages(res.data.getPackages);
            setLoading(false);
        })
    };

    async function GetCurrencies() {
        await client.query({
            query: GET_CURRENCIES,
            fetchPolicy: "no-cache",
        }).then((res) => {
            setCurrencies(res.data.getCurrencies);
            GetPackage(res.data.getCurrencies[0].code);
        })
    };
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);

    React.useEffect(() => {
        StopLoader();
    }, []);

    return <div className={styles.walletContainer}>
        <div className={styles.title}>wallet balance</div>
        <div className={styles.tokenCard}>
            7 Tokens
            <span>7 token equal 4 essay</span>
            <button
                onClick={() => showModal()}
                className={styles.addTokenButton}>
                <PiPlusBold className={styles.plusIcon} />
            </button>
        </div>
        <div className={styles.transactionTable}>
            <div className={styles.tabaleTitleCard}>
                <span className={'col-lg-3 '}>Status</span>
                <span className={'col-lg-3 '}>Amount</span>
                <span className={'col-lg-3 '}>Date</span>
                <span className={'col-lg-3 '}>Description</span>
            </div>

            <div className={'col-12 ' + styles.tableContent}>
                {
                    transactions.map((item, index) => <div key={index} className={item.status === 'Forem' ? styles.transactionCard + ' ' + styles.positiveTransactionCard
                        : styles.transactionCard + ' ' + styles.negativeTransactionCard}>
                        <span className={'col-lg-3 '}>{
                            item.status === 'Forem' ?
                                <div className={styles.plusCard}><PiPlusBold /></div>
                                :
                                <div className={styles.minusCard}><PiMinus /></div>
                        }{item.status}</span>
                        <span className={'col-lg-3 '}>{item.amount}</span>
                        <span className={'col-lg-3 '}>{item.date}</span>
                        <span className={'col-lg-3 '}>{item.description}</span>
                    </div>)
                }
            </div>
        </div>

        <Modal
            centered
            footer={null}
            open={isModalOpen}
            onCancel={handleCancel}
            width={1700}
        >
            <div className={'col-12 ' + styles.modalCard}>s</div>
        </Modal>

    </div>
};

export default Wallet;