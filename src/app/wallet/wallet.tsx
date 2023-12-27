/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import { useMediaQuery } from 'react-responsive';
import InfiniteScroll from 'react-infinite-scroller';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { PiPlusBold } from 'react-icons/pi';
import { IoIosArrowRoundBack } from 'react-icons/io';

//------------------------------------------components
import { StopLoader } from "@/components/Untitled";
const Loading = dynamic(() => import("@/components/loading/loading"));
const PackagesList = dynamic(() => import("./packagesList"));
const PackageCard = dynamic(() => import("./packageCard"));
const SelectCountry = dynamic(() => import("./selectCountry"));
const TableCol = dynamic(() => import("@/components/walletTableCol/walletTableCol"));
const Modal = dynamic(() => import("@/components/modal/modal"));
import { useMultiStepForm } from "@/components/multiStepForm/useMultiStepForm";
import { GetPackages, GetUserProfile, TransactionHistoy } from "@/hooks/fetchData";
import { PaymentLink, Reciept, RegenaratePayment } from "@/hooks/actions";

//---------------------------------------------------types
import { Package } from "../../../types/package";
import { UserProfile } from "../../../types/profile";
import { Transaction } from "../../../types/transaction";

type _walletProps = {
    packages: Package[],
    GetPackage: any,
    loading: boolean,
    CreatePaymentLink: any,
    pageLoading: boolean,
    setPageLoading: any,
    selectedPackage: Package,
    setSelectedPackage: any,
    Next: any,
};

export default function Wallew({ packages, GetPackage, loading, selectedPackage, setSelectedPackage, CreatePaymentLink, pageLoading, setPageLoading, Next }: _walletProps) {
    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [assessment, setAssessments] = React.useState<Transaction[]>([]);
    const [moreTransaction, setMoreTransaction] = React.useState<boolean>(true);
    const [tableLoading, setTableLoading] = React.useState<boolean>(true);
    const [paymentCategory, setPaymentCategory] = React.useState<boolean>(true);
    const [profile, setprofile] = React.useState<UserProfile>();
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => { setIsModalOpen(false); goTo(0); }
    const { step, next, goTo } = useMultiStepForm(profile?.country.id === '' ? [
        <SelectCountry key={0} ChangeModalStep={ChangeModalStep} setprofile={setprofile} />,
        <PackagesList key={1} handleCancel={handleCancel}
            loading={loading} packages={packages} changeModalStep={ChangeModalStep} />,
        <PackageCard key={2} handleCancel={handleCancel} pack={selectedPackage} CreatePaymentLink={CreatePaymentLink} />]
        : [
            <PackagesList key={1} handleCancel={handleCancel}
                loading={loading} packages={packages} changeModalStep={ChangeModalStep} />,
            <PackageCard key={2} handleCancel={handleCancel} pack={selectedPackage} CreatePaymentLink={CreatePaymentLink} />]);

    const router = useRouter();

    async function GetProfile() {
        let user: UserProfile = await GetUserProfile();
        if (user) {
            setprofile(user);
            GetPackage();
        }
        setPageLoading(false);
    };

    async function GetTransactionsHistory(status: boolean) {
        let transaction: Transaction[] = await TransactionHistoy(paymentCategory ? transactions.length / 10 + 1 : assessment.length / 10 + 1, status);
        if (transaction.length !== 0) {
            if (status)
                await setTransactions([...transactions, ...transaction]);
            else
                await setAssessments([...assessment, ...transaction]);
            if (transaction.length % 10 !== 0)
                setMoreTransaction(false);
        } else
            setMoreTransaction(false);

        setTableLoading(false);
    };

    async function RecieptLink(id: string) {
        setTableLoading(true);
        let link: any = await Reciept(id);
        if (link)
            window.location = link;
        setTableLoading(false);

    };

    async function RegeneratePaymentLink(id: string) {
        setTableLoading(true);
        let link: any = await RegenaratePayment(id);
        if (link) {
            window.location = link;
            setTransactions([]);
            GetTransactionsHistory(paymentCategory);
        }
        setTableLoading(false);
    };

    async function ChangeModalStep(pack?: Package) {
        setIsModalOpen(false);
        if (pack) {
            try {
                await setSelectedPackage(pack);
            } finally {
                if (isMobile)
                    Next();
                else
                    next();
            };

        } else {
            try {
                await GetPackage();
            } finally {
                if (isMobile)
                    Next();
                else
                    next();
            };
        }
        setIsModalOpen(true);
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
    }, []);

    return pageLoading ? <Loading />
        : <div className={'col-12 ' + styles.walletContainer}>

            <div className={styles.tokenCard}>
                <button
                    aria-label="back button"
                    onClick={() => router.push('/ielts')}
                    className={styles.backButton}><IoIosArrowRoundBack className={styles.backIcon} />Back</button>
                <div className={styles.tokenCardMainContainer}>
                    <Image
                        className={styles.logo}
                        src="/logoIcon2.svg"
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
                    onClick={() => { if (profile?.country.id !== '' && isMobile) Next(); else showModal(); }}
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

            <Modal isOpen={isModalOpen} setIsOpen={handleCancel}>
                {
                    profile?.country.id === '' && isMobile ?
                        <SelectCountry key={0} ChangeModalStep={ChangeModalStep} setprofile={setprofile} />
                        : step
                }
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

const AssessmentHistoryTable: React.FC<_props> = ({ tableLoading, GetTransactionsHistory, moreTransaction, transactions, RecieptLink, RegeneratePaymentLink }) => {
    return <table style={{ width: '100%' }}>
        <tbody className={styles.transactionTable}>
            <tr className={styles.tabaleTitleCard}>
                <th>ID</th>
                <th>Date & Time</th>
                <th>Task type</th>
                <th>Token used</th>
            </tr>
            <tr className={'col-12 ' + styles.tableContent}>
                <th className={styles.tableContentRow}>
                    {
                        tableLoading ?
                            <Loading style={{ height: 300, minHeight: 300 }} />
                            :
                            <InfiniteScroll
                                pageStart={0}
                                loadMore={() => GetTransactionsHistory(false)}
                                hasMore={moreTransaction}
                                loader={<Loading style={{ height: 50, minHeight: 0, marginTop: 5 }} key={1} />}
                                useWindow={false}
                                key={1}
                            >
                                {
                                    transactions.map((item, index) =>
                                        <TableCol key={index} transaction={item} RecieptLink={RecieptLink} RegeneratePaymentLink={RegeneratePaymentLink} status={false} />)
                                }
                            </InfiniteScroll>
                    }
                </th>
            </tr>
        </tbody>
    </table>
};