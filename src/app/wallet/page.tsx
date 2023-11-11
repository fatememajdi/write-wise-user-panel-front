/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import { Modal } from 'antd';
import Image from "next/image";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import client from '@/config/applloAuthorizedClient';
import { signOut } from 'next-auth/react';
import dynamic from 'next/dynamic';
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import ReactLoading from 'react-loading';
import { useMediaQuery } from 'react-responsive';
import InfiniteScroll from 'react-infinite-scroller';

//------------------------------------------styles 
import styles from './wallet.module.css';

//------------------------------------------icons
import { PiPlusBold } from 'react-icons/pi';
import { BiSolidRightArrow, BiSolidLeftArrow, BiSolidCheckCircle } from 'react-icons/bi';
import { TbCurrencyIranianRial } from 'react-icons/tb';
import { AiOutlineClose, AiFillCloseCircle } from 'react-icons/ai';
import { IoMdArrowBack, IoMdMenu } from 'react-icons/io';

//------------------------------------------components
import { StartLoader, StopLoader } from "@/components/Untitled";
const DashboardPopOver = dynamic(() => import("@/components/dashboardPopOver/dashboardPopOver"));
import {
    CREATE_PAYMENT_LINK, GET_CURRENCIES, GET_PACKAGES, GET_PROFILE, RECEIPT_LINK,
    REGENERATE_PAYMENT_LINK, TRANSACTION_HISTORY, VALIDATION_PROMOTION_CODE
} from "@/config/graphql";
const PackageCard = dynamic(() => import("@/components/packageCard/packageCard"));
const Loading = dynamic(() => import("@/components/loading/loading"));
const TableCol = dynamic(() => import("@/components/walletTableCol/walletTableCol"));
import { useMultiStepForm } from "@/components/multiStepForm/useMultiStepForm";

//---------------------------------------------------types
import { Currency } from "../../../types/currency";
import { Package } from "../../../types/package";
import { UserProfile } from "../../../types/profile";
import { Transaction } from "../../../types/transaction";

const Wallet: React.FC = () => {

    const isMac = useMediaQuery({ query: "(max-width: 1440px)" });
    const isMac2 = useMediaQuery({ query: "(max-width: 1680px)" });
    const [isModalOpen, setIsModalOpen] = React.useState<boolean>(false);
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [currencyCode, changeCurrencyCode] = React.useState<string>('');
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [currencies, setCurrencies] = React.useState<Currency[]>([]);
    const [transactions, setTransactions] = React.useState<Transaction[]>([]);
    const [loading, setLoading] = React.useState<boolean>(true);
    const [pageLoading, setPageLoading] = React.useState<boolean>(true);
    const [moreTransaction, setMoreTransaction] = React.useState<boolean>(true);
    const [tableLoading, setTableLoading] = React.useState<boolean>(true);
    const [selectedPackage, setSelectedPackage] = React.useState<Package>();
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
    const handlePopOverOpen = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handlePopOverClose = () => {
        setAnchorEl(null);
    };

    const router = useRouter();
    const { status } = useSession({
        required: true, onUnauthenticated() {
            if (localStorage.getItem('user'))
                return
            else
                router.push('/signIn');
        },
    });

    async function LogOut() {
        setPageLoading(true);
        localStorage.clear();
        if (status === 'authenticated')
            signOut();
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
            window.location = res.data.createPaymentLink.link;
            // setPageLoading(false);
        }).catch((err) => {
            console.log("create payment link error : ", err);
            setPageLoading(false);
        });
    };

    async function ChangeModalStep(pack: Package) {
        await setSelectedPackage(pack);
        next();
    };

    React.useEffect(() => {
        StopLoader();
        GetProfile();
        GetTransactionsHistory();
        GetCurrencies();
    }, []);

    return pageLoading ? <Loading />
        : <div className={'col-12 ' + styles.wallet}>
            <div className={styles.leftNavBardCard}>
                <Image
                    className={styles.logo}
                    src="/dashboard/W W AI.svg"
                    alt="Logo"
                    loading="eager"
                    width={19}
                    height={69}
                    priority
                />
                <button
                    onClick={() => {
                        StartLoader();
                        router.push('/ielts');
                    }
                    }
                    className={styles.backButton}
                    aria-label="back button"
                >
                    <IoMdArrowBack />
                </button>
                <button
                    onClick={handlePopOverOpen}
                    className={styles.menuButton}
                    aria-label="menu button"
                >
                    <IoMdMenu />
                </button>
            </div>
            <div className={styles.walletContainer}>

                <div className={styles.tokenCard}>
                    <div className={styles.title}>wallet balance</div>

                    {profile?.token} Tokens
                    <span>{profile?.token} Assessments</span>
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
                                        loader={<Loading style={{ height: 50, minHeight: 0, marginTop: 5 }} />}
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

            <DashboardPopOver
                page='/wallet' anchorEl={anchorEl}
                handlePopOverClose={handlePopOverClose} LogOut={LogOut} />
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
    changeModalStep: any
};

const ModalFirstStep: React.FC<_modalFirstStepProps> = ({ currencies, currencyCode, changeCurrencyCode,
    GetPackage, handleCancel, loading, packages, changeModalStep }) => {
    return <div className={'col-12 ' + styles.modalCard}>
        <div className={'col-12 ' + styles.modalTopContainer}>
            <Select
                renderValue={(selected) => {
                    if (selected.length === 0) {
                        return <em>{currencies.length > 0 ? currencies[0].icon + ' ' + currencies[0].name
                            : <ReactLoading className={styles.loading} type={'bubbles'} color={'#FFF'} height={30} width={30} />}</em>;
                    }

                    return currencies.find(item => item.code === selected).icon + ' ' + currencies.find(item => item.code === selected).name;
                }}
                defaultValue="select currency"
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
                        <MenuItem key={index} className={styles.selectItem} value={item.code}>{item.icon + ' ' + item.name}</MenuItem>)
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
                            key={index}
                            style={{ cursor: 'pointer' }}
                            onClick={() => changeModalStep(item)}>
                            <PackageCard loading={loading} pack={item} key={index} />
                        </div>)}
                    </>
            }
        </div>
    </div>
};

type _modalSecondStepProps = {
    handleCancel: any,
    pack: Package,
    CreatePaymentLink: any
};

type Promotion = {
    name: string,
    percentOff: number,
    amountAfterDiscount: string,
    discountAmount: string
};

const ModalSecondStep: React.FC<_modalSecondStepProps> = ({ handleCancel, pack, CreatePaymentLink }) => {

    const [counter, changeCounter] = React.useState<number>(1);
    const [promotionCode, changePromotionCode] = React.useState<string>('');
    const [validpromotionCode, changeValidPromotionCode] = React.useState<boolean>(false);
    const [sendPromotionCode, changeSendPromotionCode] = React.useState<boolean>(false);
    const [promotion, changePromotion] = React.useState<Promotion>();
    const [loading, setLoading] = React.useState<boolean>(false);

    async function validationPromotionCode() {
        setLoading(true);
        console.log(promotionCode);
        await client.query({
            query: VALIDATION_PROMOTION_CODE,
            fetchPolicy: "no-cache",
            variables: {
                id: pack.id,
                currency: pack.currency.toLowerCase(),
                adjustedQuantity: pack.adjustableQuantity ? counter : 1,
                promotionCode: promotionCode
            }
        }).then((res) => {
            console.log(res.data.validationPromotionCode);
            changePromotion(res.data.validationPromotionCode);
            changeValidPromotionCode(true);
            changeSendPromotionCode(true);
            setLoading(false);
        }).catch(async (err) => {
            console.log('validation promotion code error : ', err);
            await changePromotion(null);
            changeValidPromotionCode(false);
            changeSendPromotionCode(true);
            setLoading(false);
        })
    }

    return <div className={'col-12 ' + styles.modalCard}>
        <AiOutlineClose
            onClick={() => handleCancel()}
            style={{ marginLeft: 'auto' }}
            className={styles.closeModalButton} />
        <div className={'col-12 ' + styles.buyPackageCard}>
            <div className={'col-lg-5 col-md-5 ' + styles.buyPackageLeftCard}>
                <div className={styles.buyPackageLeftCardTitle}>
                    <div
                        style={pack.showingPrice.length > 9 ? { fontSize: 34 } : {}}
                        className={styles.buyPackLeftCardTitleText}>
                        {
                            pack.currency === 'IRR' ?
                                pack.showingPrice.slice(0, pack.showingPrice.length - 1)
                                :
                                pack.showingPrice
                        }
                        {
                            pack.currency === 'IRR' &&
                            <TbCurrencyIranianRial className={styles.rialIcon} />
                        }
                    </div>
                    <span> Start your journey with us.</span>
                </div>
            </div>

            <div className={'col-lg-7 col-md-7 ' + styles.buyPackageRightCard}>
                <div className={'col-12 ' + styles.buyPackageRightCardTitle}>
                    Start your journey with us.
                    <span>{pack.showingPrice}</span>
                </div>
                <div className={styles.countercontainer}>
                    {
                        pack.adjustableQuantity &&
                        <button
                            disabled={!pack.adjustableQuantity || loading}
                            onClick={() => { if (counter > 1) changeCounter(counter - 1) }} >
                            <BiSolidLeftArrow
                                className={styles.arrowIcon} />
                        </button>
                    }
                    <div className={styles.countCard}>{counter}</div>

                    {
                        pack.adjustableQuantity &&
                        <button
                            disabled={!pack.adjustableQuantity || loading}
                            onClick={() => changeCounter(counter + 1)}>
                            <BiSolidRightArrow
                                className={styles.arrowIcon} />
                        </button>
                    }

                </div>
                <div className={'col-12 ' + styles.buyPackageRightCardSubTitle}>
                    Subtotal
                    <span>{pack.showingPrice}</span>
                </div>
                {
                    !pack.isPopup &&
                    <div className={styles.applyCodeContainer}>
                        <div className={styles.inputCard}>
                            <input
                                className={sendPromotionCode && !validpromotionCode && styles.errorForm}
                                type="text"
                                onChange={(e) => {
                                    changePromotionCode(e.target.value);
                                    changeSendPromotionCode(false);
                                }}
                                disabled={pack.discountName !== ""}
                                placeholder="Add promotion code"
                                value={pack.discountName ? pack.discountName : promotionCode}></input>

                            {sendPromotionCode ?
                                validpromotionCode ?
                                    <BiSolidCheckCircle className={styles.checkCodeIcon} />
                                    :
                                    <AiFillCloseCircle className={styles.checkCodeIcon} />
                                : <></>
                            }
                        </div>

                        {pack.discountName === '' &&
                            <button
                                disabled={pack.discountName !== '' || promotionCode.length === 0}
                                className={styles.applyCodeButton}
                                onClick={() => validationPromotionCode()}
                            >
                                {
                                    loading ?
                                        <ReactLoading type={'spin'} color={'#929391'} height={25} width={25} />
                                        :
                                        'Apply code'
                                }
                            </button>
                        }

                        <span>{pack.discountPercent !== 0 ? '-' + pack.showingDiscountAmount
                            : promotion && '-' + promotion.discountAmount}</span>

                    </div>
                }
                {
                    sendPromotionCode && !validpromotionCode &&
                    <div className={styles.inputError}>The promo code you entered is invalid. Please try again,</div>
                }
                <div className={'col-12 ' + styles.buyPackageRightCardSubTitle + ' ' + styles.totalDueCard}>
                    Total due
                    <span>{promotion ? promotion.amountAfterDiscount : pack.showingPriceWithDiscount}</span>
                </div>
                <button
                    disabled={loading}
                    onClick={() => {
                        handleCancel();
                        CreatePaymentLink(pack.adjustableQuantity ? counter : 1, pack.id, pack.currency.toLowerCase(), pack.discountName !== '' ? pack.currencyName : promotionCode);
                    }}
                    className={styles.checkoutButton}>Checkout</button>
            </div>

        </div>
    </div>
};