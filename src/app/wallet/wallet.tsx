/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import Image from "next/image";
import dynamic from 'next/dynamic';
import { useRouter } from "next/navigation";
import ReactLoading from 'react-loading';
import { useMediaQuery } from 'react-responsive';

//------------------------------------------icons
import { PiPlusBold } from 'react-icons/pi';
import { IoIosArrowRoundBack } from 'react-icons/io';

//------------------------------------------components
import { StopLoader } from "@/components/Untitled";
const Loading = dynamic(() => import("@/components/loading/loading"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen"><ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const PackagesList = dynamic(() => import("./packagesList"), {
    ssr: false, loading: () => <div role="status" className="min-w-[1429px] m-auto flex justify-center self-center items-center bg-primaryColor min-h-[500px] h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const PackageCard = dynamic(() => import("./packageCard"), {
    ssr: false, loading: () => <div role="status" className="min-w-[1429px] m-auto flex justify-center self-center items-center bg-primaryColor min-h-[500px] h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const SelectCountry = dynamic(() => import("./selectCountry"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center bg-primaryColor min-h-[350px] h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Modal = dynamic(() => import("@/components/modal/modal"), {
    ssr: false
});
const PaymentHistoryTable = dynamic(() => import("./paymentHistoryTable"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const AssessmentHistoryTable = dynamic(() => import("./assesmentHistoryTable"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-full">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
import { useMultiStepForm } from "@/components/multiStepForm/useMultiStepForm";
import { GetUserProfile, TransactionHistoy } from "@/hooks/fetchData";
import { Reciept, RegenaratePayment } from "@/hooks/actions";

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

const Tabs = [
    { label: 'Payment Hx', value: true },
    { label: 'Assessment Hx', value: false }
];

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
    const { step, next, goTo } = useMultiStepForm(profile?.country.id === '' || process.env.NEXT_PUBLIC_ENV === 'DEVELOPER' ? [
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
        if (status)
            setTransactions([]);
        else
            setAssessments([])
        setMoreTransaction(true);
        GetTransactionsHistory(status);
    };

    React.useEffect(() => {
        StopLoader();
        GetProfile();
        setTransactions([]);
        GetTransactionsHistory(true);
    }, []);

    return pageLoading ? <Loading />
        : <div className='col-12 h-screen overflow-hidden lg:flex mac:flex flex-col items-center px-0 pb-[20px] bg-background flex-1 sm:block '>

            <div className='h-[35%] w-full shadow-[3px 8px 60px -5px rgba(0, 82, 147, 0.23)] text-whiteText flex lg:flex-row mac:flex-row items-start pl-[261px] pr-[200px] bg-token-gradiant filter-[drop-shadow(3px 8px 60px rgba(0, 82, 147, 0.23))] sm:shadow-none sm:min-h-[20vh] sm:h-fit sm:pt-[12px] sm:pr-[37px] sm:pb-[20px] sm:pl-[34px] sm:relative sm:flex-col '>
                <button
                    aria-label="back button"
                    onClick={() => router.push('/ielts')}
                    className='bg-seccondaryColor mt-[34px] mr-auto w-[130px] h-[48px] items-center justify-center text-[24px] font-semibold not-italic sm:mt-0 sm:text-[10.3px] sm:w-[56px] sm:h-[20.6px] '>
                    <IoIosArrowRoundBack className='text-[40px] sm:text-[25px] ' />{'Back'}
                </button>

                <div className='flex flex-col items-center justify-center sm:items-start sm:justify-start '>
                    <Image
                        className='w-[414px] h-[44px] mt-[36px] sm:absolute sm:w-[100px] sm:h-[22px] sm:top-[12px] sm:right-[37px] sm:mt-0 '
                        src="/logoIcon2.svg"
                        alt="Logo"
                        width="0"
                        height="0"
                        sizes="100vw"
                        priority
                        loading="eager"
                    />

                    <div className='mt-[26px] text-center text-[20px] not-italic font-bold leading-normal sm:mt-[36px] sm:text-[13px] sm:font-medium '>
                        {'Wallet Balance:'}
                    </div>

                    <div className='mt-[30px] text-center text-[42px] font-semibold leading-normal sm:mt-[16px] sm:text-[32px] sm:leading-[16px] '>
                        {profile?.token + ' Tokens'}
                    </div>
                    <div className='text-center text-[20px] font-normal leading-normal mt-[29px] sm:mt-[16px] sm:text-[13px] sm:font-normal '>
                        {profile?.token + ' Assessments'}
                    </div>

                </div>
                <button
                    aria-label="add token button"
                    onClick={() => { if (profile?.country.id !== '' && isMobile) Next(); else showModal(); }}
                    className=' bg-background w-[168px] h-[45px] min-h-[45px] text-primaryColor text-center text-[20px] font-medium leading-normal items-center justify-center mt-auto mb-[32px] ml-auto sm:mt-0 sm:mb-0 sm:w-[96px] sm:h-[20.8px] sm:text-[13px] sm:font-semibold sm:min-h-[20.8px] sm:rounded-[3px] '>
                    <PiPlusBold className='text-[24px] mr-[8px] sm:ml-[5px] sm:text-[10px] ' />
                    {'Add tokens'}
                </button>
            </div>


            <div className='col-12 pt-[64px] pr-[124px] pl-[180px] sm:p-0 sm:flex-1 '>
                <div className='flex flex-row flex-1 py-0 px-[65px] mb-[64px] sm:p-0 sm:mb-0 '>
                    {
                        Tabs.map((tab, index) => <div className="flex-1 border-b-[5px] border-b-seccondaryColor text-center h-full py-[33px] px-0 cursor-pointer text-seccondaryColor text-[20px] font-bold leading-normal sm:py-[12px] sm:px-0 sm:text-[13px] sm:font-bold sm:border-b-[3px] "
                            key={index}
                            onClick={() => SelectTab(tab.value)}
                            style={paymentCategory === tab.value ? { opacity: 1 } : { opacity: 0.2 }}>{tab.label}</div>)
                    }
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

            {
                isModalOpen &&
                <Modal isOpen={isModalOpen} setIsOpen={handleCancel}>
                    {
                        profile?.country.id === '' && isMobile ?
                            <SelectCountry key={0} ChangeModalStep={ChangeModalStep} setprofile={setprofile} />
                            : step
                    }
                </Modal>}

        </div>
};
