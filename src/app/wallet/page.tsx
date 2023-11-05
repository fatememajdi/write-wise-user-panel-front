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
import { PiPlusBold } from 'react-icons/pi';
import { BiSolidRightArrow, BiSolidLeftArrow } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

//------------------------------------------components
import { StopLoader } from "@/components/Untitled";
import { CREATE_PAYMENT_LINK, GET_CURRENCIES, GET_PACKAGES, GET_PROFILE, RECEIPT_LINK, REGENERATE_PAYMENT_LINK, TRANSACTION_HISTORY } from "@/config/graphql";
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"));
const Loading = dynamic(() => import("@/components/loading/loading"));
const TableCol = dynamic(() => import("@/components/walletTableCol/walletTableCol"));

//---------------------------------------------------types
import { Currency } from "../../../types/currency";
import { Package } from "../../../types/package";
import { UserProfile } from "../../../types/profile";
import { Transaction } from "../../../types/transaction";
import { useMultiStepForm } from "@/components/multiStepForm/useMultiStepForm";

const Wallet: React.FC = () => {

    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [currencyCode, changeCurrencyCode] = React.useState<string>('');
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [pageLoading, setPageLoading] = React.useState<boolean>(true);
    const [modalStep, changeModalStep] = React.useState<number>(1);
    const [moreTransaction, setMoreTransaction] = React.useState<boolean>(true);
    const [tableLoading, setTableLoading] = React.useState<boolean>(true);
    const [profile, setprofile] = React.useState<UserProfile>();
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => { setIsModalOpen(false); Back(); }
    const Next = () => next();
    const Back = () => back();
    const { step, back, next } = useMultiStepForm([
        <ModalFirstStep currencies={currencies} currencyCode={currencyCode}
            changeCurrencyCode={changeCurrencyCode} GetPackage={GetPackage} handleCancel={handleCancel}
            loading={loading} packages={packages} Next={Next} CreatePaymentLink={CreatePaymentLink} />,
        <ModalSecondStep handleCancel={handleCancel} />
    ]);

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
            console.log(res);
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
            if (res.data.transactionHistory.transactions != 0) {
                await setTransactions([...transactions, ...res.data.transactionHistory.transactions]);
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
            GetTransactionsHistory();
        }).catch((err) => {
            console.log("regenerate payment link error : ", err);
            setTableLoading(false);

        });
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
            console.log(res.data.createPaymentLink.link);
            setPageLoading(false);
        }).catch((err) => {
            console.log("create payment link error : ", err);
            setPageLoading(false);
        });
    };

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
                        <span className={styles.tableItem}>Status</span>
                        <span className={styles.tableItem}>Amount</span>
                        <span className={styles.tableItem}>Date</span>
                        <span className={styles.tableItem}>Tokens</span>
                        <span className={styles.tableItem}></span>
                    </div>
                    <div className={'col-12 ' + styles.tableContent}>
                        {
                            tableLoading ?
                                <Loading style={{ height: 300, minHeight: 300 }} />
                                :
                                <InfiniteScroll
                                    pageStart={0}
                                    loadMore={() => GetTransactionsHistory()}
                                    hasMore={moreTransaction}
                                    loader={<Loading style={{ height: 40, minHeight: 0, marginTop: 5 }} />}
                                    useWindow={false}
                                    key={0}
                                >
                                    {
                                        transactions.map((item, index) =>
                                            <TableCol key={index} transaction={item} RecieptLink={RecieptLink} RegeneratePaymentLink={RegeneratePaymentLink} />)
                                    }
                                </InfiniteScroll>
                        }
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
                {step}
            </Modal>

        </div>
};

export default Wallet;

type _modalFirstStepProps = {
    currencies: Currency[],
    currencyCode: string,
    changeCurrencyCode: any,
    GetPackage: any,
    handleCancel: any,
    loading: boolean,
    packages: Package[],
    Next: any,
    CreatePaymentLink: any
};

const ModalFirstStep: React.FC<_modalFirstStepProps> = ({ currencies, currencyCode, changeCurrencyCode,
    GetPackage, handleCancel, loading, packages, Next, CreatePaymentLink }) => {
    return <div className={'col-12 ' + styles.modalCard}>
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
                        {packages.map((item: Package, index: number) => <div
                            style={{ cursor: 'pointer' }}
                            onClick={() => {
                                console.log(item);
                                if (item.adjustableQuantity)
                                    Next();
                                else {
                                    handleCancel();
                                    CreatePaymentLink(1, item.id, item.currency.toLowerCase(), "");
                                }
                            }}>
                            <PackageCard loading={loading} pack={item} key={index} />
                        </div>)}
                    </>
            }
        </div>
    </div>
};


type _modalSecondStepProps = {
    handleCancel: any
};

const ModalSecondStep: React.FC<_modalSecondStepProps> = ({ handleCancel }) => {

    const [counter, changeCounter] = React.useState<number>(1);

    return <div className={'col-12 ' + styles.modalCard}>
        <AiOutlineClose
            onClick={() => handleCancel()}
            style={{ marginLeft: 'auto' }}
            className={styles.closeModalButton} />
        <div className={'col-12 ' + styles.buyPackageCard}>
            <div className={'col-lg-5 col-md-5 ' + styles.buyPackageLeftCard}>
                <div className={styles.buyPackageLeftCardTitle}>
                    $10
                    <span> Start your journey with us.</span>
                </div>
            </div>

            <div className={'col-lg-7 col-md-7 ' + styles.buyPackageRightCard}>
                <div className={'col-12 ' + styles.buyPackageRightCardTitle}>
                    Start your journey with us.
                    <span>$10</span>
                </div>
                <div className={styles.countercontainer}>
                    <BiSolidLeftArrow
                        className={styles.arrowIcon}
                        onClick={() => { if (counter > 1) changeCounter(counter - 1) }} />
                    <div className={styles.countCard}>{counter}</div>
                    <BiSolidRightArrow
                        className={styles.arrowIcon}
                        onClick={() => changeCounter(counter + 1)} />
                </div>
                <div className={'col-12 ' + styles.buyPackageRightCardSubTitle}>
                    Subtotal
                    <span>$10 </span>
                </div>
            </div>
        </div>
    </div>;
}
