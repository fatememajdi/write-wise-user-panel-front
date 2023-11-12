/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import { Popover } from 'antd';

//------------------------------------------styles 
import styles from './walletTableCol.module.css';

//------------------------------------------icons
import { PiPlusBold, PiMinus } from 'react-icons/pi';
import { MdSmsFailed } from 'react-icons/md';
import { BiSolidCheckCircle } from 'react-icons/bi';


//---------------------------------------------------types
import { Transaction } from "../../../types/transaction";

type _props = {
    transaction: Transaction,
    RecieptLink: any,
    RegeneratePaymentLink: any
};

const TableCol: React.FC<_props> = ({ transaction, RecieptLink, RegeneratePaymentLink }) => {
    return <div className={transaction.paymentStatus !== 'analysis' && transaction.paymentStatus !== 'expired' ? styles.transactionCard + ' ' + styles.positiveTransactionCard
        : transaction.paymentStatus === 'expired' ? styles.transactionCard + ' ' + styles.expierdTransactionCard
            : styles.transactionCard + ' ' + styles.negativeTransactionCard}>

        <span className={styles.tableItem + ' ' + styles.mobileStatusTitle}>{
            transaction.paymentStatus === 'success' ?
                <div className={styles.checkIconCardCard}><BiSolidCheckCircle /></div>
                : transaction.paymentStatus === 'waiting' ?
                    <div className={styles.plusCard}><PiPlusBold /></div>
                    : transaction.paymentStatus === 'faild' ?
                        <div className={styles.faildCard}><MdSmsFailed /></div>
                        :
                        <div className={transaction.paymentStatus === 'expired' ? styles.expiredCard
                            : styles.minusCard}><PiMinus /></div>

        }{transaction.paymentStatus}</span>

        <span className={styles.tableItem + ' ' + styles.mobileStatusTitle}>{transaction.amountPaidShow}</span>

        <div className={styles.mobileTableItem}>
            <span className={styles.tableItem}>
                {new Intl.DateTimeFormat('en-US', { month: "short" }).format((new Date(transaction.paidDate))).toUpperCase()
                    + ' ' + new Date(transaction.paidDate).getDate()
                    + ' ' + new Date(transaction.paidDate).getFullYear()}
            </span>
            <span className={styles.tableItem}>{transaction.tokenNumber + ' Tokens'}</span>
        </div>

        <span className={styles.tableItem + ' ' + styles.mobielTableButton}>
            {transaction.paymentStatus === 'success' ?
                <button onClick={() => RecieptLink(transaction.id)} className={styles.tableItemButton}>Receipt</button>
                : transaction.paymentStatus === 'waiting' ?
                    <button onClick={() => RegeneratePaymentLink(transaction.id)} className={styles.tableItemButton}>Continue</button>
                    : transaction.paymentStatus === 'faild' ?
                        <Popover placement="topLeft" content={'some text..'}> <button className={styles.tableItemButton}>Faild</button></Popover>
                        : transaction.paymentStatus !== 'expired' &&
                        <div className={styles.essayName}>short name of essay</div>


            }
        </span>
    </div>
};

export default TableCol;