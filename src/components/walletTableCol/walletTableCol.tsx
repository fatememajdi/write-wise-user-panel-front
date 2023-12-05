/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import { Popover } from 'antd';

//------------------------------------------styles 
import styles from './walletTableCol.module.css';

//------------------------------------------icons
// import { PiPlusBold, PiMinus } from 'react-icons/pi';
// import { MdSmsFailed } from 'react-icons/md';
// import { BiSolidCheckCircle } from 'react-icons/bi';


//---------------------------------------------------types
import { Transaction } from "../../../types/transaction";

type _props = {
    transaction: Transaction,
    RecieptLink: any,
    RegeneratePaymentLink: any,
    status: boolean
};

const TableCol: React.FC<_props> = ({ transaction, RecieptLink, RegeneratePaymentLink, status }) => {
    return <tr className={styles.transactionCard}>

        {
            status ?
                <>
                    <th>{transaction.shortId}</th>
                    <th>{new Intl.DateTimeFormat('en-US').format((new Date(transaction.paidDate))) + '-' + new Date(transaction.paidDate).getHours() + ':' + new Date(transaction.paidDate).getMinutes()}</th>
                    <th>{transaction.paymentMethod !== undefined ? transaction.paymentMethod : ''}</th>
                    <th>{transaction.amountPaidShow}</th>
                    <th>{transaction.tokenNumber + ' Tokens'}</th>
                    <th>{transaction.paymentStatus}</th>

                    <th>
                        {transaction.paymentStatus === 'success' ?
                            <button onClick={() => RecieptLink(transaction.id)} className={styles.tableItemButton}>Download receipt</button>
                            : transaction.paymentStatus === 'waiting' ?
                                <button onClick={() => RegeneratePaymentLink(transaction.id)} className={styles.tableItemButton}>Continue</button>
                                : transaction.paymentStatus === 'faild' ?
                                    <Popover placement="topLeft" content={'some text..'}> <button className={styles.tableItemButton}>Faild</button></Popover>
                                    : transaction.paymentStatus !== 'expired' &&
                                    <div className={styles.essayName}>short name of essay</div>


                        }
                    </th>
                </> :
                <>
                    <th>{transaction.shortId}</th>
                    <th>{new Intl.DateTimeFormat('en-US').format((new Date(transaction.paidDate))) + '-' + new Date(transaction.paidDate).getHours() + ':' + new Date(transaction.paidDate).getMinutes()}</th>
                    <th>{transaction.taskType}</th>
                    <th>{transaction.tokenNumber}{transaction.tokenNumber === 1 ? ' Token' : ' Tokens'}</th>
                </>
        }
    </tr>
};

export default TableCol;