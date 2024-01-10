/* eslint-disable react/jsx-no-undef */
/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import React from "react";
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';
import ReactLoading from 'react-loading';

//------------------------------------------components
const PackagesList = dynamic(() => import("./packagesList"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const PackageCard = dynamic(() => import("./packageCard"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
const Wallet = dynamic(() => import("./wallet"), {
    ssr: false, loading: () => <div role="status" className="col-12 m-auto flex justify-center self-center items-center h-screen">
        <ReactLoading type={'spin'} color={'#929391'} height={50} width={50} /></div>
});
import { useMultiStepForm } from "@/components/multiStepForm/useMultiStepForm";
import { GetPackages } from "@/hooks/fetchData";
import { PaymentLink } from "@/hooks/actions";

//---------------------------------------------------types
import { Package } from "../../../types/package";

export default function Page() {

    const isMobile = useMediaQuery({ query: "(max-width: 500px)" });
    const [packages, setPackages] = React.useState<Package[]>([]);
    const [pageLoading, setPageLoading] = React.useState<boolean>(true);
    const [selectedPackage, setSelectedPackage] = React.useState<Package>();
    const [loading, setLoading] = React.useState<boolean>(true);

    async function GetPackage() {
        let user = await localStorage.getItem('user');
        setLoading(true);
        setPackages(await GetPackages(user ? `${user}` : ''));
        setLoading(false);
    };

    async function CreatePaymentLink(quantity: number, id: string, promotionCode: string) {
        setPageLoading(true);
        let link: any = await PaymentLink(quantity, id, promotionCode);
        if (link)
            window.location = link;
        setPageLoading(false);
    };

    const Back = () => { back() };
    const Next = (pack?: Package) => {
        if (pack) setSelectedPackage(pack);
        next()
    };
    const { step, back, next } = useMultiStepForm([
        <Wallet key={0} loading={loading} GetPackage={GetPackage} packages={packages} selectedPackage={selectedPackage} Next={Next}
            CreatePaymentLink={CreatePaymentLink} setSelectedPackage={setSelectedPackage}
            pageLoading={pageLoading} setPageLoading={setPageLoading}
        />,
        <PackagesList key={1} handleCancel={Back}
            loading={loading} packages={packages} changeModalStep={Next} />,
        <PackageCard key={2} handleCancel={Back} pack={selectedPackage} CreatePaymentLink={CreatePaymentLink} />

    ]);

    return isMobile ?
        <>{step}</>
        : <Wallet key={0} loading={loading} GetPackage={GetPackage} packages={packages} selectedPackage={selectedPackage} Next={Next}
            CreatePaymentLink={CreatePaymentLink} setSelectedPackage={setSelectedPackage}
            pageLoading={pageLoading} setPageLoading={setPageLoading}
        />

};