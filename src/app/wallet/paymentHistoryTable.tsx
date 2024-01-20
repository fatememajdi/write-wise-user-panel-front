/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import dynamic from 'next/dynamic';
import InfiniteScroll from 'react-infinite-scroller';
import ReactLoading from 'react-loading';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------components
const Loading = dynamic(() => import("@/components/loading/loading"), { ssr: false });
const TableCol = dynamic(() => import("@/components/walletTableCol/walletTableCol"),
    { ssr: false, loading: () => <div className=" min-h-[72px] col-12 items-center justify-center flex m-auto ml-auto "><ReactLoading type='bubbles' color={'#929391'} height={50} width={50} /></div> });

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
    return <table className="w-full">
        <tbody className={' rounded-[8px] backdrop:filter-[blur(17px)] h-[65%] flex flex-col w-full ' + styles.transactionTable}>
            <tr className='lg:flex mac:flex items-center text-grayColor text-[20px] font-medium leading-normal pt-0 pr-[65px] pb-[15px] pl-[65px] text-center sm:hidden '>
                <th className="flex-1">Receipt No.</th>
                <th className="flex-1">Date & Time</th>
                <th className="flex-1">Method</th>
                <th className="flex-1">Amount</th>
                <th className="flex-1">Token</th>
                <th className="flex-1">Status</th>
                <th className="flex-1">Description</th>
            </tr>
            <tr className={'col-12 overflow-y-auto w-full flex-1 text-center py-0 px-[65px] max-h-[340px] sm:pt-0 sm:pr-[20px] sm:pb-0 sm:pl-[16px] sm:min-h-[70vh] sm:overflow-x-hidden sm:flex-1 ' + styles.tableContent}>
                <th className='w-full flex flex-1 min-w-full flex-col '>
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