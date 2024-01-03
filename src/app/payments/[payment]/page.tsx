/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import dynamic from 'next/dynamic';
import client from '@/config/applloClient';
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";

//--------------------------------------------------styles
import styles from './paymentStatus.module.css';

//--------------------------------------------------components
import { AFTER_PAYMENT, RECEIPT_LINK } from "@/config/graphql";
const Loading = dynamic(() => import("@/components/loading/loading"));

interface pageProps {
    params: { payment: any },
    searchParams: any
};

type paymentData = {
    amountPaidShow: string,
    tokenNumber: number,
    id: string,
    currency: string,
};

const PaymentStatus: React.FC<pageProps> = ({ params, searchParams }) => {

    const [payment, setPayment] = React.useState<paymentData>();
    const [loading, setLoading] = React.useState<boolean>(true);

    async function AfterPayment() {
        await client.query({
            query: AFTER_PAYMENT,
            fetchPolicy: "no-cache",
            variables: {
                id: searchParams.sessionId ? searchParams.sessionId : searchParams.NP_id
            }
        }).then(async (res) => {
            console.log(res);
            setPayment(res.data.afterPayment);
            setLoading(false);
        }).catch((err) => {
            toast.error(err.message);
            setLoading(false);
        });
    };

    async function RecieptLink() {
        setLoading(true);
        await client.query({
            query: RECEIPT_LINK,
            fetchPolicy: "no-cache",
            variables: {
                id: payment.id as string
            }
        }).then(async (res) => {
            window.location = res.data.receiptLink.link;
            setLoading(false);

        }).catch((err) => {
            toast.error(err.message);
            setLoading(false);
        });
    };

    React.useEffect(() => {
        AfterPayment();
    }, []);

    return loading ?
        <Loading />
        : <div className={'col-12 ' + styles.paymentStatusContainer}>
            {
                params.payment === 'success' ?
                    <SuccessCard payment={payment} RecieptLink={RecieptLink} />
                    :
                    <FaildCard payment={payment} />
            }
        </div>
};

export default PaymentStatus;

const SuccessCard: React.FC<{ payment: paymentData, RecieptLink: any }> = ({ payment, RecieptLink }) => {
    const router = useRouter();

    return <div className={styles.statusCard}>
        <Image
            className={styles.statusIcon}
            src="/icons/success.svg"
            alt="success"
            width="0"
            height="0"
            sizes="100vw"
            loading="eager"
            priority
        />
        <div className={styles.title}>Successful</div>
        <div className={styles.description}>Your payment has been processed successfully</div>
        <div className={styles.amount}>Amount paid : {payment.amountPaidShow}
            <span>{payment.tokenNumber} Tokens </span></div>
        <div className={styles.successButtonContainer}>
            <button
                onClick={() => { router.replace('/wallet'); router.refresh() }}
                aria-label="back button"
            >back</button>
            <button
                onClick={() => RecieptLink()}
                aria-label="reciept button">
                Receipt</button>
        </div>
    </div>
};

const FaildCard: React.FC<{ payment: paymentData }> = ({ payment }) => {
    const router = useRouter();

    return <div className={styles.statusCard}>
        <Image
            className={styles.statusIcon}
            src="/icons/faild.svg"
            alt="faild"
            width="0"
            height="0"
            sizes="100vw"
            loading="eager"
            priority
        />
        <div className={styles.title}>Faild</div>
        <div className={styles.description}>Unfortunately your payment was rejected .</div>
        <div className={styles.amount}>Amount paid : {payment.amountPaidShow}
            <span>{payment.tokenNumber} Tokens </span></div>
        <div className={styles.buttonContainer}>
            <button
                onClick={() => { router.replace('/wallet'); router.refresh() }}
                aria-label="back button"
            >back</button>
        </div>
    </div>
};