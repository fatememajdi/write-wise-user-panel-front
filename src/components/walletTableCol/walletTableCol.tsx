/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import { Popover } from 'antd';

//------------------------------------------styles 
import styles from './walletTableCol.module.css';

//------------------------------------------icons
import { PiPlusBold, PiMinus } from 'react-icons/pi';
import { MdSmsFailed } from 'react-icons/md';

//---------------------------------------------------types
import { Transaction } from "../../../types/transaction";

type _props = {
    transaction: Transaction,
    RecieptLink: any,
    RegeneratePaymentLink: any
};

const TableCol: React.FC<_props> = ({ transaction, RecieptLink, RegeneratePaymentLink }) => {
    return <div className={transaction.paymentStatus !== 'analysis' ? styles.transactionCard + ' ' + styles.positiveTransactionCard
        : styles.transactionCard + ' ' + styles.negativeTransactionCard}>
        <span className={styles.tableItem}>{
            transaction.paymentStatus === 'success' || transaction.paymentStatus === 'waiting' ?
                <div className={styles.plusCard}><PiPlusBold /></div>
                : transaction.paymentStatus === 'analysis' ?
                    <div className={styles.minusCard}><PiMinus /></div>
                    : <div className={styles.faildCard}><MdSmsFailed /></div>
        }{transaction.paymentStatus}</span>
        <span className={styles.tableItem}>{transaction.amountPaidShow}</span>
        <span className={styles.tableItem}>
            {new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(transaction.paidDate))).toUpperCase()
                + new Date(transaction.paidDate).getDate()
                + ' ' + new Date(transaction.paidDate).getFullYear()}
        </span>
        <span className={styles.tableItem}>{transaction.tokenNumber + ' Tokens'}</span>
        <span className={styles.tableItem}>
            {transaction.paymentStatus === 'success' ?
                <button onClick={() => RecieptLink(transaction.id)} className={styles.tableItemButton}>Receipt</button>
                : transaction.paymentStatus === 'waiting' ?
                    <button onClick={() => RegeneratePaymentLink(transaction.id)} className={styles.tableItemButton}>Continue</button>
                    : transaction.paymentStatus === 'expired' ?
                        <Popover placement="topLeft" content={'some text..'}> <button className={styles.tableItemButton}>Faild</button></Popover>
                        : <div className={styles.essayName}>short name of essay</div>


            }
        </span>
    </div>
};

export default TableCol;