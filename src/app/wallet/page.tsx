/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import { Modal } from 'antd';
import Image from "next/image";
import client from '@/config/applloAuthorizedClient';
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useMediaQuery } from 'react-responsive';
import InfiniteScroll from 'react-infinite-scroller';
import toast from "react-hot-toast";

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { PiPlusBold } from 'react-icons/pi';
import { IoIosArrowRoundBack } from 'react-icons/io';

//------------------------------------------components
import { StopLoader } from "@/components/Untitled";
import {
    CREATE_PAYMENT_LINK, GET_CURRENCIES, GET_PACKAGES, GET_PROFILE, RECEIPT_LINK,
    REGENERATE_PAYMENT_LINK, TRANSACTION_HISTORY
} from "@/config/graphql";
const Loading = dynamic(() => import("@/components/loading/loading"));
const ModalFirstStep = dynamic(() => import("./firstStep"));
const ModalSecondStep = dynamic(() => import("./secondStep"));
const TableCol = dynamic(() => import("@/components/walletTableCol/walletTableCol"));
const LandingHeader = dynamic(() => import("@/components/landingHeader/landingHeader"));
import { useMultiStepForm } from "@/components/multiStepForm/useMultiStepForm";

//---------------------------------------------------types
import { Currency } from "../../../types/currency";
import { Package } from "../../../types/package";
import { UserProfile } from "../../../types/profile";
import { Transaction } from "../../../types/transaction";

const Page: React.FC = () => {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);
    const [pageLoading, setPageLoading] = React.useState<boolean>(true);
    const [currencyCode, changeCurrencyCode] = React.useState<string>('');
    const [selectedPackage, setSelectedPackage] = React.useState<Package>();
    const [loading, setLoading] = React.useState<boolean>(true);

    async function GetCurrencies() {
        await client.query({
            query: GET_CURRENCIES,
            fetchPolicy: "no-cache",
        }).then((res) => {
            setCurrencies(res.data.getCurrencies);
            GetPackage(res.data.getCurrencies[0].code);
        }).catch((err) => {
            toast.error(err.message);
        })
    };

    async function GetPackage(code: string) {
        let user = await localStorage.getItem('user');
        setLoading(true);
        await client.query({
            query: GET_PACKAGES,
            fetchPolicy: "no-cache",
            variables: {
                currency: code.toLowerCase(),
                userToken: user ? `Bearer ${JSON.parse(user)}` : '',
            }
        }).then((res) => {
            setPackages(res.data.getPackages);
            setLoading(false);
        }).catch((err) => {
            toast.error(err.message);
        })
    };

    async function CreatePaymentLink(quantity: number, id: string, currency: string, promotionCode: string) {
        setPageLoading(true);
        await client.mutate({
            mutation: CREATE_PAYMENT_LINK,
            fetchPolicy: "no-cache",
            variables: {
                id: id,
                currency: currency,
                adjustedQuantity: quantity,
                promotionCode: promotionCode
            }
        }).then(async (res) => {
            window.location = res.data.createPaymentLink.link;
            // setPageLoading(false);
        }).catch((err) => {
            toast.error(err.message);
            setPageLoading(false);
        });
    };

    const Back = () => { back() };
    const Next = (pack?: Package) => {
        if (pack) setSelectedPackage(pack);
        next()
    };
    const { step, back, next } = useMultiStepForm([
        <Wallet key={0} loading={loading} GetPackage={GetPackage} packages={packages} selectedPackage={selectedPackage} Next={Next}
            currencies={currencies} GetCurrencies={GetCurrencies} CreatePaymentLink={CreatePaymentLink} setSelectedPackage={setSelectedPackage}
            pageLoading={pageLoading} setPageLoading={setPageLoading} currencyCode={currencyCode} changeCurrencyCode={changeCurrencyCode}
        />,
        <ModalFirstStep key={1} currencies={currencies} currencyCode={currencyCode}
            changeCurrencyCode={changeCurrencyCode} GetPackage={GetPackage} handleCancel={Back}
            loading={loading} packages={packages} changeModalStep={Next} />,
        <ModalSecondStep key={2} handleCancel={Back} pack={selectedPackage} CreatePaymentLink={CreatePaymentLink} />

    ]);


    return isMobile ?
        <>{step}</>
        : <Wallet key={0} loading={loading} GetPackage={GetPackage} packages={packages} selectedPackage={selectedPackage} Next={Next}
            currencies={currencies} GetCurrencies={GetCurrencies} CreatePaymentLink={CreatePaymentLink} setSelectedPackage={setSelectedPackage}
            pageLoading={pageLoading} setPageLoading={setPageLoading} currencyCode={currencyCode} changeCurrencyCode={changeCurrencyCode}
        />

};

export default Page;

type _walletProps = {
    packages: Package[],
    GetPackage: any,
    loading: boolean,
    currencies: Currency[],
    GetCurrencies: any,
    CreatePaymentLink: any,
    pageLoading: boolean,
    setPageLoading: any,
    currencyCode: string,
    changeCurrencyCode: any,
    selectedPackage: Package,
    setSelectedPackage: any,
    Next: any
};

const Wallet: React.FC<_walletProps> = ({ packages, GetPackage, loading, changeCurrencyCode, selectedPackage, setSelectedPackage,
    currencies, GetCurrencies, CreatePaymentLink, pageLoading, setPageLoading, currencyCode, Next }) => {

    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });
    const isMac2 = useMediaQuery({ query: "(max-width: 1680px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [assessment, setAssessments] = React.useState<Transaction[]>([]);
    const [moreTransaction, setMoreTransaction] = React.useState<boolean>(true);
    const [tableLoading, setTableLoading] = React.useState<boolean>(true);
    const [paymentCategory, setPaymentCategory] = React.useState<boolean>(true);
    const [profile, setprofile] = React.useState<UserProfile>();
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => { setIsModalOpen(false); Back(); }
    const Back = () => back();
    const { step, back, next } = useMultiStepForm([
        <ModalFirstStep key={0} currencies={currencies} currencyCode={currencyCode}
            changeCurrencyCode={changeCurrencyCode} GetPackage={GetPackage} handleCancel={handleCancel}
            loading={loading} packages={packages} changeModalStep={ChangeModalStep} />,
        <ModalSecondStep key={1} handleCancel={handleCancel} pack={selectedPackage} CreatePaymentLink={CreatePaymentLink} />
    ]);

    const router = useRouter();

    async function GetProfile() {
        await client.query({
            query: GET_PROFILE,
            fetchPolicy: "no-cache"
        }).then(async (res) => {
            setprofile(res.data.getUserProfile);
            setPageLoading(false);
        }).catch((err) => {
            console.log("get user profile error : ", err);
            setPageLoading(false);
        });
    };

    async function GetTransactionsHistory(status: boolean) {
        await client.query({
            query: TRANSACTION_HISTORY,
            fetchPolicy: "no-cache",
            variables: {
                page: paymentCategory ? transactions.length + 1 : assessment.length + 1,
                pageSize: paymentCategory ? transactions.length === 0 ? 5 : 1 : assessment.length === 0 ? 5 : 1,
                paymentHistory: status
            }
        }).then(async (res) => {
            if (res.data.transactionHistory.transactions != 0) {
                if (status)
                    await setTransactions([...transactions, ...res.data.transactionHistory.transactions]);
                else
                    await setAssessments([...assessment, ...res.data.transactionHistory.transactions]);
            } else {
                setMoreTransaction(false);
            }
            setTableLoading(false);
        }).catch((err) => {
            console.log("get transaction history error : ", err);
            setTableLoading(false);
        });
    };

    async function RecieptLink(id: string) {
        setTableLoading(true);
        await client.query({
            query: RECEIPT_LINK,
            fetchPolicy: "no-cache",
            variables: {
                id: id
            }
        }).then(async (res) => {
            window.location = res.data.receiptLink.link;
            setTableLoading(false);

        }).catch((err) => {
            console.log("get transaction reciept error : ", err);
            setTableLoading(false);

        });
    };

    async function RegeneratePaymentLink(id: string) {
        setTableLoading(true);
        await client.query({
            query: REGENERATE_PAYMENT_LINK,
            fetchPolicy: "no-cache",
            variables: {
                id: id
            }
        }).then(async (res) => {
            setTableLoading(false);
            window.location = res.data.regeneratePaymentLink.link;
            setTransactions([]);
            GetTransactionsHistory(paymentCategory);
        }).catch((err) => {
            console.log("regenerate payment link error : ", err);
            setTableLoading(false);

        });
    };

    async function ChangeModalStep(pack: Package) {
        await setSelectedPackage(pack);
        next();
    };

    async function SelectTab(status: boolean) {
        setPaymentCategory(status);
        setMoreTransaction(true);
        GetTransactionsHistory(status);
    };

    React.useEffect(() => {
        StopLoader();
        GetProfile();
        GetTransactionsHistory(true);
        GetCurrencies();
    }, []);

    return pageLoading ? <Loading />
        : <div className={'col-12 ' + styles.walletContainer}>

            {
                isMobile &&
                <LandingHeader logedIn />
            }

            <div className={styles.tokenCard}>
                <button
                    aria-label="back button"
                    onClick={() => router.push('/ielts')}
                    className={styles.backButton}><IoIosArrowRoundBack className={styles.backIcon} />Back</button>
                <div className={styles.tokenCardMainContainer}>
                    <Image
                        className={styles.logo}
                        src="/whiteLogo.svg"
                        alt="Logo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority
                        loading="eager"
                    />

                    <div className={styles.firstTitle}>Wallet Balance: </div>

                    <div className={styles.tokens}>{profile?.token + ' Tokens'}</div>
                    <div className={styles.assessments}>{profile?.token + ' Assessments'}</div>

                </div>
                <button
                    aria-label="add token button"
                    onClick={() => { if (isMobile) Next(); else showModal(); }}
                    className={styles.addTokenButton}>
                    <PiPlusBold className={styles.plusIcon} />Add tokens
                </button>
            </div>


            <div className={'col-12 ' + styles.mainContainer}>
                <div className={styles.tabsContainer}>
                    <div
                        onClick={() => SelectTab(true)}
                        style={paymentCategory ? { opacity: 1 } : { opacity: 0.2 }}>Payment Hx</div>

                    <div
                        onClick={() => SelectTab(false)}
                        style={!paymentCategory ? { opacity: 1 } : { opacity: 0.2 }}>Assessment Hx</div>
                </div>
                {
                    paymentCategory ?
                        <PaymentHistoryTable tableLoading={tableLoading} GetTransactionsHistory={GetTransactionsHistory}
                            moreTransaction={moreTransaction} transactions={transactions} RecieptLink={RecieptLink}
                            RegeneratePaymentLink={RegeneratePaymentLink} />
                        :
                        <AssessmentHistoryTable tableLoading={tableLoading} GetTransactionsHistory={GetTransactionsHistory}
                            moreTransaction={moreTransaction} transactions={assessment} RecieptLink={RecieptLink}
                            RegeneratePaymentLink={RegeneratePaymentLink} />
                }
            </div>
            <Modal
                style={{ top: isMac ? 70 : 200 }}
                footer={null}
                closeIcon={null}
                open={isModalOpen}
                onCancel={handleCancel}
                width={isMac ? 1300 : isMac2 ? 1500 : 1700}
                className={styles.modalContainer}

            >
                {step}
            </Modal>

        </div>
};

type _props = {
    tableLoading: boolean,
    GetTransactionsHistory: any,
    moreTransaction: boolean,
    transactions: Transaction[],
    RecieptLink: any,
    RegeneratePaymentLink: any
};

const PaymentHistoryTable: React.FC<_props> = ({ tableLoading, GetTransactionsHistory, moreTransaction, transactions, RecieptLink, RegeneratePaymentLink }) => {
    return <table className={styles.transactionTable}>
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
            {
                tableLoading ?
                    <Loading style={{ height: 300, minHeight: 300 }} />
                    :
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => GetTransactionsHistory(true)}
                        hasMore={moreTransaction}
                        loader={<Loading style={{ height: 50, minHeight: 0, marginTop: 5 }} />}
                        useWindow={false}
                        key={0}
                    >
                        {
                            transactions.map((item, index) =>
                                <TableCol key={index} transaction={item} RecieptLink={RecieptLink} RegeneratePaymentLink={RegeneratePaymentLink} status={true} />)
                        }
                    </InfiniteScroll>
            }
        </tr>
    </table>
};

const AssessmentHistoryTable: React.FC<_props> = ({ tableLoading, GetTransactionsHistory, moreTransaction, transactions, RecieptLink, RegeneratePaymentLink }) => {
    return <table className={styles.transactionTable}>
        <tr className={styles.tabaleTitleCard}>
            <th>ID</th>
            <th>Date & Time</th>
            <th>Task type</th>
            <th>Token used</th>
        </tr>
        <tr className={'col-12 ' + styles.tableContent}>
            {
                tableLoading ?
                    <Loading style={{ height: 300, minHeight: 300 }} />
                    :
                    <InfiniteScroll
                        pageStart={0}
                        loadMore={() => GetTransactionsHistory(false)}
                        hasMore={moreTransaction}
                        loader={<Loading style={{ height: 50, minHeight: 0, marginTop: 5 }} />}
                        useWindow={false}
                        key={0}
                    >
                        {
                            transactions.map((item, index) =>
                                <TableCol key={index} transaction={item} RecieptLink={RecieptLink} RegeneratePaymentLink={RegeneratePaymentLink} status={false} />)
                        }
                    </InfiniteScroll>
            }
        </tr>
    </table>
};