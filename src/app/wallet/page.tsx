/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import { Modal } from 'antd';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import client from '@/config/applloAuthorizedClient';
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReactLoading from 'react-loading';
import InfiniteScroll from 'react-infinite-scroller';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { PiPlusBold, PiMinus } from 'react-icons/pi';
import { AiOutlineClose } from 'react-icons/ai';

//------------------------------------------components
import { StopLoader } from "@/components/Untitled";
import { GET_CURRENCIES, GET_PACKAGES, GET_PROFILE, TRANSACTION_HISTORY } from "@/config/graphql";
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"));
const Loading = dynamic(() => import("@/components/loading/loading"));

//---------------------------------------------------types
import { Currency } from "../../../types/currency";
import { Package } from "../../../types/package";
import { UserProfile } from "../../../types/profile";
import { Transaction } from "../../../types/transaction";

const Wallet: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [currencyCode, changeCurrencyCode] = React.useState<string>('');
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [pageLoading, setPageLoading] = React.useState<boolean>(true);
    const [moreTransaction, setMoreTransaction] = React.useState<boolean>(true);
    const [tableLoading, setTableLoading] = React.useState<boolean>(true);
    const [profile, setprofile] = React.useState<UserProfile>();
    // const [page, setPage] = React.useState<number>(1);
    const router = useRouter();
    const { status } = useSession({
        required: true, onUnauthenticated() {
            if (localStorage.getItem('user'))
                return
            else
                router.push('/signIn');
        },
    });

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
        })
    };

    async function GetCurrencies() {
        await client.query({
            query: GET_CURRENCIES,
            fetchPolicy: "no-cache",
        }).then((res) => {
            setCurrencies(res.data.getCurrencies);
            GetPackage(res.data.getCurrencies[0].code);
        })
    };
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => setIsModalOpen(false);


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


    async function GetTransactionsHistory() {
        await client.query({
            query: TRANSACTION_HISTORY,
            fetchPolicy: "no-cache",
            variables: {
                page: transactions.length + 1,
                pageSize: transactions.length === 0 ? 5 : 1
            }
        }).then(async (res) => {
            console.log(res);
            if (res.data.transactionHistory.transactions != 0) {
                await setTransactions([...transactions, ...res.data.transactionHistory.transactions]);
            } else {
                setMoreTransaction(false);
            }
        }).catch((err) => {
            console.log("get transaction history error : ", err);
        });
    }

    React.useEffect(() => {
        StopLoader();
        GetProfile();
        GetTransactionsHistory();
        GetCurrencies();
    }, []);
    return pageLoading ? <Loading />
        : <div className={styles.walletContainer}>
            <div className={styles.tokenCard}>
                <div className={styles.title}>wallet balance</div>

                {profile?.token} Tokens
                <span>7 Assessments</span>
                <button
                    onClick={() => showModal()}
                    className={styles.addTokenButton}>
                    <PiPlusBold className={styles.plusIcon} />Add tokens
                </button>
            </div>


            <div className={'col-12 ' + styles.mainContainer}>
                <div className={styles.transactionTable}>
                    <div className={styles.tabaleTitleCard}>
                        <span className={'col-lg-3 '}>Status</span>
                        <span className={'col-lg-3 '}>Amount</span>
                        <span className={'col-lg-3 '}>Date</span>
                        <span className={'col-lg-3 '}>Description</span>
                    </div>
                    <div className={'col-12 ' + styles.tableContent}>
                        <InfiniteScroll
                            pageStart={0}
                            loadMore={() => GetTransactionsHistory()}
                            hasMore={moreTransaction}
                            loader={<Loading style={{ height: 40, minHeight: 0, marginTop: 5 }} />}
                            useWindow={false}
                            key={0}
                        >
                            {
                                transactions.map((item, index) => <div key={index} className={item.paymentStatus === 'Forem' ? styles.transactionCard + ' ' + styles.positiveTransactionCard
                                    : styles.transactionCard + ' ' + styles.negativeTransactionCard}>
                                    <span className={'col-lg-3 '}>{
                                        item.paymentStatus === 'Forem' ?
                                            <div className={styles.plusCard}><PiPlusBold /></div>
                                            :
                                            <div className={styles.minusCard}><PiMinus /></div>
                                    }{item.paymentStatus}</span>
                                    <span className={'col-lg-3 '}>{item.amountPaidShow}</span>
                                    <span className={'col-lg-3 '}>
                                        {new Intl.DateTimeFormat('en-US', { month: "long" }).format((new Date(item.paidDate)))
                                            + new Date(item.paidDate).getDate()
                                            + ' ' + new Date(item.paidDate).getFullYear()}
                                    </span>
                                    <span className={'col-lg-3 '}>{item.paymentStatus}</span>
                                </div>)
                            }
                        </InfiniteScroll>
                    </div>
                </div>
            </div>
            <Modal
                style={{ top: 200 }}
                footer={null}
                closeIcon={null}
                open={isModalOpen}
                onCancel={handleCancel}
                width={1700}
                className={styles.modalContainer}

            >
                <div className={'col-12 ' + styles.modalCard}>
                    <div className={'col-12 ' + styles.modalTopContainer}>

                        <Select
                            renderValue={(selected) => {
                                if (selected.length === 0) {
                                    return <em>{currencies.length > 0 ? currencies[0].code
                                        : <ReactLoading className={styles.loading} type={'bubbles'} color={'#FFF'} height={30} width={30} />}</em>;
                                }

                                return selected;
                            }}
                            defaultValue="USD"
                            value={currencyCode}
                            onChange={(e) => {
                                changeCurrencyCode(e.target.value);
                                GetPackage(e.target.value);
                            }}
                            displayEmpty
                            inputProps={{ 'aria-label': 'gender select' }}
                            className={styles.select}
                        >
                            {
                                currencies.map((item: Currency, index: number) =>
                                    <MenuItem key={index} className={styles.selectItem} value={item.code}>{item.code}</MenuItem>)
                            }

                        </Select>
                        <AiOutlineClose
                            onClick={() => handleCancel()}
                            className={styles.closeModalButton} />
                    </div>
                    <div className={'col-12 ' + styles.packagesContainer}>
                        {
                            loading && currencies.length === 0 ?
                                <ReactLoading className={styles.loading} type={'spin'} color={'#FFF'} height={50} width={50} />
                                :
                                <>
                                    {packages.map((item: Package, index: number) => <PackageCard loading={loading} pack={item} key={index} />)}
                                </>
                        }
                    </div>
                </div>
            </Modal>

        </div>
};

export default Wallet;