/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroller';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------components
const Loading = dynamic(() => import("@/components/loading/loading"));
const TableCol = dynamic(() => import("@/components/walletTableCol/walletTableCol"));

//---------------------------------------------------types
import { Transaction } from "../../../types/transaction";

type _props = {
    tableLoading: boolean,
    GetTransactionsHistory: any,
    moreTransaction: boolean,
    transactions: Transaction[],
    RecieptLink: any,
    RegeneratePaymentLink: any
};

export default function PaymentHistoryTable({ tableLoading, GetTransactionsHistory, moreTransaction, transactions, RecieptLink, RegeneratePaymentLink }: _props) {
    return <table style={{ width: '100%' }}>
        <tbody className={styles.transactionTable}>
            <tr className={styles.tabaleTitleCard}>
                <th>Receipt No.</th>
                <th>Date & Time</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Token</th>
                <th>Status</th>
                <th>Description</th>
            </tr>
            <tr className={'col-12 ' + styles.tableContent}>
                <th className={styles.tableContentRow}>
                    {
                        tableLoading ?
                            <Loading style={{ height: 300, minHeight: 300 }} />
                            :
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={() => GetTransactionsHistory(true)}
                                hasMore={moreTransaction}
                                loader={<Loading style={{ height: 50, minHeight: 0, marginTop: 5 }} key={1} />}
                                useWindow={false}
                                key={0}
                            >
                                {
                                    transactions.map((item, index) =>
                                        <TableCol key={index} transaction={item} RecieptLink={RecieptLink} RegeneratePaymentLink={RegeneratePaymentLink} status={true} />)
                                }
                            </InfiniteScroll>
                    }
                </th>
            </tr>
        </tbody>
    </table>
};