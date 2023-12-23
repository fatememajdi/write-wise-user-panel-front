/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import { Popover } from 'antd';
import { useMediaQuery } from 'react-responsive';

//------------------------------------------styles 
import styles from './walletTableCol.module.css';

//---------------------------------------------------types
import { Transaction } from "../../../types/transaction";
import { CapitalStart } from "../Untitled";

type _props = {
    transaction: Transaction,
    RecieptLink: any,
    RegeneratePaymentLink: any,
    status: boolean
};

const TableCol: React.FC<_props> = ({ transaction, RecieptLink, RegeneratePaymentLink, status }) => {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });

    return <tr style={transaction.paymentStatus === 'fail' ? { borderBottom: 'solid 1px #AB1F23' } : { borderBottom: 'solid 1px rgba(114, 123, 139)' }}
        className={styles.transactionCard}>

        {
            status ?
                isMobile ?
                    <>
                        <div className={styles.mobileColContent}>
                            <tr className={styles.mobileColBoldText}>
                                <th style={transaction.paymentStatus === 'fail' ? { color: '#AB1F23' } : {}}>{CapitalStart(transaction.paymentStatus)}</th>
                                <th>{transaction.amountPaidShow}</th>
                                <th>{transaction.tokenNumber + 'Tokens'}</th>
                            </tr>
                            <tr className={styles.mobileColMediumText}>
                                <th>{transaction.shortId}</th>
                                <th>{new Intl.DateTimeFormat('en-US').format((new Date(transaction.paidDate))) + '-' + new Date(transaction.paidDate).getHours() + ':' + new Date(transaction.paidDate).getMinutes()}</th>
                                <th>{transaction.paymentMethod !== undefined ? transaction.paymentMethod : ''}</th>
                            </tr>
                        </div>

                        <th>
                            {transaction.paymentStatus === 'success' ?
                                <button onClick={() => RecieptLink(transaction.id)} className={styles.tableItemButton}>Receipt</button>
                                : transaction.paymentStatus === 'waiting' ?
                                    <button onClick={() => RegeneratePaymentLink(transaction.id)} className={styles.tableItemButton}>Continue</button>
                                    : transaction.paymentStatus === 'faild' ?
                                        <Popover placement="topLeft" content={'some text..'}> <button className={styles.tableItemButton}>More Info</button></Popover>
                                        : transaction.paymentStatus !== 'expired' &&
                                        <div className={styles.essayName}>{transaction.essayShortName}</div>


                            }
                        </th>
                    </>
                    :
                    <>
                        <th style={transaction.paymentStatus === 'fail' ? { color: '#AB1F23' } : {}}>{transaction.shortId}</th>
                        <th>{new Intl.DateTimeFormat('en-US').format((new Date(transaction.paidDate))) + '-' + new Date(transaction.paidDate).getHours() + ':' + new Date(transaction.paidDate).getMinutes()}</th>
                        <th>{transaction.paymentMethod !== undefined ? transaction.paymentMethod : ''}</th>
                        <th>{transaction.amountPaidShow}</th>
                        <th>{transaction.tokenNumber + ' Tokens'}</th>
                        <th style={transaction.paymentStatus === 'fail' ? { color: '#AB1F23' } : {}}>{CapitalStart(transaction.paymentStatus)}</th>

                        <th>
                            {transaction.paymentStatus === 'success' ?
                                <button onClick={() => RecieptLink(transaction.id)} className={styles.tableItemButton}>Download receipt</button>
                                : transaction.paymentStatus === 'waiting' ?
                                    <button onClick={() => RegeneratePaymentLink(transaction.id)} className={styles.tableItemButton}>Continue</button>
                                    : transaction.paymentStatus === 'faild' ?
                                        <Popover placement="topLeft" content={'some text..'}> <button className={styles.tableItemButton}>More Info</button></Popover>
                                        : transaction.paymentStatus !== 'expired' &&
                                        <div className={styles.essayName}>short name of essay</div>


                            }
                        </th>
                    </>
                : isMobile ?
                    <>
                        <div className={styles.mobileColContent}>
                            <tr className={styles.mobileColBoldText}>
                                <th>{transaction.taskType}</th>
                                <th>{transaction.tokenNumber + 'Tokens'}</th>
                            </tr>
                            <tr className={styles.mobileColMediumText}>
                                <th>{transaction.shortId}</th>
                                <th>{new Intl.DateTimeFormat('en-US').format((new Date(transaction.paidDate))) + '-' + new Date(transaction.paidDate).getHours() + ':' + new Date(transaction.paidDate).getMinutes()}</th>
                            </tr>
                        </div>
                    </>
                    :
                    <>
                        <th style={transaction.paymentStatus === 'fail' ? { color: '#AB1F23' } : {}}>{transaction.shortId}</th>
                        <th>{new Intl.DateTimeFormat('en-US').format((new Date(transaction.paidDate))) + '-' + new Date(transaction.paidDate).getHours() + ':' + new Date(transaction.paidDate).getMinutes()}</th>
                        <th>{transaction.taskType}</th>
                        <th>{transaction.tokenNumber}{transaction.tokenNumber === 1 ? ' Token' : ' Tokens'}</th>
                    </>
        }
    </tr>
};

export default TableCol;