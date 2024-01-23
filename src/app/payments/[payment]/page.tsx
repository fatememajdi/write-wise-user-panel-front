/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import dynamic from 'next/dynamic';
import client from '@/config/applloClient';
import { useRouter } from "next/navigation";
import Image from "next/image";
import ReactLoading from 'react-loading';
import toast from "react-hot-toast";

//--------------------------------------------------components
import { AFTER_PAYMENT, RECEIPT_LINK } from "@/config/graphql";
const Loading = dynamic(() => import("@/components/loading/loading"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});

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

export default function PaymentStatus({ params, searchParams }: pageProps) {

    const [payment, setPayment] = React.useState<paymentData>();
    const [loading, setLoading] = React.useState<boolean>(true);
    const router = useRouter();

    async function AfterPayment() {
        if (params.payment === 'zarinpal') {
            await fetch(process.env.NEXT_PUBLIC_ENV === 'DEVELOPER' ? 'https://devapi.wwai.ai/payments/zarinpal'
                : 'https://api.wwai.ai/payments/zarinpal', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Authority: searchParams.Authority as string,
                    Status: searchParams.Status as string
                }),
                cache: 'no-cache'
            }).then(response => {
                if (response.ok) {
                    response.json().then(json => {
                        setPayment({
                            currency: json.currency, id: json.id,
                            tokenNumber: json.tokenNumber, amountPaidShow: json.amountPaidShow
                        })
                    });
                }
                setLoading(false);
            });
        } else {
            await client.query({
                query: AFTER_PAYMENT,
                fetchPolicy: "no-cache",
                variables: {
                    id: searchParams.sessionId ? searchParams.sessionId : searchParams.NP_id
                }
            }).then(async (res) => {
                setPayment(res.data.afterPayment);
                setLoading(false);
            }).catch((err) => {
                toast.error(err.message);
                setLoading(false);
            });
        }
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
        : <div className='col-12 flex items-center justify-center h-screen '>
            <div className='flex flex-col m-auto h-full items-center justify-center text-blackText text-center leading-normal '>
                <Image
                    className='h-[354px] w-[354px] sm:h-[200px] sm:w-[200px] mac:h-[254px] mac:w-[254px] '
                    src={params.payment === 'success' || searchParams.Status === 'OK' ? "/icons/success.svg" : "/icons/faild.svg"}
                    alt="success"
                    width="0"
                    height="0"
                    sizes="100vw"
                    loading="eager"
                    priority
                />
                <div className='text-[48px] font-bold mt-[66px] mac:text-[32px] mac:font-semibold sm:text-[24px] sm:font-semibold '>{params.payment === 'success' || searchParams.Status === 'OK' ? 'Successful' : 'Faild'}</div>
                <div className='text-[24px] font-bold mt-[48px] mac:text-[20px] mac:font-semibold sm:text-[16px] sm:font-semibold '>
                    {params.payment === 'success' || searchParams.Status === 'OK' ?
                        'Your payment has been processed successfully'
                        : 'Unfortunately your payment was rejected .'
                    }</div>
                <div className='text-[24px] flex flex-row font-bold mt-[32px] mac:text-[20px] mac:font-semibold sm:text-[16px] sm:font-semibold '>
                    Amount paid : <div>{payment?.amountPaidShow}</div>
                    <span className=" text-seccondaryColor font-medium ml-[5px] mac:font-normal sm:font-normal ">{payment?.tokenNumber} Tokens </span></div>
                <div className='flex flex-row mt-[82px] '>
                    <button
                        className={"w-[200px] h-[48px] text-whiteText text-[24px] font-bold my-0 mx-[10px] mac:w-[150px] sm:w-[100px] mac:h-[38px] sm:h-[31px] mac:text-[20px] sm:text-[16px] mac:font-semibold sm:font-semibold "
                            + (params.payment === 'success' || searchParams.Status === 'OK' ? 'bg-seccondaryColor' : 'bg-red')}
                        onClick={() => { router.replace('/wallet'); router.refresh() }}
                        aria-label="back button"
                    >back
                    </button>
                    {params.payment === 'success' && params.payment !== 'zarinpal' &&
                        <button
                            className="w-[200px] h-[48px] bg-seccondaryColor text-whiteText text-[24px] font-bold my-0 mx-[10px] mac:w-[150px] sm:w-[100px] mac:h-[38px] sm:h-[31px] mac:text-[20px] sm:text-[16px] mac:font-semibold sm:font-semibold "
                            onClick={() => RecieptLink()}
                            aria-label="reciept button">
                            Receipt
                        </button>
                    }
                </div>
            </div>
        </div>
};