/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import dynamic from 'next/dynamic';
import client from '@/config/applloAuthorizedClient';
import { useRouter } from "next/navigation";

//--------------------------------------------------icons
import { Faild, Success } from "../../../../public/icons";

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
            console.log("after payment error : ", err);
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
            console.log("get transaction reciept error : ", err);
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

    return <div className={styles.statusCard}>
        <Success />
        <div className={styles.title}>Successful</div>
        <div className={styles.description}>Your payment has been processed successfully</div>
        <div className={styles.amount}>Amount paid : {payment.amountPaidShow}
            <span>{payment.tokenNumber} Tokens </span></div>
        <button
            onClick={() => RecieptLink()}
            aria-label="reciept button"
            className={styles.recieptButton}>Receipt</button>
    </div>
};

const FaildCard: React.FC<{ payment: paymentData }> = ({ payment }) => {
    const router = useRouter();

    return <div className={styles.statusCard}>
        <Faild />
        <div className={styles.title}>Faild</div>
        <div className={styles.description}>Unfortunately your payment was rejected .</div>
        <div className={styles.amount}>Amount paid : {payment.amountPaidShow}
            <span>{payment.tokenNumber} Tokens </span></div>
        <div className={styles.buttonContainer}>
            <button
                onClick={() => router.push('/wallet')}
                aria-label="back button"
            >back</button>
        </div>
    </div>
};